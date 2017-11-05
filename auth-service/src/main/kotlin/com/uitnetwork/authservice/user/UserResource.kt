package com.uitnetwork.authservice.user

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/api")
class UserResource {

    @GetMapping("/user")
    fun user(principal: Principal): Principal {
        return principal
    }
}
