package com.example.store2.repo;

import com.example.store2.model.Good;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GoodRepo extends PagingAndSortingRepository<Good, Integer>, JpaRepository<Good, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Good (good_id, name, price, category_id, brand, model_year, characteristics) " +
            "VALUES (:#{#g.good_id}, :#{#g.name}, :#{#g.price}, :#{#g.category_id}, :#{#g.brand}, :#{#g.model_year}, :#{#g.characteristics})", nativeQuery = true)
    public abstract void createGood(@Param("g") Good g);

    @Modifying
    @Transactional
    @Query("DELETE FROM Good g WHERE g.good_id = ?1")
    void deleteGoodById(Long id);

    @Modifying
    @Transactional
    @Query("update Good g set g.brand = ?1, g.name = ?2 where g.good_id = ?3")
    void editGood(String brand, String name, Integer goodId);

    @Query("SELECT g FROM Good g " +
            "WHERE g.name LIKE %:name% " +
            "AND g.price BETWEEN :minPrice AND :maxPrice " +
            "AND g.modelYear BETWEEN :startYear AND :endYear")
    Page<Good> searchGoods(String name, int minPrice, int maxPrice, int startYear, int endYear, Pageable pageable);
    Page<Good> findGoodsByNameStartingWithAndPriceGreaterThanAndModelYear(String name, int price, int model_year, Pageable pageable);


    Page<Good> findGoodsByPrice(int price, Pageable pageable);

    @Query("SELECT g FROM Good g WHERE g.name LIKE %:name%")
    Page<Good> findGoodsByName(@Param("name") String name, Pageable pageable);

    @Query("SELECT g FROM Good g WHERE g.name LIKE :namePrefix%")
    Page<Good> findGoodsByNamesStartingWith(@Param("namePrefix") String namePrefix, Pageable pageable);

    @Query("SELECT g FROM Good g WHERE g.good_id IN :goodIds")
    Page<Good> findGoodsByGoodIds(@Param("goodIds") List<Long> goodIds, Pageable pageable);
}
