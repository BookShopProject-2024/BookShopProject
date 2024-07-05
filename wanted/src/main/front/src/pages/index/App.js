import {Route, Routes} from "react-router-dom";
import About from "./about/About"
import BookList from "./book/BookList";
import BookInfo from "./book/BookInfo";
import EventList from "./event/EventList";
import NoticeList from "./serviceCenter/notice/NoticeList";
import NoticeDetail from "./serviceCenter/notice/NoticeDetail";
import QnaList from "./serviceCenter/qna/QnaList";
import QnaContent from "./serviceCenter/qna/QnaContent";
import CustomerCenter from "./serviceCenter/qna/CustomerCenter";
import SignIn from "./sign/SignIn";
import SignUp from "./sign/SignUp";
import Main from "./Main";
import EventInfoDetail from "./event/EventInfoDetail";
import React, {useEffect} from "react";
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
      <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/bookList" element={<BookList/>}></Route>
          <Route path="/bookInfo/:bookId" element={<BookInfo/>}></Route>
          <Route path="/events" element={<EventList/>}></Route>
          <Route path="/events/:eventId" element={<EventInfoDetail/>}></Route>
          <Route path="/noticeList" element={<NoticeList/>}></Route>
          <Route path="/noticeDetail/:noticeId" element={<NoticeDetail/>}></Route>
          <Route path="/questionAndAnswer" element={<QnaList/>}></Route>
          <Route path="/qnaContent" element={<QnaContent/>}></Route>
          <Route path="/customerCenter" element={<CustomerCenter/>}></Route>
          <Route path="/signIn" element={<SignIn/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
      </Routes>
  );
}

export default App;