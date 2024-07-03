package com.example.wanted.Vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenInfores {
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;

}