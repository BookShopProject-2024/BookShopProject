import '../../../css/Main.css';
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

// API로부터 이벤트 정보를 가져오는 함수
const fetchEventInfo = async (page, size) => {
    const response = await axios.get(`/info/events/popup`, {
        params: { page, size },
    });
    return response.data;
};

// 메인 팝업 컴포넌트
export default function MainPopup({ setShowMainPop }) {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 8;
    const observerRef = useRef(null);

    // 페이지나 컴포넌트가 마운트될 때 이벤트 정보를 가져옴
    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchEventInfo(page, PAGE_SIZE);
                setEventList(prevEvents => [...prevEvents, ...data]);
                setHasMore(data.length === PAGE_SIZE); // 페이지 사이즈와 데이터 길이를 비교하여 hasMore 설정
            } catch (error) {
                console.error("Error fetching event info:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [page]);

    // IntersectionObserver 설정
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1.0 });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasMore, loading]);

    // 팝업 닫기
    const closePop = () => setShowMainPop(false);

    // 오늘 하루 열지 않기
    const closeTodayPop = () => {
        const expires = new Date();
        expires.setHours(expires.getHours() + 24);
        localStorage.setItem("homeVisited", expires);
        setShowMainPop(false);
    };

    return (
        <div className="popup-wrapper">
            <div className="main-popup">
                <h1>이벤트 팝업</h1>
                {loading && page === 0 ? (
                    <p>로딩 중...</p>
                ) : (
                    <ul>
                        {eventList.map(event => (
                            <li key={event.eventId}>
                                <h2>{event.eventName}</h2>
                                <p>{event.description}</p>
                                <p>{new Date(event.eventStartDate).toLocaleString()} - {new Date(event.eventEndDate).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
                <div ref={observerRef} style={{ height: '20px', marginTop: '10px' }} />
                {loading && page > 0 && <p>로딩 중...</p>}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={closeTodayPop}>오늘 하루 열지 않기</button>
                    <button onClick={closePop}>닫기</button>
                </div>
            </div>
        </div>
    );
}
