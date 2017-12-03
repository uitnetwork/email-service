package com.uitnetwork.authservice.template

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus.OK
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.Mono.just
import java.security.Principal

@RestController
@RequestMapping("/api/templates")
class TemplateResources {
    private val logger = KotlinLogging.logger {}

    @Autowired
    private lateinit var templateService: TemplateService

    @PostMapping
    fun createTemplate(principal: Principal, @RequestBody template: Template): Mono<Template> {
        return templateService.createTemplate(template, principal.name)
    }

    @GetMapping
    fun getTemplates(principal: Principal): Flux<Template> {
        return templateService.getTemplates(principal.name)
    }

    @DeleteMapping("/{templateId}")
    fun deleteTemplate(@PathVariable("templateId") templateId: String, principal: Principal): Mono<ResponseEntity<Void>> {
        return templateService.deleteTemplate(templateId, principal.name)
                .then(just(ResponseEntity(OK)))
    }
}
