package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    @Column(length = 1000)
    private String description;


    private String icon;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    List<Project> projectList;

    public Category(Long id, String name, String description, String icon, List<Project> projectList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.projectList = projectList;
    }

    public Category() {

    }
    // Add a constructor with an id parameter
    public Category(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }
}