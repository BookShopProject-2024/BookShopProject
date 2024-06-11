//상태와 effect란?
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import  "../../../../Main.css";

function BookList() {
    const [noticeList,setNoticeList] = useState([]);
    const [loading,setLoading] = useState(true);
    const getNoticeList = async () => {
        //await 이란?
        try{
            const resp = await axios.get('/bookList/');
            const data = resp.data; //데이타에 저장
            setNoticeList(data); // 받아온 정보를 BookList에 저장
            setLoading(false); // 로딩 상태를 false로 변경
            }catch(error){
            console.error("Error fetching bookList",error);
            setLoading(true); // 로딩 상태를 false로 변경
        }
    };

    useEffect(()=>{
        getNoticeList(); //게시글 목록 조회 함수 호출
    },[]);

    return(
        <div>
            <ul>
                {loading ? (<h2>Loading...</h2>)
                    :(<h2>공지사항</h2>)
                }
                {noticeList.map((board)=> (
                    <li className="noDot" key={board.bookId}>
                        <Link to={`/bookInfo/${board.bookId}`}>{board.title} {board.bookId}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
