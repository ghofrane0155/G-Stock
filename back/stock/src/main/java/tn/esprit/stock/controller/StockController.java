package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stock.entities.Stock;
import tn.esprit.stock.services.IGestionStock;


import java.util.List;

@RestController
@RequestMapping("/user/Stock")
@CrossOrigin
public class StockController {
    @Autowired
    IGestionStock IgStock;

    @GetMapping("/getAll")
    public List<Stock> retrieveAllStocks(){
        return IgStock.retrieveAllStocks();
    }

    @PostMapping("/add")
    public Stock addStock(@RequestBody Stock stock) {
        return IgStock.addStock(stock);
    }

    @PutMapping("/update")
    public Stock updateStock(@RequestBody Stock stock) {
        return IgStock.updateStock(stock);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStock(@PathVariable Long id) {
        IgStock.deleteStock(id);
    }




}
