package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.service.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository){

        this.categoryRepository = categoryRepository;
    }
@GetMapping("/getCategoris")
    public ResponseEntity<List<Category>> getCategories(){
        try{
            List<Category> categories = new ArrayList<>();
            categoryRepository.findAll().forEach(e->categories.add(e));
            return new ResponseEntity<>(categories, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable long id){
        Category e=categoryRepository.findById(id).orElse(null);
        if(e!=null){
            return new ResponseEntity<>(e,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
