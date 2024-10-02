package com.example.wanted.Vo;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "book_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookInfores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @NonNull
    @Column(unique = false, length = 100)
    private String title;

    @NonNull
    @Column(unique = false, length = 50)
    private String author;

    @NonNull
    @Column(unique = false, length = 50)
    private String publisher;

    @NonNull
    @Column(unique = false, length = 300)
    private String description;

    @NonNull
    @Column(unique = false, length = 50)
    private String category;

    @NonNull
    @Column(unique = false, length = 50)
    private String language;

    @NonNull
    @Column(unique = false, length = 50)
    private int price;
}
