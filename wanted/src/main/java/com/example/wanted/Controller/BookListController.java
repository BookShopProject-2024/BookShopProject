package com.example.wanted.Controller;

import com.example.wanted.Service.BookListService;
import com.example.wanted.Dto.BookInfoDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/info/books")
@RequiredArgsConstructor
public class BookListController {

    private static final Logger logger = LoggerFactory.getLogger(BookListController.class);
    private final BookListService bookListService;

    @GetMapping
    public List<BookInfoDto> getBookList() {
        logger.info("Fetching all books");
        return bookListService.findAllBookInfo();
    }

    @GetMapping("/{bookId}")
    public BookInfoDto getBookInfo(@PathVariable Long bookId) {
        logger.info("Fetching book with ID: {}", bookId);
        return bookListService.findOneBookInfo(bookId);
    }

    @PostMapping
    public BookInfoDto createBook(@RequestBody BookInfoDto bookInfoDto) {
        logger.info("Creating new book");
        return bookListService.saveBookInfo(bookInfoDto);
    }

    @PutMapping("/{bookId}")
    public BookInfoDto updateBook(@PathVariable Long bookId, @RequestBody BookInfoDto bookInfoDto) {
        logger.info("Updating book with ID: {}", bookId);
        return bookListService.updateBookInfo(bookId, bookInfoDto);
    }

    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable Long bookId) {
        logger.info("Deleting book with ID: {}", bookId);
        bookListService.deleteBookInfo(bookId);
    }
}
