package com.uitnetwork.authservice.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.web.filter.CompositeFilter
import javax.servlet.Filter


@Configuration
@EnableOAuth2Client
class SecurityConfig : WebSecurityConfigurerAdapter() {
    companion object {
        val STATIC_RESOURCE_PATTERN = listOf("/*.js", "/*.js.map", "/*.ico")
    }

    @Autowired
    private lateinit var facebookOAuth2Filter: Filter

    @Autowired
    private lateinit var githubOAuth2Filter: Filter

    override fun configure(http: HttpSecurity) {
        http.antMatcher("/**")
                .authorizeRequests().antMatchers("/", "/login**", *STATIC_RESOURCE_PATTERN.toTypedArray()).permitAll()
                .anyRequest().authenticated()
                .and()
                .logout().logoutSuccessUrl("/").permitAll()
                .and()
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .addFilterBefore(createCompositeFilter(facebookOAuth2Filter, githubOAuth2Filter), BasicAuthenticationFilter::class.java)
    }

    private fun createCompositeFilter(vararg filter: Filter): CompositeFilter {
        val compositeFilter = CompositeFilter()
        compositeFilter.setFilters(mutableListOf(*filter))
        return compositeFilter
    }

    // Make sure the OAuth2ClientContextFilter comes before the main Spring Security filter for redirect purpose
    @Bean
    fun oauth2ClientFilterRegistration(filter: OAuth2ClientContextFilter): FilterRegistrationBean {
        val registration = FilterRegistrationBean()
        registration.filter = filter
        registration.order = -100
        return registration
    }
}
