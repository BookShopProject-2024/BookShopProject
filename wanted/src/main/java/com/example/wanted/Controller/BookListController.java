package com.example.wanted.Controller;

import com.example.wanted.Service.BookListService;
import com.example.wanted.Dto.BookInfoDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/info/bookList")
@RequiredArgsConstructor
public class BookListController {

    private static final Logger logger = LoggerFactory.getLogger(BookListController.class);
    private final BookListService bookListService;

    // 책 목록 조회 - 관리자, 유저 둘다
    @GetMapping
    public List<BookInfoDto> getBookList() {
        logger.info("Fetching all books");
        return bookListService.findAllBookInfo();
    }

    // 특정 도서 정보를 조회 - 관리자, 유저 둘다
    @GetMapping("/bookInfo/{bookId}")
    public BookInfoDto getBookInfo(@PathVariable Long bookId) {
        logger.info("Fetching book with ID: {}", bookId);
        return bookListService.findOneBookInfo(bookId);
    }

    // 새로운 도서 추가 - 관리자용
    @PostMapping
    public BookInfoDto createBook(@RequestBody BookInfoDto bookInfoDto) {
        logger.info("Creating new book");
        return bookListService.saveBookInfo(bookInfoDto);
    }

    // 기존 도서 정보 수정 - 관리자용
    @PutMapping("/{bookId}")
    public BookInfoDto updateBook(@PathVariable Long bookId, @RequestBody BookInfoDto bookInfoDto) {
        logger.info("Updating book with ID: {}", bookId);
        return bookListService.updateBookInfo(bookId, bookInfoDto);
    }

    // 특정 도서 삭제 - 관리자용
    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable Long bookId) {
        logger.info("Deleting book with ID: {}", bookId);
        bookListService.deleteBookInfo(bookId);
    }
}
