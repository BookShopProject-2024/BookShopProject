import React, { useState } from 'react';
import axios from 'axios';
import "../../../../css/qna.css";
function QnaContents() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const [writer,setWriter] = useState('');
    const [checked, setChecked] = React.useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
       const data ={
           Title : title,
           Content : content,
           Password : password,
           Writer : writer
       }

       axios.post('/info/qnaContent/',data)
            .then(response=>{
                alert("질문이 성공적으로 등록되었습니다.");
                window.location.href='/questionAndAnswer';
            });
    };

    const handleReset = () => {
        setTitle('');
        setContent('');
        setPassword('');
        setWriter('');
    };

    return (

        <div className="form-container">
            <h1>Q&A</h1>
            <form className="qna-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">본문:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="content-text-area"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="writer">이름:</label>
                    <input
                        type="text"
                        id="writer"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                        required
                    />
                </div>
                <div className="inline-form-group">
                        <label>비밀번호 설정</label>
                        <input type="checkbox" id="checkPW"
                               defaultValue={false}
                               onClick={(e)=>setChecked(!checked)}>
                        </input>
                        <label htmlFor="password">비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            disabled={checked}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>
                <div className="form-buttons">
                    <button type="submit">등록</button>
                    <button type="button" onClick={handleReset}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default QnaContents;
