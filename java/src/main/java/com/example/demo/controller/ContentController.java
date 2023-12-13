package com.example.demo.controller;

import com.example.demo.model.Content;
import com.example.demo.service.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@CrossOrigin
public class ContentController {
    private ContentRepository contentRepository;
    @Autowired
    public ContentController(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Content>> getAllContents() {
        try {
            List<Content> contents = contentRepository.findAll();
            return new ResponseEntity<>(contents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable Long id) {
        Content content = contentRepository.findById(id).orElse(null);
        if (content != null) {
            return new ResponseEntity<>(content, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/getByProjectId/{projectId}")
    public ResponseEntity<List<Content>> getContentsByProjectId(@PathVariable Long projectId) {
        try {
            List<Content> contents = contentRepository.findContentsByProjectId(projectId);
            return new ResponseEntity<>(contents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
