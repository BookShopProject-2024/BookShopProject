import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../../css/noticeList.css";
import { Link } from "react-router-dom";

function FAQList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('question');
    const [filteredFaqs, setFilteredFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get('/info/faqList');
                setFilteredFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };
        fetchFaqs();
    }, []);

    const searchFaq = () => {
        const filtered = filteredFaqs.filter(faq =>
            searchType === 'writer'
                ? faq.writer.toLowerCase().includes(searchTerm.toLowerCase())
                : faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredFaqs(filtered);
    };

    const activeEvent = (e) => {
        if (e.key === 'Enter') {
            searchFaq();
        }
    };

    return (
        <div className="notice-list-container">
            <h1 className="title">자주 묻는 질문</h1>
            <nav className="navbar">
                <ul className="nav-tabs">
                    <li className="nav-item "><a href="/customerCenter">전체</a></li>
                    <li className="nav-item active"><a href="/noticeList">공지사항</a></li>
                    <li className="nav-item"><a href="/questionAndAnswer">질의 응답</a></li>
                    <li className="nav-item"><a href="/faqList">자주 묻는 질문</a></li>
                </ul>
            </nav>
            <br/>
            <div className="search-sort-bar">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="search-select"
                >
                    <option value="question">제목</option>
                    <option value="writer">작성자</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={searchTerm}
                    onKeyDown={activeEvent}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="search-button" onClick={searchFaq}>🔍</button>
            </div>
            <ul className="notice-list">
                {filteredFaqs.map((faq) => (
                    <li key={faq.faqId} className="notice-item">
                        <div className="notice-id">{faq.faqId}</div>
                        <div className="notice-info">
                            <span className="notice-category">FAQ | {new Date(faq.date).toLocaleDateString()}</span>
                            <div className="notice-header">
                                <h4 className="notice-title">
                                    <Link className="remove-decoration"
                                          to={`/faqDetail/${faq.faqId}`}>{faq.question}</Link>
                                </h4>
                                <span className="notice-author">작성자 : {faq.writer}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQList;
