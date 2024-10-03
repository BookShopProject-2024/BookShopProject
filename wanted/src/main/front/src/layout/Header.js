import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../pages/index/AuthContext';
import "../css/headerStyle.css";
import "../css/headerBoot.css"
import "../css/header.css"

const Header = () => {
    const { isAuthenticated, removeAuthToken } = useAuth();

    return (
        <section id="header">
            <div className="header-area">
                <div className="header_menu text-center" data-spy="affix" data-offset-top="50" id="nav">
                    <div className="container">
                        <nav className="navbar navbar-default zero_mp ">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand custom_navbar-brand" href="#"><img src="img/logo.png"
                                                                                              alt=""/></a>
                            </div>
                            <div className="collapse navbar-collapse zero_mp" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right main_menu">
                                    <li><Link to="/">홈</Link></li>
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
                                            <li><Link to="/customerCenter">소개</Link></li>
                                            <li><Link to="/noticeList">공지사항</Link></li>
                                            <li><Link to="/questionAndAnswer">질의응답</Link></li>
                                        </ul>
                                    </li>
                                    {isAuthenticated ? (
                                        <li className="auth-links">
                                            <Link onClick={removeAuthToken} className="small-font bottom-align">로그아웃</Link>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="auth-links">
                                                <Link to="/signIn" className="small-font bottom-align">로그인</Link>
                                            </li>
                                            <li className="auth-links">
                                                <Link to="/signup" className="small-font bottom-align">회원가입</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                                <ul>

                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Header;
