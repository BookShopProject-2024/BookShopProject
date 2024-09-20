import React, { useState } from "react";
import axiosInstance from "../AxiosInstance";
import { Navigate } from "react-router-dom";

const SignIn = () => {
    const [loginInput, setLoginInput] = useState({
        userId: "",
        password: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleInputChange = (e) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onLogin = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        try {
            const res = await axiosInstance.post('/customer/matchLogin', loginInput);

            if (res.data && res.data.authToken) {
                localStorage.setItem('authToken', res.data.authToken.accessToken); // 로컬 스토리지에 토큰 저장
                setIsLoggedIn(true); // 로그인 상태를 true로 설정
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("로그인 실패: " + (error.response?.data?.message || "서버 문제"));
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <h2>로그인</h2>
            <form onSubmit={onLogin}>
                <div>
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={loginInput.userId}
                        onChange={handleInputChange}
                        placeholder="아이디"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginInput.password}
                        onChange={handleInputChange}
                        placeholder="비밀번호"
                        required
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </>
    );
};

export default SignIn;
