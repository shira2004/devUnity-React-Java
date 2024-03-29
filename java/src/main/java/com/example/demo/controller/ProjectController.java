package com.example.demo.controller;

//import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.ProjectDTO;
import com.example.demo.model.Project;
//import com.example.demo.service.MapStructMapper;
import com.example.demo.service.MapStructMapper;
import com.example.demo.service.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {
    private final MapStructMapper mapper;
    private ProjectRepository projectRepository;

private static String UPLOAD_DIRECTORY=System.getProperty("user.dir")+"\\images\\";
    //private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + File.separator + "images" + File.separator;


    @Autowired
    public ProjectController(ProjectRepository projectRepository , MapStructMapper mapper) {
        this.projectRepository = projectRepository;
        this.mapper = mapper;
    }



    //דרך מדויקת

    @GetMapping("/getAll")
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




    @GetMapping("/getAllDTO")
    public ResponseEntity<List<ProjectDTO>> getProjectsDTO() {
        try {
            List<ProjectDTO> projects = new ArrayList<>();
            projectRepository.findAll().forEach(e ->{
                try {
                    projects.add(mapper.projectToDto(e));

                }
                catch (IOException ioException) {
                    ioException.printStackTrace();
                }});

            return new ResponseEntity<>(projects, HttpStatus.OK);

        } catch (Exception e) {
            // Handle exceptions, return appropriate HTTP status code
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



    @PutMapping("/updateProject/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable long id,@RequestBody Project project){
        Project p =projectRepository.findById(id).orElse(null);
        if(p!=null){
          p.setCategory(project.getCategory());
          p.setContents(project.getContents());
          p.setDescription(project.getDescription());
          p.setUrl(project.getUrl());
          p.setStatus(project.getStatus());
          p.setDate(project.getDate());
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


    //מעלה פרויקט עם תמונה
    @PostMapping("/UploadProject")
    public  ResponseEntity uploadProjectWithImage(@RequestPart("image")
                                                      MultipartFile file ,@RequestPart("project") Project p ) throws IOException {

        try{
            String filePath = UPLOAD_DIRECTORY+file.getOriginalFilename();
            //הנתיב לשמירת התמונה
            Path filename = Paths.get(filePath);
            Files.write(filename , file.getBytes());
            p.setImage(filePath);
            Project newProject =projectRepository.save(p);
            return new ResponseEntity<>(newProject,HttpStatus.CREATED);
        }
        catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



//    נרצה ךהחזיר אובייקט זהה אבל שהתמונה תוצג כביטים
    @GetMapping("/getdto/{id}")
    public  ResponseEntity <ProjectDTO> getDTO(@PathVariable long  id) throws IOException {
        Project p = projectRepository.findById(id).orElse(null);
        if (p!=null)
            return new ResponseEntity<>(mapper.projectToDto(p),HttpStatus.OK);
        else
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }


    @GetMapping("/getByCategory/{categoryId}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable long categoryId) {
        try {
            List<Project> projects = new ArrayList<>();
            projectRepository.findProjectByCategoryId(categoryId).forEach(e -> {
                projects.add(e);

            });
            return new ResponseEntity<>(projects, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions, return appropriate HTTP status code
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getByCategoryDTO/{categoryId}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByCategoryDTO(@PathVariable long categoryId) {
        try {
            List<ProjectDTO> projects = new ArrayList<>();
            projectRepository.findProjectByCategoryId(categoryId).forEach(e ->{
                try {
                    projects.add(mapper.projectToDto(e));

                }
                catch (IOException ioException) {
                    ioException.printStackTrace();
                }});

            return new ResponseEntity<>(projects, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions, return appropriate HTTP status code
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {

        try {
            project.setDate(LocalDate.now());
            Project newProject = projectRepository.save(project);

            return new ResponseEntity<>(newProject, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/incrementViewerCount/{id}")
    public ResponseEntity<Project> incrementViewerCount(@PathVariable long id) {
        System.out.println("im in increment ");
        Project project = projectRepository.findById(id).orElse(null);

        if (project != null) {
            project.setViewer(project.getViewer() + 1);

            Project updatedProject = projectRepository.save(project);

            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/changeStatus/{id}")
    public ResponseEntity<Project> changeStatus(@PathVariable long id) {
        Project project = projectRepository.findById(id).orElse(null);
        System.out.println("im in change status ");
        if (project != null) {
            project.setStatus(1);
            Project updatedProject = projectRepository.save(project);
            System.out.println("Updated project status: " + updatedProject.getStatus());
            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }




}
