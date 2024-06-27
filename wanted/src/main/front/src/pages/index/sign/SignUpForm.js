import React, { useState, useEffect } from 'react';
import '../../../css/signUpForm.css'; // CSS 파일 import
import axios from 'axios';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        userId:'',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(()=>{
        setPasswordMatch(formData.password===formData.confirmPassword);;

    },[formData.password,formData.confirmPassword]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMatch) {
            try {
                const response = await axios.post('/info/signUp', formData);
                console.log('회원가입 데이터:', formData);
                alert("회원가입에 성공하셨습니다.");
                window.location.href = '/';
            } catch (error) {
                console.error('회원가입 오류:', error);
                if (error.response && error.response.data) {
                    // 서버에서 반환된 오류 메시지를 표시합니다.
                    alert(`회원가입 실패: ${error.response.data.message}`);
                } else {
                    // 네트워크 오류 또는 기타 원인으로 인한 오류 메시지를 표시합니다.
                    alert("회원가입 실패: 네트워크 오류 또는 서버 문제입니다.");
                }
            }
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {!passwordMatch && (
                        <p className="error-message">비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="userName">이름</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpForm;
