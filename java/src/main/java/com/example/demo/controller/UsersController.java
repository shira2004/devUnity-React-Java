package com.example.demo.controller;

import com.example.demo.model.Users;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {
    private UsersRepository usersRepository;
    @Autowired
    public UsersController(UsersRepository usersRepository) {
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
    public ResponseEntity<String> getUserByMail(@PathVariable String mail) {
        Optional<Users> userOptional = usersRepository.findByMail(mail);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            return new ResponseEntity<>(user.getPasswod(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}





