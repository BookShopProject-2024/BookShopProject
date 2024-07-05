import React from 'react';
import '../../../css/bookInfo.css';


const BookDetail = ({ bookId, title, imgLocation, description, author,publishDate,format,pages,isbn,discountPrice,purchaseLink,price }) => {
    return (
        <div className="book-details">
            <div className="book-header">
                <img src={'/'+imgLocation} alt="preparing..." className="book-detail-cover" />

                <div className="book-meta">
                    <h1>{title}</h1>
                    <div className="book-meta-details">
                        <p><strong>저자:</strong> {author}</p>
                        <p><strong>출간일:</strong> {publishDate}</p>
                        <p><strong>판형:</strong> {format}</p>
                        <p><strong>페이지:</strong> {pages}</p>
                        <p><strong>ISBN:</strong> {isbn}</p>
                        <p><strong>정가:</strong> {price}원</p>
                        <p><strong>인터넷할인가:</strong> {price*0.9}원</p>
                    </div>
                    <a href="https://www.naver.com" className="purchase-button">책 구매하러 가기</a>
                </div>
            </div>
            <div className="book-description">
                <h2>도서 소개</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default BookDetail;