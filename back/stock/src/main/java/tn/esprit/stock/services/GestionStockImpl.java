package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.Stock;
import tn.esprit.stock.repository.IStockRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionStockImpl implements IGestionStock{
    IStockRepository stockRepo;


    @Override
    public Stock addStock(Stock stock) {
        return stockRepo.save(stock);
    }

    @Override
    public List<Stock> retrieveAllStocks() {
        return stockRepo.findAll();
    }

    @Override
    public Stock updateStock(Stock stock) {
        return stockRepo.save(stock);
    }

    @Override
    public void deleteStock(Long id) {
        stockRepo.deleteById(id);
    }
}
