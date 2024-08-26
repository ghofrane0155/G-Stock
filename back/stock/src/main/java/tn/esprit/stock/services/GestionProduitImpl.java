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
import tn.esprit.stock.entities.Stock;
import tn.esprit.stock.repository.ICategorieRepository;
import tn.esprit.stock.repository.IProduitRepository;
import tn.esprit.stock.repository.IStockRepository;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class GestionProduitImpl implements IGestionProduit {

    private final IProduitRepository produitRepo;
    private final ICategorieRepository categorieRepo;
    private final IStockRepository stockRepo;

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
    public Produit addProduit(Produit produit, MultipartFile logo, Long categorieId, Long stockId) throws IOException {
        // Find and set the category
        Categorie c = categorieRepo.findById(categorieId)
                .orElseThrow(() -> new IllegalArgumentException("Categorie not found with id: " + categorieId));
        produit.setCategorie(c);

        // Find and set the stock
        Stock s = stockRepo.findById(stockId)
                .orElseThrow(() -> new IllegalArgumentException("stock not found with id: " + stockId));
        produit.setStock(s);

        // Decrease stock quantity
        if (s.getQuantite() >= produit.getQuantite()) {
            s.setQuantite(s.getQuantite() - produit.getQuantite());
            stockRepo.save(s);
        } else {
            throw new IllegalArgumentException("Not enough stock available for this product.");
        }

        // Handle the logo upload
        if (logo != null && !logo.isEmpty()) {
            String fileName = StringUtils.cleanPath(logo.getOriginalFilename());
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            try (InputStream inputStream = logo.getInputStream()) {
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                produit.setLogo(fileName);
            } catch (IOException e) {
                throw new IOException("Could not save logo file: " + fileName, e);
            }
        }

        // Optionally set a default or generated barcode
        if (produit.getCodeAB() == null || produit.getCodeAB().isEmpty()) {
            produit.setCodeAB(generateBarCode(produit));
        }

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
            Produit existingProduit = produitRepo.findById(produit.getIdProduit()).orElseThrow();
            int difference = produit.getQuantite() - existingProduit.getQuantite();

            Stock s = produit.getStock();
            if (s.getQuantite() >= difference) {
                s.setQuantite(s.getQuantite() - difference);
                stockRepo.save(s);
            } else {
                throw new IllegalArgumentException("Not enough stock available for this update.");
            }

            return produitRepo.save(produit);
        } else {
            throw new IllegalArgumentException("Produit not found with id: " + produit.getIdProduit());
        }
    }

    @Override
    public void deleteProduit(Long idProduit) {
        // Retrieve the product or throw an exception if not found
        Produit produit = produitRepo.findById(idProduit)
                .orElseThrow(() -> new IllegalArgumentException("Produit not found with id: " + idProduit));

        // Get the associated stock
        Stock stock = produit.getStock();
        if (stock != null) {
            stock.setQuantite(stock.getQuantite() + produit.getQuantite()); // Increase the stock quantity
            stockRepo.save(stock); // Save the updated stock
        }

        // Delete the product
        produitRepo.deleteById(idProduit);
    }

}
