package com.uitnetwork.authservice.template

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

@Service
class TemplateService {
    private val logger = KotlinLogging.logger { }

    @Autowired
    private lateinit var templateRepository: TemplateRepository

    @PostConstruct
    fun test() {
        val template = Template(name = "test tempalte 2", description = "something", html = true, hasParameter = true, template = "just an template",
                templateParams = setOf(
                        TemplateParam("key 1", true),
                        TemplateParam("key 2", false),
                        TemplateParam("key 1", true)
                ))

        templateRepository.save(template).subscribe({
            logger.info { "Saved: $it" }
        })
    }
}
