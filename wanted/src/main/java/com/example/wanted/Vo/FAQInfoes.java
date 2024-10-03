package com.example.wanted.Vo;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="FAQInfoes")
@Getter
@Setter

public class FAQInfoes extends  BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long FAQId;
    @NonNull
    @Column(unique = false,length = 100)
    private String title; //질문 넣는 곳
    @NonNull
    @Column(unique = false,length = 1000)
    private String content; // 답변 넣는 곳
    @NonNull
    @Column(unique = false,length = 50)
    private String language;
}
