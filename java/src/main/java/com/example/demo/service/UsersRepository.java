package com.example.demo.service;

import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users ,Long> {

    Users findFirstByFirstNameContainsAndLastNameNotContains(String txt,String txt2);
    Optional<Users> findByEmail(String mail);}
