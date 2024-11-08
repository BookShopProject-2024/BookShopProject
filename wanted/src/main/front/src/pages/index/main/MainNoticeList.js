import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../../css/noticeList.css";
import "../../../css/Main.css"

function MainNoticeList() {
    const [noticeList, setNoticeList] = useState([]);

    const getNotices = async () => {
        try {
            const response = await axios.get('/info/noticeList');
            setNoticeList(response.data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    useEffect(() => {
        getNotices();
    }, []);

    return (
        <div className="notice-list-container">
            <a  href="/noticeList"><h2>공지사항</h2></a>

            <ul className="notice-list">
            {noticeList.map((notice) => (
                    <li key={notice.noticeId} className="notice-item">
                        {/*<div className="notice-id">{notice.noticeId}</div>*/}
                        <div className="notice-info">
                            <span className="notice-category">공지사항 | {new Date(notice.date).toLocaleDateString()}</span>
                            <div className="notice-header">
                                <h4 className="notice-title">
                                    <span className="remove-decoration" to={`/noticeDetail/${notice.noticeId}`}>{notice.title}</span>
                                </h4>
                                <span className="notice-author">작성자: {notice.writer}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainNoticeList;
