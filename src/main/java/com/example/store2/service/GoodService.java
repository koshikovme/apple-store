package com.example.store2.service;

import com.example.store2.model.Good;
import com.example.store2.repo.GoodRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GoodService {

    private final GoodRepo goodRepo;

    public GoodService(GoodRepo goodRepo) {
        this.goodRepo = goodRepo;
    }

    public void createGood(Good g) {
        goodRepo.createGood(g);
    }

    public void editGood(String brand, String name, Integer goodId) {
        goodRepo.editGood(brand, name, goodId);
    }

    public void deleteGoodById(Long id) {
        goodRepo.deleteGoodById(id);
    }

    public Page<Good> findAllGoodsByPrice(int price, Pageable pageable) {
        return goodRepo.findGoodsByPrice(price, pageable);
    }

    public Page<Good> findGoodsByName(String name, Pageable pageable) {
        return goodRepo.findGoodsByName(name, pageable);
    }

    public Page<Good> findGoodsByNames(List<String> names, Pageable pageable) {
        List<Good> goods = new ArrayList<>();
        for (String name : names) {
            Page<Good> goodsPage = goodRepo.findGoodsByNamesStartingWith(name, pageable);
            goodsPage.getContent().forEach(good -> {
                byte[] imageBytes = good.getImage(); // Assuming getImage returns byte[] or Blob
                String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                good.setImageBase64(base64Image); // Set Base64 encoded image string to a new field
            });
            goods.addAll(goodsPage.getContent());
        }
        return new PageImpl<>(goods, pageable, goods.size());
    }


    public Page<Good> findGoods(Pageable pageable) {
        return goodRepo.findAll(pageable);
    }

//    public Page<Good> searchGoods(String name, int minPrice, int maxPrice,int startYear, int endYear ,Pageable pageable) {
//        return goodRepo.searchGoods(name, minPrice, maxPrice, startYear, endYear, pageable);
//    }


    public Page<Good> searchGoods(String name, int minPrice, int maxPrice, int startYear, int endYear, Pageable pageable) {
        Page<Good> goods = goodRepo.searchGoods(name, minPrice, maxPrice, startYear, endYear, pageable);

        // Convert Blob to Base64 for each Good object
        goods.getContent().forEach(good -> {
            byte[] imageBytes = good.getImage(); // Assuming getImage returns byte[] or Blob
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            good.setImageBase64(base64Image); // Set Base64 encoded image string to a new field
        });

        return goods;
    }
}
