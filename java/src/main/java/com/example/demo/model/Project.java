package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String title;

    @Column(length = 1000)
    private String Description;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private List<Content> contents;
    private int  status;
    private String url;
    private int viewer;
    private int score;

    //נתיב התמונה
    private String image;
    private LocalDate date;


    private LocalDate endDate;

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

    public Project(String image , Long id, String title, List<Content> contents,  String url,  Users user, Category category, List<Comment> commentList )  {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.status =0;
        this.url = url;
        this.viewer = 0;
        this.score = 0;
        this.user = user;
        this.category = category;
        this.commentList = commentList;
        this.date = LocalDate.now();
        this.image=image;
        this.endDate=null;
    }

    public Project() {

    }
    public LocalDate getDate (){return date;}

    public void setDate(LocalDate date){this.date=date;}

    public String getImage(){return image;}
    public void setImage(String image){this.image = image;}
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
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
    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
