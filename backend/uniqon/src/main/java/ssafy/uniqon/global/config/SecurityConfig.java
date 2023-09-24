package ssafy.uniqon.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ssafy.uniqon.global.config.auth.*;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final TokenProvider tokenProvider;

//    웹 전체 Security 비활성화
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().requestMatchers("/**", "/**");
//    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler))
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeRequests((authorizeRequests) -> authorizeRequests
//                        .requestMatchers("/api/users/login", "/api/users/signup","/transaction").permitAll()
//                        .anyRequest().authenticated())
                .authorizeRequests((authorizeRequests) -> authorizeRequests
                        .requestMatchers("/api/sales/post**","/api/nfts/detail/**").permitAll()
                        .requestMatchers("/api/sales/**", "/api/wallet/**", "/api/myPage/**","api/wishlist/**").authenticated()
                        .requestMatchers("/api/nfts/**").authenticated()
                        .anyRequest().permitAll())
//                .formLogin(formlogin->formlogin.disable())
                .formLogin(formLogin -> formLogin
//                        .loginPage("/api/users/login")
                        .loginProcessingUrl("/api/users/login")
                        .successHandler(new LoginSuccessHandler())
                        .failureHandler(new LoginFailuerHandler()))
                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();

    }
}