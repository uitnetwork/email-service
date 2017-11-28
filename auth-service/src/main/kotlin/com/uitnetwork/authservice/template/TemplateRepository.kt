package com.uitnetwork.authservice.template

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux

interface TemplateRepository : ReactiveCrudRepository<Template, String> {

    fun findByUserId(userId: String): Flux<Template>
}
