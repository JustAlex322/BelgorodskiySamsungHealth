package com.example.reg3.controller;


import com.example.reg3.Service.UserService;
import com.example.reg3.dao.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("updayteDayOfTrain")
    public ResponseEntity<Object> updateDayOfTraining
            (@RequestParam(required =false) Long userId) {
        return userService.addProgressOfTrain(userId);
    }

    @GetMapping("setTrainToUser")
    public ResponseEntity<Object> addTrainToUser(@RequestParam(required =false) Long userId,
                                                 @RequestParam(required =false) Long trainId) {
        return userService.setTrainToUser(userId, trainId);
    }

    @PostMapping("setUserData")
    public ResponseEntity<Object> setUserData(@RequestBody User user) {
        return userService.setUserData(user);
    }

    @GetMapping("getUserData")
    public ResponseEntity<Object> getUserData(@RequestParam(required =false) Long userId) {
        return userService.getUserData(userId);
    }
}