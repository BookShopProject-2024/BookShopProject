import "../../../../css/customerCenter.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoticeList from "../notice/NoticeList";
import FAQList from "./FAQList";
import Post from "./QnaDetail";

function CustomerCenter() {
    const [noticeList, setNoticeList] = useState([]);
    const [qnaList, setQnaList] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/info/noticeList');
                setNoticeList(response.data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, []);

    useEffect(() => {
        const fetchQna = async () => {
            try {
                const response = await axios.get('/info/qnaList', {
                    params: {
                        page: 0,
                        size: itemsPerPage,
                    },
                });
                setQnaList(response.data);
            } catch (error) {
                console.error('Error fetching Q&A:', error);
            }
        };

        fetchQna();
    }, []);

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

    return (
        <div className="customerCenter">
            <h1 className="title">고객센터</h1>
            <nav className="navbar">
                <ul className="nav-tabs">
                    <li className="nav-item"><a href="/customerCenter">전체</a></li>
                    <li className="nav-item"><a href="/noticeList">공지사항</a></li>
                    <li className="nav-item"><a href="/questionAndAnswer">질의 응답</a></li>
                    <li className="nav-item"><a href="/FAQList">자주 묻는 질문</a></li>
                </ul>
            </nav>
            <div className="Qna">
                <h1>무엇을 도와드릴까요?<br/>
                    에스라 출판사 고객 센터입니다.
                </h1>
                <br/>
                <h3>공지사항<a className="more-link" href="/noticeList">더보기 ></a></h3>
                <ul className="notice-list">
                    {noticeList.map((notice) => (
                        <li key={notice.noticeId} className="notice-item">
                            {/*<div className="notice-id">{notice.noticeId}</div>*/}
                            <div className="notice-info">
                                <span
                                    className="notice-category">공지사항| {new Date(notice.date).toLocaleDateString()}</span>
                                <div className="notice-header">
                                    <h4 className="notice-title">
                                        <Link className="remove-decoration"
                                              to={`/noticeDetail/${notice.noticeId}`}>{notice.title}</Link>
                                    </h4>
                                    <span className="notice-author">작성자 : {notice.writer}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <h3>질의 응답<a className="more-link" href="/questionAndAnswer">더보기 ></a></h3>
                <ul className="qna-list">
                    {qnaList.map((qna) => (
                        <Post
                            key={qna.qnaId}
                            title={qna.title}
                            content={qna.content}
                            qnaId={qna.qnaId}
                            passWord={qna.passWord}
                        />
                    ))}
                </ul>
                <h3>자주 묻는 질문</h3>
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
        </div>
    );
}

export default CustomerCenter;
