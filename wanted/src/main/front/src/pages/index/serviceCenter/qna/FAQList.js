import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../../css/faq.css";
import { Link, useNavigate } from "react-router-dom";
import Post from "./QnaDetail";

function FAQList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('question');
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [newFAQ, setNewFAQ] = useState({ title: '', content: '', language: 'ko' });
    const history = useNavigate();

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
                : faq.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFaqs(filtered);
    };

    const activeEvent = (e) => {
        if (e.key === 'Enter') {
            searchFaq();
        }
    };

    return (
        <div className="faq-list-container">
            <h1 className="title">자주 묻는 질문</h1>
            <nav className="navbar">
                <ul className="nav-tabs">
                    <li className="nav-item"><a href="/customerCenter">전체</a></li>
                    <li className="nav-item"><a href="/noticeList">공지사항</a></li>
                    <li className="nav-item"><a href="/questionAndAnswer">질의 응답</a></li>
                    <li className="nav-item active"><a href="/faqList">자주 묻는 질문</a></li>
                </ul>
            </nav>
            <br/>

            {/* 검색 바 - FAQ 목록 위로 이동 */}
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

            {/* FAQ 목록 - 검색 바 아래로 이동 */}
            <ul className="faq-list">
                {filteredFaqs.map((faq) => (
                    <li key={faq.faqId} className="faq-item">
                        <div className="faq-id">{faq.FAQId}</div>
                        <div className="faq-info">
                            <span className="faq-category">FAQ | 자주 묻는 질문 </span>
                            <div className="faq-header">
                                <h4 className="faq-title">
                                    <span to={`/faqDetail/${faq.FAQId}`}>{faq.title}</span>
                                    <span> | {faq.content}</span>
                                </h4>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default FAQList;