package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.service.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {
    private ProjectRepository projectRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }



    //דרך מדויקת

    @GetMapping("/get")
    public ResponseEntity<List<Project>> getProjects2 (){
        try {
           List<Project> projects = new ArrayList<>();

             projectRepository.findAll().forEach(e ->projects.add(e));
             return new ResponseEntity<>(projects , HttpStatus.OK);
        }
        catch (Exception e){
            //שגיאה 500
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable long id ){
        Project project =projectRepository.findById(id).orElse(null);
        if(project!=null){
            return new ResponseEntity<>(project,HttpStatus.OK);
        }
        else//שגיאה 404
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }


    @GetMapping("/getByCategory/{categoryId}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable long categoryId) {
        try {
            List<Project> projects = new ArrayList<>();
            projectRepository.findProjectByCategoryId(categoryId).forEach(e -> {
                projects.add(e);
                System.out.println("Description: " + e.getDescription()); // Add this line
            });
            return new ResponseEntity<>(projects, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions, return appropriate HTTP status code
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/updateProject/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable long id,@RequestBody Project project){
        Project p =projectRepository.findById(id).orElse(null);
        if(p!=null){
          p.setCategory(project.getCategory());
          p.setContents(project.getContents());
          p.setDescription(project.getDescription());
          p.setUrl(project.getUrl());
          p.setDate(project.getDate());
          p.setLevel(project.getLevel());
          p.setViewer(project.getViewer());

            projectRepository.save(p);
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        else//שגיאה 404

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity deleteProject(@PathVariable long id){
        try{
            projectRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch(Exception e ) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }






}
