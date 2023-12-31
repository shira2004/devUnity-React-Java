package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.Content;
import com.example.demo.model.Project;
import com.example.demo.service.CommentRepository;
import com.example.demo.service.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/content")
@CrossOrigin

public class ContentController {
    private ContentRepository contentRepository;

    @Autowired
    public ContentController(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }
    @GetMapping("/getByProject/{projectId}")

    public ResponseEntity<List<Content>> getContentByProject(@PathVariable long projectId) {
        try {
            List<Content> contents = new ArrayList<>();
            contentRepository.findContentByProjectId(projectId).forEach(e -> {
                contents.add(e);
            });
            return new ResponseEntity<>(contents, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions, return appropriate HTTP status code
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getContents")
    public ResponseEntity<List<Content>> getContent() {
        try {
            List<Content> content = new ArrayList<>();
            contentRepository.findAll().forEach(e -> content.add(e));
            return new ResponseEntity<>(content, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/postContent")
    public ResponseEntity<Content> postContent(@RequestBody Content content) {
        try {
            // Validate input
            if (content.getTitle() == null || content.getTitle().isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            Content newContent = contentRepository.save(content);
            return new ResponseEntity<>(newContent, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity deleteTask(@PathVariable long id){
        try{
            contentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch(Exception e ) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
