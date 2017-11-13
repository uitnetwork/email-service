package com.uitnetwork.authservice.user

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api")
class UserResource {

    @GetMapping("/user")
    fun user(principal: Principal): Mono<Principal> {
        return Mono.just(principal)
    }
}
