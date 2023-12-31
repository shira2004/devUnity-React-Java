package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.model.Users;
import com.example.demo.service.EmailService;
import com.example.demo.service.ProjectRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {
    @Autowired
    private UsersRepository usersRepository;

    private ProjectRepository projectRepository;
    private EmailService emailService;

    @Autowired
    public UsersController(UsersRepository usersRepository, EmailService emailService, ProjectRepository projectRepository) {
        this.emailService = emailService;
        this.usersRepository = usersRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<Users>> getUsers() {
        try {
            List<Users> users = new ArrayList<>();
            usersRepository.findAll().forEach(e -> users.add(e));
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            //שגיאה 500
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable long id) {
        Users e = usersRepository.findById(id).orElse(null);
        if (e != null) {
            return new ResponseEntity<>(e, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUserByMail/{mail}")
    public ResponseEntity<String> getUserByMail(@PathVariable String email) {
        Optional<Users> userOptional = usersRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            return new ResponseEntity<>(user.getPassword(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        try {
            Users newUser = usersRepository.save(user);

            // Send welcome email to the user
            String subject = "Welcome to DevUnity!";
            String body = "Dear " + newUser.getFirstName() + ",\n\nThank you for signing up on DevUnity. We are excited to have you on board!";
            emailService.sendEmail(newUser.getEmail(), subject, body);

            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // This will print the stack trace to the console
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/signIn")
    public ResponseEntity<Users> signIn(@RequestBody Users user) {
        try {
            Optional<Users> existingUser = usersRepository.findUsersByEmailAndPassword(user.getEmail(), user.getPassword());

            if (existingUser.isPresent()) {
                return new ResponseEntity<>(existingUser.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // New method for scheduled task to send emails every day at 21:27
    @Scheduled(cron = "0 27 1 ? * SUN")
    //@Scheduled(cron = "0 0 0 * * SUN")
    public void sendDailyEmails() {
        try {
            // Fetch the 5 latest projects
            List<Project> latestProjects = projectRepository.findTop5ByOrderByDateDesc();

            // Iterate over all active users (status = 1)
            List<Users> activeUsers = usersRepository.findByStatus(1);
            for (Users user : activeUsers) {
                String subject = "Unlock the Latest: Weekly Project News!\"";
                String body = "Dear " + user.getFirstName() + ",\n\nWe hope this email finds you well. It's time for our weekly update on the exciting happenings in our community and projects. Let's dive in!:\n"
                        + "Latest Projects:\n" + formatLatestProjects(latestProjects);

                emailService.sendEmail(user.getEmail(), subject, body);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String formatLatestProjects(List<Project> latestProjects) {
        StringBuilder builder = new StringBuilder();
        for (Project project : latestProjects) {
            builder.append(" - Project: ").append(project.getTitle()).append("\n")
                    .append("   Description: ").append(project.getDescription()).append("\n")
                    .append("   Created by: ").append(project.getUser().getFirstName()).append("\n\n");
        }
        return builder.toString();
    }

    @PutMapping("/incrementDonationTax/{id}")
    public ResponseEntity<Users> incrementDonationTax(@PathVariable long id) {
        Users user = usersRepository.findById(id).orElse(null);

        if (user != null) {
            user.setDonationTax(user.getDonationTax() + 1);

            Users updatedUser = usersRepository.save(user);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}












