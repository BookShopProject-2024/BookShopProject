package com.example.wanted.config;

import com.example.wanted.Jwt.JwtAccessDeniedHandler;
import com.example.wanted.Jwt.JwtAuthenticationEntryPoint;
import com.example.wanted.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

@Configuration
@EnableWebSecurity // 스프링 Security 지원을 가능하게 함
@RequiredArgsConstructor //??
@Component
public class WebSecurityConfig{

    private final JwtTokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        //springsecurity의 header정보를 disable한다.
        http
        .httpBasic().disable()
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .accessDeniedHandler(jwtAccessDeniedHandler)
        .and()
        .authorizeRequests()
        // image 폴더를 login 없이 허용
        .antMatchers("/images/**").permitAll()
        // css 폴더를 login 없이 허용
        .antMatchers("/css/**").permitAll()
        //info로 시작하는 것은 인증 x
        .antMatchers("/info/**").permitAll()
        .antMatchers("/customer/**").permitAll()
        // 어떤 요청이든 '인증'
        .anyRequest().authenticated();
                // 로그인 기능 허용
        http.formLogin()
            .loginPage("/customer/login")
            .defaultSuccessUrl("/")
            .failureUrl("/customer/login?error")
            .permitAll()
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
        ;// 로그아웃 기능 허용
        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/info/logout"))
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true);

        http.sessionManagement() //중복로그인 제어
                .maximumSessions(1) //세션 최대 허용 수
                .maxSessionsPreventsLogin(false); // false: 중복 로그인하면 이전 로그인이 풀림
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}