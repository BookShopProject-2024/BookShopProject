import '../../../css/Main.css';
import axios from "axios";
import { useState, useEffect } from "react";

const getEventInfo = async (setEventList, setLoading) => {
    try {
        const response = await axios.get(`/info/events`);
        const data = response.data;
        setEventList(data);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching event info:", error);
    }
};

export default function MainPopup({ setShowMainPop }) {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEventInfo(setEventList, setLoading);
    }, []);

    const closePop = () => {
        setShowMainPop(false);
    };

    const closeTodayPop = () => {
        let expires = new Date();
        expires = expires.setHours(expires.getHours() + 24);
        localStorage.setItem("homeVisited", expires);
        setShowMainPop(false);
    };

    return (
        <div className="popup-wrapper">
            <div className="main-popup">
                <h1>팝업입니다.</h1>
                {loading ? (
                    <p>로딩 중...</p>
                ) : (
                    <div>
                        {eventList.length > 0 ? (
                            <ul>
                                {eventList.map(event => (
                                    <li key={event.eventId}>
                                        <h2>{event.eventName}</h2>
                                        <p>{event.description}</p>
                                        <p>{new Date(event.eventStartDate).toLocaleString()} - {new Date(event.eventEndDate).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>이벤트가 없습니다.</p>
                        )}
                    </div>
                )}
                <button onClick={closeTodayPop}>오늘 하루 열지 않기</button>
                <button onClick={closePop}>닫기</button>
            </div>
        </div>
    );
}
