import React, {useState,useEffect} from 'react';
import axios from 'axios';
import "../../../../css/qna.css";

function QnaList() {
    const [qnaList, setQnaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const getQnaList = async () => {
        //await 이란?
        try {
            const resp = await axios.get('/qnaList');
            const data = resp.data; //데이타에 저장
            setQnaList(data); // 받아온 정보를 BookList에 저장
            setLoading(false); // 로딩 상태를 false로 변경
        } catch (error) {
            console.error("Error fetching bookList", error);
            setLoading(true); // 로딩 상태를 false로 변경
        }
    };

    useEffect(() => {
        getQnaList(); //게시글 목록 조회 함수 호출
    }, []);

    return (
        <div className="Qna">
            {loading ? (<h2>Loading...</h2>)
                : (<h2>Q&A</h2>)
            }
            {qnaList.map((qnaList) => (
                <Post title={qnaList.title} content={qnaList.writer}/>
            ))}

        </div>
    )
};

    const Post = ({ title, content,qnaId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="post">
            <div className="post-title" onClick={toggleDropdown}>{title}</div>
            {isOpen && (
                <div className="qna-dropdown-content">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
  }
export default QnaList;