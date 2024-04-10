package com.example.store2.controller;

import com.example.store2.model.Images;
import com.example.store2.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@Slf4j
@RestController
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/imagesByName")
    public Images imageByName (
            @RequestParam String name
    ) {
        return imageService.findByImageName(name);
    }

    @GetMapping("/images")
    public Page<Images> images(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return imageService.allImages(pageable);
    }
}
