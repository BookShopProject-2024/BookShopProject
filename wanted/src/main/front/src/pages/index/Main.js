import '../../css/Main.css';
import Sliders from "../../layout/Sliders";
import React,{useState,useEffect} from "react";
import NoticeList from "./main/MainNoticeList";
import EventList from "./event/BookList";
import SecondSlider from "../../layout/SecondSliders"
import QnaList from "./main/MainQnaList";
import MainPopup from "./event/MainPopup";

function Main() {
    const [isMobile, setIsMobile] = useState(false);
    const [showMainPop, setShowMainPop] = useState(false);
    const HOME_VISITED = localStorage.getItem("homeVisited");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const today = new Date();
        const handleMainPop = () => {
            const homeVisitedDate = new Date(HOME_VISITED);

            if (HOME_VISITED && homeVisitedDate > today) {
                return;
            }
            if (!HOME_VISITED || homeVisitedDate < today) {
                setShowMainPop(true);
            }
        };

        handleMainPop();
        window.setTimeout(handleMainPop, 1000);

        return () => window.removeEventListener('resize', handleResize);
    }, [HOME_VISITED]);

    return (
        <div className="App">
            <Sliders />
            <SecondSlider />
            <div className="ListContainer">
                <NoticeList></NoticeList>
                <EventList></EventList>
                <QnaList></QnaList>
            </div>
            {showMainPop && <MainPopup setShowMainPop={setShowMainPop} />}
        </div>
    );
}

export default Main;
