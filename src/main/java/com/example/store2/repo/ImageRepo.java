package com.example.store2.repo;

import com.example.store2.model.Images;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ImageRepo extends PagingAndSortingRepository<Images, Integer> {
    public Images findImageByImageName(String name);
}
