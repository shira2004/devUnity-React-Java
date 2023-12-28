package com.example.demo.controller;

import com.example.demo.model.Users;
import com.example.demo.service.EmailService;
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
    private EmailService emailService;
    @Autowired
    public UsersController(UsersRepository usersRepository,EmailService emailService)
    {
        this.emailService=emailService;
        this.usersRepository = usersRepository;
    }
    @GetMapping("/getUsers")
    public ResponseEntity<List<Users>> getUsers(){
        try{
            List<Users> users=new ArrayList<>();
            usersRepository.findAll().forEach(e->users.add(e));
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        catch (Exception e)
        {
            //שגיאה 500
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable long id){
        Users e=usersRepository.findById(id).orElse(null);
        if(e!=null){
            return new ResponseEntity<>(e,HttpStatus.OK);
        }
        else
        {
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
            String subject = "Welcome to YourWebsite!";
            String body = "Dear " + newUser.getFirstName() + ",\n\nThank you for signing up on YourWebsite. We are excited to have you on board!";
            emailService.sendEmail(newUser.getEmail(), subject, body);

            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // This will print the stack trace to the console
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<Object> signUp(@RequestBody Users user) {
        try {
            Optional<Users> existingUser = usersRepository.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return new ResponseEntity<>("Email already registered", HttpStatus.CONFLICT);
            } else {
                Users newUser = usersRepository.save(user);
                return new ResponseEntity<>(newUser, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            // Log the exception using SLF4J
            System.out.println(e);
            return new ResponseEntity<>("Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/signIn")
    public ResponseEntity<Users> signIn(@RequestBody Users user) {
        try {
            Optional<Users> existingUser = usersRepository.findUsersByEmailAndPassword(user.getEmail(), user.getPassword());

            if (existingUser.isPresent()) {
                return new ResponseEntity<>(existingUser.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null , HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // New method for scheduled task to send emails every day at 21:27
    @Scheduled(cron = "0 0 12 ? * SUN") // This cron expression represents "every day at 21:27"
    public void sendDailyEmails() {
        try {
            List<Users> allUsers = usersRepository.findAll();
            for (Users user : allUsers) {
                String subject = "Daily Greetings from DevUnity!";
                String body = "Dear " + user.getFirstName() + ",\n\nThis is your daily greeting from YourWebsite. Have a great day!";
                emailService.sendEmail(user.getEmail(), subject, body);
            }
        } catch (Exception e) {
            e.printStackTrace();  // Handle the exception as needed
        }
    }
}















