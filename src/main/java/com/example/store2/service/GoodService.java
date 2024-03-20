package com.example.store2.service;

import com.example.store2.model.Good;
import com.example.store2.repo.GoodRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
            goods.addAll(goodsPage.getContent());
        }
        return new PageImpl<>(goods, pageable, goods.size());
    }


    public Page<Good> findGoods(Pageable pageable) {
        return goodRepo.findAll(pageable);
    }

    public Page<Good> searchGoods(String name, int minPrice, int maxPrice,int startYear, int endYear ,Pageable pageable) {
        return goodRepo.searchGoods(name, minPrice, maxPrice, startYear, endYear, pageable);
    }
}
