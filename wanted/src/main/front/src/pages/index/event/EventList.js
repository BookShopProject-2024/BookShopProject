import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const fetchData = async (url, setEventList, setLoading) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        setEventList(data);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching event list:", error);
        setLoading(false);
    }
};

function EventList() {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData('/info/events', setEventList, setLoading);
    }, []);

    const handleFetchAllEvents = () => {
        setLoading(true);
        fetchData('/info/events', setEventList, setLoading);
    };

    const handleFetchAvailableEvents = () => {
        setLoading(true);
        fetchData('/info/events/available', setEventList, setLoading);
    };

    return (
        <div>
            <button onClick={handleFetchAllEvents}>전체 이벤트</button>
            <button onClick={handleFetchAvailableEvents}>Available Events</button>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <div>
                    {eventList.length > 0 ? (
                        <ul>
                            {eventList.map(event => (
                                <li key={event.eventId}>
                                    <Link to={`/events/${event.eventId}`}>
                                        <h2>{event.eventName}</h2>
                                        <p>{event.description}</p>
                                        <p>{new Date(event.eventStartDate).toLocaleString()} - {new Date(event.eventEndDate).toLocaleString()}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>이벤트가 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default EventList;
