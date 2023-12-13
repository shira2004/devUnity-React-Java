package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.Project;
import com.example.demo.service.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/comment")
@CrossOrigin
public class CommentController {

    private CommentRepository commentRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping("/getComments")
    public ResponseEntity<List<Comment>> getComments() {
        try {
            List<Comment> comments = new ArrayList<>();
            commentRepository.findAll().forEach(e -> comments.add(e));
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Comment> getRecipeById(@PathVariable long id) {
        Comment e = commentRepository.findById(id).orElse(null);
        if (e != null) {
            return new ResponseEntity<>(e, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
