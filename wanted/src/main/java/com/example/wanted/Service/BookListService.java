package com.example.wanted.Service;

import com.example.wanted.Dao.BookInfoDao;
import com.example.wanted.Dto.BookInfoDto;
import com.example.wanted.Vo.BookInfores;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookListService {

    private static final Logger logger = LoggerFactory.getLogger(BookListService.class);
    private final BookInfoDao bookInfoDao;

    public List<BookInfoDto> findAllBookInfo() {
        return bookInfoDao.findAll().stream()
            .map(BookInfoDto::fromEntity)
            .collect(Collectors.toList());
    }

    public BookInfoDto findOneBookInfo(Long bookId) {
        BookInfores bookInfores = bookInfoDao.findById(bookId)
            .orElseThrow(() -> new NoSuchElementException("Book not found with ID: " + bookId));
        return BookInfoDto.fromEntity(bookInfores);
    }

    public BookInfoDto saveBookInfo(BookInfoDto bookInfoDto) {
        BookInfores bookInfores = bookInfoDao.save(bookInfoDto.toEntity());
        return BookInfoDto.fromEntity(bookInfores);
    }

    public BookInfoDto updateBookInfo(Long bookId, BookInfoDto bookInfoDto) {
        if (!bookInfoDao.existsById(bookId)) {
            throw new NoSuchElementException("Book not found with ID: " + bookId);
        }
        BookInfores bookInfores = bookInfoDto.toEntity();
        bookInfores.setBookId(bookId);
        return BookInfoDto.fromEntity(bookInfoDao.save(bookInfores));
    }

    public void deleteBookInfo(Long bookId) {
        if (!bookInfoDao.existsById(bookId)) {
            throw new NoSuchElementException("Book not found with ID: " + bookId);
        }
        bookInfoDao.deleteById(bookId);
    }
}
