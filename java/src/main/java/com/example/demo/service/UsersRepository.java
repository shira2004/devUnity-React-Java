package com.example.demo.service;

import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users ,Long> {

    Users findFirstByFirstNameContainsAndLassNameContains(String txt,String txt2);
    Optional<Users> findByMail(String mail);}
