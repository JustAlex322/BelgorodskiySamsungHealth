package com.example.reg3.diet;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietRepository
        extends JpaRepository<Diet, Long> {
}
