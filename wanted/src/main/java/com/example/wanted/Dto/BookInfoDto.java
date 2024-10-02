package com.example.wanted.Dto;

import com.example.wanted.Vo.BookInfores;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BookInfoDto {
	private Long bookId;
	private String title;
	private String author;
	private String publisher;
	private String description;
	private String category;
	private String language;
	private int price;

	// DTO를 Entity로 변환하는 메서드
	public BookInfores toEntity() {
		return BookInfores.builder()
			.bookId(this.bookId)
			.title(this.title)
			.author(this.author)
			.publisher(this.publisher)
			.description(this.description)
			.category(this.category)
			.language(this.language)
			.price(this.price)
			.build();
	}

	// Entity를 DTO로 변환하는 메서드
	public static BookInfoDto fromEntity(BookInfores bookInfores) {
		return BookInfoDto.builder()
			.bookId(bookInfores.getBookId())
			.title(bookInfores.getTitle())
			.author(bookInfores.getAuthor())
			.publisher(bookInfores.getPublisher())
			.description(bookInfores.getDescription())
			.category(bookInfores.getCategory())
			.language(bookInfores.getLanguage())
			.price(bookInfores.getPrice())
			.build();
	}
}
