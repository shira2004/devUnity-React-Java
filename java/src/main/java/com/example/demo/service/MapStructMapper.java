package com.example.demo.service;

import com.example.demo.dto.ProjectDTO;
import com.example.demo.model.Content;
import com.example.demo.model.Project;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Mapper (componentModel = "spring")
public interface MapStructMapper {


   List<ProjectDTO> projectToDto (List<Project> projects);
   //פונקציות השיכות להמרה בין מחלקות

   //ProjectDTO projectToDto (Project p);

    default ProjectDTO projectToDto(Project p) throws IOException {
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(p.getId());
        projectDTO.setCategory(p.getCategory());
        projectDTO.setDescription(p.getDescription());
        projectDTO.setDate(p.getDate());
        projectDTO.setLevel(p.getLevel());
        projectDTO.setUrl(p.getUrl());
        projectDTO.setViewer(p.getViewer());
        projectDTO.setId(p.getId());
        projectDTO.setTitle(p.getTitle());
        projectDTO.setScore(p.getScore());
        Path filename= Paths.get(p.getImage());

        StringBuilder builder = new StringBuilder();

        List <Content> list = p.getContents();
        //כאן אפשר להמיר את התמונה לביטיים
        //Path fileName = Paths.get(p.getImage());
        //הופך תמונה למערך ביטיים
        byte[] byteImage=Files.readAllBytes(filename);
        projectDTO.setImage(Base64.getEncoder().encodeToString(byteImage));

        return projectDTO;
        //Base64.getEncoder().encode()
   }

}
