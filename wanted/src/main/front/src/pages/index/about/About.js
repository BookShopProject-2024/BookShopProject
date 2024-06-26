// src/About.js
import React from 'react';
import '../../../css/about.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>소개 페이지</h1>
            <p>안녕하세요! 저희 웹사이트를 방문해 주셔서 감사합니다. 여기는 우리의 소개 페이지입니다.</p>
            <section>
                <h2>우리의 미션</h2>
                <p>우리는 최고의 서비스를 제공하기 위해 최선을 다하고 있습니다. 고객의 만족이 우리의 최우선 목표입니다.</p>
            </section>
            <section>
                <h2>우리의 팀</h2>
                <p>우리는 열정적이고 능력 있는 팀원들로 구성되어 있습니다. 각자의 전문성을 바탕으로 최고의 결과를 만들어냅니다.</p>
            </section>
        </div>
    );
};

export default About;
