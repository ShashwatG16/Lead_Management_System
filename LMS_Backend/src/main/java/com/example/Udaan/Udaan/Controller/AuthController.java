package com.example.Udaan.Udaan.Controller;

import com.example.Udaan.Udaan.Enitty.AuthRequest;
import com.example.Udaan.Udaan.Enitty.AuthResponse;
import com.example.Udaan.Udaan.Enitty.User;
import com.example.Udaan.Udaan.Repositories.UserRepository;
import com.example.Udaan.Udaan.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


//fetch('/api/v1/users/register', {
//    method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({
//            username: 'testuser',
//            password: 'password123',
//            role: 'USER',
//  }),
//})
//        .then(res => res.json())
//        .then(data => console.log(data));


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            System.out.println("initiating login");
            System.out.println("before jwt util");
            String token = jwtUtil.generateToken(user.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(){


        return ResponseEntity.ok().body("Sucessfully Logged out");
    }
}

