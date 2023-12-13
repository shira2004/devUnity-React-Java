package com.example.demo.service;

import com.example.demo.model.Comment;
import com.example.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findCommentByProject(Project project);
}
