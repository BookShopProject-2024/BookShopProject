import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { isTokenValid, logout } from '../pages/index/Auth';
import "../css/header.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isTokenValid());
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/about">소개</Link></li>
                    <li className="dropdown">
                        <Link to="/bookList">책</Link>
                        <ul className="dropdown-content">
                            <li><Link to="/bookList">소개</Link></li>
                            <li><Link to="/bookPurchase">구매</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/events">이벤트</Link></li>
                    <li className="dropdown">
                        <Link to="/customerCenter">고객센터</Link>
                        <ul className="dropdown-content">
                            <li><Link to="/customerCenter">전체</Link></li>
                            <li><Link to="/noticeList">공지사항</Link></li>
                            <li><Link to="/questionAndAnswer">질의응답</Link></li>
                        </ul>
                    </li>
                    <div className="auth-links">
                        {isLoggedIn ? (
                            <li><button onClick={handleLogout} className="small-font bottom-align">로그아웃</button></li>
                        ) : (
                            <>
                                <li><Link to="/signIn" className="small-font bottom-align">로그인</Link></li>
                                <li><Link to="/signUp" className="small-font bottom-align">회원가입</Link></li>
                            </>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
