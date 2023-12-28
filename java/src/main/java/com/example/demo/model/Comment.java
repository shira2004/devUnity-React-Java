package com.example.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class Comment {//http://localhost:8585/h2-console
        @Id
        @GeneratedValue
        private Long id;
        private LocalDate date;
        @Column(length = 1000)
        private String content;
        private int Score;
//        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//        @JsonIgnore
        @ManyToOne
        private Project project;

        @ManyToOne
        private Users user;


        public Comment(Long id, LocalDate date, String content, int score, Project project, Users user) {
                this.id = id;
                this.date = date;
                this.content = content;
                Score = score;
                this.project = project;
                this.user = user;
        }

        public Comment(Long id) {
                this.id = id;
        }

        public Comment() {

        }

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public LocalDate getDate() {
                return date;
        }

        public void setDate(LocalDate date) {
                this.date = date;
        }

        public String getContent() {
                return content;
        }

        public void setContent(String content) {
                this.content = content;
        }

        public int getScore() {
                return Score;
        }

        public void setScore(int score) {
                Score = score;
        }

        public Project getProject() {
                return project;
        }

        public void setProject(Project project) {
                this.project = project;
        }

        public Users getUser() {
                return user;
        }

        public void setUser(Users user) {
                this.user = user;
        }
}

