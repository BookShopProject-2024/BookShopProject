import React, { useState } from "react";
import axiosInstance from "../AxiosInstance";

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        userId: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post(`/customer/login`, {
                userId: loginInput.userId,
                password: loginInput.password,
            });

            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h2>로그인</h2>
            <form>
                <div>
                    <label
                        htmlFor="userId"
                    >
                        아이디
                    </label>
                    <input
                        type="userId"
                        id="userId"
                        name="userId"
                        value={loginInput.userId}
                        onChange={handleInputChange}
                        placeholder="아이디"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                    >
                        비밀번호
                    </label>
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
                <button
                    type="submit"
                    onClick={onLogin}
                >
                    로그인
                </button>
            </form>
        </>
    );
};

export default Login;