package com.uitnetwork.authservice

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class AuthServiceApplication

fun main(args: Array<String>) {
    SpringApplication.run(AuthServiceApplication::class.java, *args)
}
