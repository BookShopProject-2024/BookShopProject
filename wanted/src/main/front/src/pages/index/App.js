import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // 경로를 확인하세요
import About from "./about/About";
import BookList from "./book/BookList";
import BookInfo from "./book/BookInfo";
import EventList from "./event/EventList";
import NoticeList from "./serviceCenter/notice/NoticeList";
import NoticeDetail from "./serviceCenter/notice/NoticeDetail";
import QnaList from "./serviceCenter/qna/QnaList";
import QnaContent from "./serviceCenter/qna/QnaContent";
import CustomerCenter from "./serviceCenter/qna/CustomerCenter";
import FAQList from "./serviceCenter/qna/FAQList";
import SignIn from "./sign/SignIn";
import SignUp from "./sign/SignUp";
import Main from "./Main";
import EventInfoDetail from "./event/EventInfoDetail";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function App() {
    return (

            <AuthProvider>
                <div style={{display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative"}}>
                    <Header />
                    <main style={{
                        flex: 1,
                        padding: '85px 20px 20px',
                        overflow: 'auto',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/bookList" element={<BookList/>}/>
                            <Route path="/bookInfo/:bookId" element={<BookInfo/>}/>
                            <Route path="/events" element={<EventList/>}/>
                            <Route path="/events/:eventId" element={<EventInfoDetail/>}/>
                            <Route path="/noticeList" element={<NoticeList/>}/>
                            <Route path="/noticeDetail/:noticeId" element={<NoticeDetail/>}/>
                            <Route path="/questionAndAnswer" element={<QnaList/>}/>
                            <Route path="/qnaContent" element={<QnaContent/>}/>
                            <Route path="/customerCenter" element={<CustomerCenter/>}/>
                            <Route path="/faqList" element={<FAQList/>}/>
                            <Route path="/faqList/:FAQId" element={<faqDetail/>}/>
                            <Route path="/signIn" element={<SignIn />}/>
                            <Route path="/signUp" element={<SignUp/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </AuthProvider>

    );
}

export default App;
