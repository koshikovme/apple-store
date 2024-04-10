package com.example.store2.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling(ex -> ex.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
//                .cors(AbstractHttpConfigurer::disable)
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers(HttpMethod.POST, "/login", "/register", "/add-session", "/delete-session", "/createOrder").permitAll()
                        .requestMatchers(HttpMethod.GET, "/admin/searchGoods", "api/admin/userByLogin", "/fetchUserData", "/images", "/goodsByNames", "/ordersByUserId", "/orders", "/ordersById", "/searchByOrderId/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/admin/users", "/api/admin/createUser", "api/admin/usersByLogin").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/deleteByUserId").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/admin/editUser").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/updated-orders").permitAll()
                        .requestMatchers(HttpMethod.GET, "/updated-orders").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/api/admin/editUser").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/admin/editUser/**").permitAll()
                        .requestMatchers("/updated-orders/**", "/messages", "/test").permitAll()
                        .anyRequest().authenticated());

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Allow cookies to be sent with the request
        config.addAllowedOrigin("http://localhost:3000"); // Allow requests only from the frontend origin
        config.addAllowedMethod("*"); // Allow all HTTP methods
        config.addAllowedHeader("*"); // Allow all headers
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
