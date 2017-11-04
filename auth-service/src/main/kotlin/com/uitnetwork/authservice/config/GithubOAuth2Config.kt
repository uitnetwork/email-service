package com.uitnetwork.authservice.config

import mu.KotlinLogging
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails
import javax.servlet.Filter

@Configuration
class GithubOAuth2Config : AbstractOAuth2Config() {
    companion object {
        val logger = KotlinLogging.logger { }

        const val GITHUB_OAUTH2_LOGIN_URL = "/login/github"
    }

    @Bean
    @ConfigurationProperties(prefix = "github.client")
    fun github(): AuthorizationCodeResourceDetails {
        return AuthorizationCodeResourceDetails()
    }

    @Bean
    @ConfigurationProperties(prefix = "github.resource")
    fun githubResource(): ResourceServerProperties {
        return ResourceServerProperties()
    }

    @Bean
    fun githubOAuth2Filter(): Filter {
        logger.info { "Creating filter for github: $GITHUB_OAUTH2_LOGIN_URL" }

        return createOAuth2Filter(GITHUB_OAUTH2_LOGIN_URL, github(), githubResource())
    }
}
