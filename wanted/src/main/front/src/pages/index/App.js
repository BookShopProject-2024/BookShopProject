import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./about/About";
import BookList from "./book/BookList";
import BookInfo from "./book/BookInfo";
import EventList from "./event/EventList";
import EventInfo from "./event/EventInfo";
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
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
            <Header />
            <main style={{ flex: 1, padding: '85px 20px 20px', overflow: 'auto', backgroundColor: '#f8f9fa' }}> {/* 조정된 padding 값 */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/bookList" element={<BookList />} />
                    <Route path="/bookInfo/:bookId" element={<BookInfo />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/events/:eventId" element={<EventInfoDetail />} />
                    <Route path="/noticeList" element={<NoticeList />} />
                    <Route path="/noticeDetail/:noticeId" element={<NoticeDetail />} />
                    <Route path="/questionAndAnswer" element={<QnaList />} />
                    <Route path="/qnaContent" element={<QnaContent />} />
                    <Route path="/customerCenter" element={<CustomerCenter />} />
                    <Route path="/faqList" element={<FAQList />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
=======
import CustomerCenter from "./serviceCenter/qna/CustomerCenter"

import Main from "./Main";
import React from "react";


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
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/customerCenter" element={<CustomerCenter/>}></Route>
          <Route path="/signIn" element={<SignIn/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
      </Routes>
  );

>>>>>>> Stashed changes
}

export default App;
