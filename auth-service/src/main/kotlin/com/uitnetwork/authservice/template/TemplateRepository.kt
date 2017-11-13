package com.uitnetwork.authservice.template

import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface TemplateRepository : ReactiveCrudRepository<Template, String> {
}
