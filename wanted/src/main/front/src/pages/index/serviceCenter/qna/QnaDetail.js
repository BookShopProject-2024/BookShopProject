import React, { useState, useEffect } from "react";
import "../../../../css/qna.css";
import axios from "axios";

const QnaDetail = ({ title, content, qnaId, passWord }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [displayContent, setDisplayContent] = useState('비밀 게시물입니다. 비밀번호를 입력하세요.');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    // sessionStorage에서 sessionInfo 값을 가져옴
    const sessionInfo = window.sessionStorage.getItem(`sessionInfo-${qnaId}`) === 'true';

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handlePasswordChange = (e) => {
        setInputPassword(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            qnaId: qnaId,
            Password: inputPassword,
        };

        try {
            const response = await axios.post('/info/qnaSearchPWContent/', data);
            if (response.data === true) { // Assuming true indicates correct password
                setDisplayContent(content); // Update content to show the full content
                setIsPasswordCorrect(true); // Set password correct status to true
                window.sessionStorage.setItem(`sessionInfo-${qnaId}`, 'true'); // Save password correct status to sessionStorage
            } else {
                alert("비밀번호가 틀렸습니다."); // Alert for incorrect password
                setInputPassword('');
            }
        } catch (error) {
            console.error('Error verifying password:', error);
        }
    };

    useEffect(() => {
        if (sessionInfo) {
            setDisplayContent(content); // If sessionInfo is true, directly show the content
            setIsPasswordCorrect(true);
        }
    }, [sessionInfo, content]);

    return (
        <div className="post">
            <div className="post-title" onClick={toggleDropdown}>{title}</div>
            {isOpen && (
                <div className="qna-dropdown-content">
                    {passWord !== '' ? (
                        <div>
                            <p>{displayContent}</p> {/* Use displayContent to show the updated content */}
                            {!isPasswordCorrect && (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        value={inputPassword}
                                        placeholder="비밀번호를 입력하세요"
                                        onChange={handlePasswordChange}
                                    />
                                    <button type="submit">확인</button>
                                </form>
                            )}
                        </div>
                    ) : (
                        <p>{content}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default QnaDetail;
