package com.uitnetwork.authservice.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices
import org.springframework.security.oauth2.client.OAuth2ClientContext
import org.springframework.security.oauth2.client.OAuth2RestTemplate
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails
import javax.servlet.Filter

abstract class AbstractOAuth2Config {

    @Autowired
    private lateinit var oauth2ClientContext: OAuth2ClientContext

    protected fun createOAuth2Filter(oAuth2LoginUrl: String, oauth2ProtectedResourceDetails: OAuth2ProtectedResourceDetails,
                                     resourceServerProperties: ResourceServerProperties): Filter {
        val oauth2Filter = OAuth2ClientAuthenticationProcessingFilter(oAuth2LoginUrl)
        val oauth2RestTemplate = OAuth2RestTemplate(oauth2ProtectedResourceDetails, oauth2ClientContext)
        oauth2Filter.setRestTemplate(oauth2RestTemplate)

        val userInfoTokenServices = UserInfoTokenServices(resourceServerProperties.userInfoUri, oauth2ProtectedResourceDetails.clientId)
        userInfoTokenServices.setRestTemplate(oauth2RestTemplate)
        oauth2Filter.setTokenServices(userInfoTokenServices)

        return oauth2Filter
    }
}
