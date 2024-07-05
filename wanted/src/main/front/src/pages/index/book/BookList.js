import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../css/Main.css"; // 이 경로는 프로젝트 구조에 따라 조정하세요.
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";

function BookList() {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 5;

    const getBookList = async () => {
        try {
            const resp = await axios.get('/info/bookList/');
            const data = resp.data;
            console.log(data);
            setBookList(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bookList", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookList();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = bookList.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(bookList.length / ITEMS_PER_PAGE);

    return (
        <div className="book-list">
            <h1>책 목록</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <div className="book-grid">
                        {currentItems.map((book) => (
                            <div className="book-item" key={book.bookId}>
                                <Link to={`/bookInfo/${book.bookId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="book-card">
                                        <img src={`/${book.imgLocation}`} alt={book.title} className="book-cover"/>
                                        <h3 className="book-title">{book.title}</h3>
                                        <p className="book-author">저자: {book.author}</p>
                                        <p className="book-author">가격: {book.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={'이전'}
                        nextLabel={'다음'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </>
            )}
        </div>
    );
}

export default BookList;
