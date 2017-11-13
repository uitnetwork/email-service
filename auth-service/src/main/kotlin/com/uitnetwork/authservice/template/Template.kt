package com.uitnetwork.authservice.template

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Template(
        @Id
        var id: String? = null,

        var name: String,

        var description: String,

        var html: Boolean,

        var hasParameter: Boolean,

        var templateParams: Set<TemplateParam>,

        var template: String
)

data class TemplateParam(
        var paramKey: String,
        var required: Boolean
)
