package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProjectRepository extends JpaRepository<Project,Long> {
    Project findProjectByTitle (String txt);

    List<Project> findProjectByScore (int score);

    List<Project> findProjectByCategoryId (Long categoryId);

    List<Project> findTop5ByOrderByDateDesc();


}
