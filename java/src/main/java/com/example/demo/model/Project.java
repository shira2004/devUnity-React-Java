package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String title;


    private String Description;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private List<Content> contents;
    private String level;
    private String url;
    private int viewer;
    private int score;

    @ManyToOne
    private Users user;

    @ManyToOne
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private List<Comment> commentList;

    public Project(Long id) {
        this.id = id;
    }

    public Project(Long id, String title, List<Content> contents, String level, String url, int viewer, int score, Users user, Category category, List<Comment> commentList) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.level = level;
        this.url = url;
        this.viewer = viewer;
        this.score = score;
        this.user = user;
        this.category = category;
        this.commentList = commentList;
    }

    public Project() {

    }
    public String getDescription(){return Description;}

    public void setDescription(String description){this.Description=description;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Content> getContents() {
        return contents;
    }

    public void setContents(List<Content> contents) {
        this.contents = contents;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getViewer() {
        return viewer;
    }

    public void setViewer(int viewer) {
        this.viewer = viewer;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }
}


