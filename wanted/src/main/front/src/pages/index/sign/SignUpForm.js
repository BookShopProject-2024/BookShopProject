import React, { useState, useEffect } from 'react';
import '../../../css/signUpForm.css'; // CSS 파일 import
import axios from 'axios';
import Modal from 'react-modal';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ["places"];

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        userId:'',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        telNo: '',
        address: '',
        zipcode: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [autocomplete, setAutocomplete] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=>{
        setPasswordMatch(formData.password===formData.confirmPassword);
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

    const handlePlaceSelect = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.address_components) {
                const address = place.formatted_address;
                let zipCode = '';
                for (const component of place.address_components) {
                    const componentType = component.types[0];
                    if (componentType === 'postal_code') {
                        zipCode = component.long_name;
                    }
                }
                setFormData({
                    ...formData,
                    address: address,
                    zipCode: zipCode
                });
                setModalIsOpen(false); // 주소 선택 후 모달 닫기
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };
    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
                <div className="form-group">
                    <label htmlFor="telNo">전화번호</label>
                    <input
                        type="text"
                        id="telNo"
                        name="telNo"
                        value={formData.telNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        readOnly
                        placeholder="주소를 입력하려면 클릭하세요"
                        onClick={openModal}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zipCode">우편번호</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        readOnly
                        required
                    />
                </div>
                <button type="submit" className="submit-button">회원가입</button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="주소 입력"
                ariaHideApp={false}
                className="address-modal"
            >
                <h2>주소 입력</h2>
                <LoadScript googleMapsApiKey="카톡 참고하여 입력" libraries={libraries}>
                <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={handlePlaceSelect}
                    >
                        <input
                            type="text"
                            id="autocomplete"
                            placeholder="주소를 입력하세요"
                        />
                    </Autocomplete>
                </LoadScript>
                <button onClick={closeModal} className="close-button">닫기</button>
            </Modal>
        </div>
    );
};

export default SignUpForm;
