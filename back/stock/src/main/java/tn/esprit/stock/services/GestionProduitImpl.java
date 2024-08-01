package tn.esprit.stock.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.stock.entities.Categorie;
import tn.esprit.stock.entities.Produit;
import tn.esprit.stock.repository.ICategorieRepository;
import tn.esprit.stock.repository.IProduitRepository;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;


@AllArgsConstructor
@Service
public class GestionProduitImpl implements IGestionProduit {

    private final IProduitRepository produitRepo;
    private final ICategorieRepository categorieRepo;
    private static final String uploadDir = "uploads/";

    @Override
    public List<Produit> retrieveAllProduits() {
        return produitRepo.findAll();
    }

    public Produit getProduitById(Long id) {
        Optional<Produit> produit = produitRepo.findById(id);
        return produit.orElse(null);
    }

    public List<Produit> getProduitsSortedByPrixUnitaire() {
        return produitRepo.findAllByOrderByPrixUnitaireAsc();
    }

    @Override
    public Produit addProduit(Produit produit, MultipartFile logo, Long categorieId) throws IOException {
        Categorie c = categorieRepo.findById(categorieId)
                .orElseThrow(() -> new IllegalArgumentException("Categorie not found with id: " + categorieId));
        produit.setCategorie(c);

        if (logo != null && !logo.isEmpty()) {
            String fileName = logo.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            try (var inputStream = logo.getInputStream()) {
                assert fileName != null;
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                produit.setLogo(fileName);
            } catch (IOException e) {
                throw new IOException("Could not save file: " + fileName, e);
            }
        }

        produit.setCodeAB(generateBarCode(produit));

        return produitRepo.save(produit);
    }

    private String generateBarCode(Produit produit) {
        String codeAB = "PROD-" + produit.getNomProduit().hashCode() + "-" + System.currentTimeMillis();
        // Optionally save barcode image using ZXing
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(codeAB, BarcodeFormat.QR_CODE, 200, 200);
            Path path = Paths.get(uploadDir, codeAB + ".png");
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }
        return codeAB;
    }

    @Override
    public Produit updateProduit(Produit produit) {
        if (produitRepo.existsById(produit.getIdProduit())) {
            return produitRepo.save(produit);
        } else {
            throw new IllegalArgumentException("Produit not found with id: " + produit.getIdProduit());
        }
    }

    @Override
    public void deleteProduit(Long idProduit) {
        if (produitRepo.existsById(idProduit)) {
            produitRepo.deleteById(idProduit);
        } else {
            throw new IllegalArgumentException("Produit not found with id: " + idProduit);
        }
    }
}
