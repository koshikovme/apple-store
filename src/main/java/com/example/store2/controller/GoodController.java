package com.example.store2.controller;

import com.example.store2.model.Good;
import com.example.store2.model.User;
import com.example.store2.repo.GoodRepo;
import com.example.store2.repo.OrderedGoodRepo;
import com.example.store2.service.GoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Slf4j
@RestController
public class GoodController {

    private final GoodService goodService;

    private final OrderedGoodRepo orderedGoodRepo;

    private final GoodRepo goodRepo;

    public GoodController(GoodService goodService, OrderedGoodRepo orderedGoodRepo, GoodRepo goodRepo) {
        this.goodService = goodService;
        this.orderedGoodRepo = orderedGoodRepo;
        this.goodRepo = goodRepo;
    }

    @PostMapping("/createGood")
    public ResponseEntity<String> createGood(
            @RequestBody Good good
    ) {
        goodService.createGood(good);
        return new ResponseEntity<>("Good created successfully: ", HttpStatus.CREATED);
    }

    @RequestMapping(
            value = "/editGood",
            method = {RequestMethod.PATCH, RequestMethod.PUT})
    public ResponseEntity<String> editUser(
            @RequestParam(defaultValue = "UNKNOWN") String brand,
            @RequestParam(defaultValue = "UNKNOWN") String name,
            @RequestParam(defaultValue = "-1") int good_id
    ) {
        goodService.editGood(brand, name, good_id);
        return new ResponseEntity<>("User edited successfully: ", HttpStatus.ACCEPTED);
    }

    @RequestMapping(
            value = "/deleteByGoodId",
            method = {RequestMethod.DELETE, RequestMethod.PUT})
    public ResponseEntity<String> deleteGoodById(
            @RequestParam long good_id
    ) {
        goodService.deleteGoodById(good_id);
        return new ResponseEntity<>("Good deleted successfully: ", HttpStatus.ACCEPTED);
    }

    @GetMapping("/goods")
    public Page<Good> getGoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return goodService.findGoods(pageable);
    }

    @GetMapping("/goodsByName")
    public Page<Good> getGoodsByName(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return goodService.findGoodsByName(name, pageable);
    }

    @GetMapping("/goodsByNames")
    public Page<Good> getGoodsByNames(
            @RequestParam("name") List<String> names,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        log.info("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return goodService.findGoodsByNames(names, pageable);
    }

    @GetMapping("/searchByOrderId/{orderId}")
    public ResponseEntity<Page<Good>> searchGoodsByOrderId(@PathVariable Long orderId,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Long> goodIds = orderedGoodRepo.findGoodIdsByOrderId(orderId);
        Page<Good> goods = goodRepo.findGoodsByGoodIds(goodIds, pageable);
        return ResponseEntity.ok(goods);
    }



//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("admin/searchGoods")
    public Page<Good> searchGoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") int minPrice,
            @RequestParam(defaultValue = "10000000") int maxPrice,
            @RequestParam(defaultValue = "1") int startYear,
            @RequestParam(defaultValue = "2024") int endYear
            ) {
        System.out.println("HELLO");
        Pageable pageable = PageRequest.of(page, size);
        return goodService.searchGoods(name, minPrice, maxPrice ,startYear,endYear, pageable);
    }





    @GetMapping("/")
    public ResponseEntity<String> getHello () {
        return ResponseEntity.ok("Hello world");
    }
}
