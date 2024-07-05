import React, { useState } from "react";
import axiosInstance from "../../../pages/index/axiosInstance";

const SignIn = () => {
    const [loginInput, setLoginInput] = useState({
        userId: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onLogin = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        try {
            const res = await axiosInstance.post('/customer/matchLogin', {
                userId: loginInput.userId,
                password: loginInput.password,
            });

            if (res.status === 200) {
                console.log(res.data);
                alert("로그인 성공!");

                // 추가 로그인 성공 시 동작
            }
        } catch (error) {
            console.log(error);
            alert("로그인 실패: " + (error.response ? error.response.data.message : "서버 문제"));
        }
    };

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
