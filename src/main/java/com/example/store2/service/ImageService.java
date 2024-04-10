package com.example.store2.service;

import com.example.store2.model.Images;
import com.example.store2.repo.ImageRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImageService {
    private final ImageRepo imageRepo;

    public ImageService(ImageRepo imageRepo) {
        this.imageRepo = imageRepo;
    }

    public Images findByImageName(String name) {
        return imageRepo.findImageByImageName(name);
    }

    public Page<Images> allImages(Pageable pageable) {
        return imageRepo.findAll(pageable);
    }


}
