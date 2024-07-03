import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EventInfoDetail() {
    const { eventId } = useParams();
    const [eventInfo, setEventInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventInfo = async () => {
            try {
                const response = await axios.get(`/info/events/${eventId}`);
                setEventInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event info:", error);
                setLoading(false);
            }
        };

        fetchEventInfo();
    }, [eventId]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!eventInfo) {
        return <p>이벤트 정보를 불러오지 못했습니다.</p>;
    }

    return (
        <div>
            <h1>{eventInfo.eventName}</h1>
            <img src={eventInfo.imageLocation} alt={eventInfo.eventName} />
            <p>Type: {eventInfo.eventType}</p>
            <p>{eventInfo.description}</p>
            <p>
                Start Date: {new Date(eventInfo.eventStartDate).toLocaleString()}
            </p>
            <p>
                End Date: {new Date(eventInfo.eventEndDate).toLocaleString()}
            </p>
        </div>
    );
}

export default EventInfoDetail;
