package ssafy.uniqon.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ssafy.uniqon.global.config.auth.*;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private ApplicationContext context;


    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final TokenProvider tokenProvider;

//    웹 전체 Security 비활성화
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/**", "/**");
//        return (web) -> web.ignoring().requestMatchers("/static/js/**", "/static/image/**", "/static/css/**", "/static/scss/**").anyRequest();
    }

    // PasswordEncoder는 BCryptPasswordEncoder를 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

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
//                .authorizeRequests((authorizeRequests) -> authorizeRequests
//                        .requestMatchers("/api/sales/post**","/api/nfts/detail/**","/api/users/**").permitAll()
//                        .requestMatchers("/api/sales/**", "/api/wallet/**", "/api/myPage/**","api/wishlist/**").authenticated()
//                        .requestMatchers("/api/nfts/**").authenticated()
//                        .anyRequest().permitAll())
//                .formLogin(formlogin->formlogin.disable())
                .formLogin(formLogin -> formLogin
//                        .loginPage("/api/users/login")
// Content-Type을 application/x-www-form-urlencoded
                        .usernameParameter("walletAddress")
                        .passwordParameter("password")
                        .loginProcessingUrl("/api/auth/login")
                        .successHandler(new LoginSuccessHandler(tokenProvider))
                        .failureHandler(new LoginFailuerHandler()))
                .logout(logout->logout
                        .logoutUrl("/api/users/logout")
                        .deleteCookies("JSESSIONID")
                        .clearAuthentication(true)
                        .logoutSuccessHandler(((request, response, authentication) ->
                                response.sendRedirect("/"))))
                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();

    }
}