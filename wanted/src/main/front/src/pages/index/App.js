import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
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
import axios from "axios";

function App() {

    useEffect(()=>{
        const csrfTokenMeta = document.querySelector("meta[name='_csrf']");
        console.log("Token "+csrfTokenMeta);
        if(csrfTokenMeta){
            axios.defaults.headers.common["X-XSRF-TOKEN"]=csrfTokenMeta.content;
        }
    },[]);

    return (

        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative"}}>
            <Header/>
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
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}
export default App;
