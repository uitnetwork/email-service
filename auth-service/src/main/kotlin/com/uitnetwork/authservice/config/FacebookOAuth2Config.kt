package com.uitnetwork.authservice.config

import mu.KotlinLogging
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails
import javax.servlet.Filter


@Configuration
class FacebookOAuth2Config : AbstractOAuth2Config() {
    companion object {
        val logger = KotlinLogging.logger { }

        const val FACEBOOK_OAUTH2_LOGIN_URL = "/login/facebook"
    }

    @Bean
    @ConfigurationProperties(prefix = "facebook.client")
    fun facebook(): AuthorizationCodeResourceDetails {
        return AuthorizationCodeResourceDetails()
    }

    @Bean
    @ConfigurationProperties(prefix = "facebook.resource")
    fun facebookResource(): ResourceServerProperties {
        return ResourceServerProperties()
    }

    @Bean
    fun facebookOAuth2Filter(): Filter {
        logger.info { "Creating filter for facebook: $FACEBOOK_OAUTH2_LOGIN_URL" }

        return createOAuth2Filter(FACEBOOK_OAUTH2_LOGIN_URL, facebook(), facebookResource())
    }
}
