package tn.esprit.stock.services;


import tn.esprit.stock.entities.Stock;

import java.util.List;

public interface IGestionStock {
    Stock addStock(Stock stock);
    List<Stock> retrieveAllStocks();
    Stock updateStock(Stock stock);
    void deleteStock(Long id);

}
