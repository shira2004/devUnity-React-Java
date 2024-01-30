package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.Project;
import com.example.demo.service.CommentRepository;
import com.example.demo.service.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("api/comment")
@CrossOrigin

public class CommentController {

    private CommentRepository commentRepository;
    private ProjectRepository projectRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository ,  ProjectRepository projectRepository) {
        this.commentRepository = commentRepository;
        this.projectRepository = projectRepository;
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
    public ResponseEntity<Comment> getCommentById(@PathVariable long id) {
        Comment e = commentRepository.findById(id).orElse(null);
        if (e != null) {
            return new ResponseEntity<>(e, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




    @PostMapping("/uploadComment")
    public ResponseEntity<Comment> uploadComment( @RequestBody Comment comment) throws IOException {
        try {
            Project p = projectRepository.findById(comment.getProject().getId()).orElse(null);
            p.setScore(p.getScore()+comment.getScore());
            comment.setDate(LocalDate.now());
            commentRepository.save(comment);
            return new ResponseEntity(comment, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
