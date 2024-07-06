package com.example.wanted.Vo;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="usersInfo")
@Getter
@Setter
@NoArgsConstructor
public class UserInfores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(unique = true,length = 20)
    private String userId;

    @NonNull
    @Column(unique = false,length=25)
    private String userName;

    @NonNull
    @Column(unique = false,length = 50)
    private String email;

    @NonNull
    @Column(unique = false,length = 11)
    private String telNo;

    @NonNull
    @Column(unique = false,length = 300)
    private String passWord;

    @NonNull
    @Column(unique = false,length = 500)
    private String address;

    @NonNull
    @Column(unique = false,length = 500)
    private String zipcode;

    @Enumerated(EnumType.STRING)
    private Authority authority;

}
