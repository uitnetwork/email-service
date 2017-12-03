package com.uitnetwork.authservice.template

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class TemplateService {
    private val logger = KotlinLogging.logger { }

    @Autowired
    private lateinit var templateRepository: TemplateRepository

    //    @PostConstruct
    fun test() {
        val template = Template(name = "test tempalte 2", description = "something", html = true, hasParameter = true, template = "just an template",
                templateParams = setOf(
                        TemplateParam("key 1", true),
                        TemplateParam("key 2", false),
                        TemplateParam("key 1", true)
                ), userId = "1161375883872470")

        templateRepository.save(template).subscribe({
            logger.info { "Saved: $it" }
        })
    }

    fun createTemplate(template: Template, userId: String): Mono<Template> {
        template.userId = userId

        return templateRepository.save(template)
    }

    fun getTemplates(userId: String): Flux<Template> {
        return templateRepository.findByUserId(userId)
    }

    private fun getTemplate(templateId: String): Mono<Template> {
        return templateRepository.findById(templateId).switchIfEmpty(Mono.error(TemplateNotFoundException("There is no Template with id: $templateId")))
    }

    fun deleteTemplate(templateId: String, userId: String): Mono<Void> {
        return getTemplate(templateId)
                .flatMap { it -> validateThenDelete(it, userId) }
    }

    private fun validateThenDelete(template: Template, userId: String): Mono<Void> {
        if (template.userId != userId) {
            throw TemplateException("User $userId does not have permission.")
        }

        logger.info { "Deleting $template" }
        return this.templateRepository.delete(template)
    }
}
