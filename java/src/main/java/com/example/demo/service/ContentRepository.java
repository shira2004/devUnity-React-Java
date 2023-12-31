package com.example.demo.service;

import com.example.demo.model.Comment;
import com.example.demo.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findContentByProjectId (Long projectId);


}
