import '../../css/Main.css';
import Sliders from "../../layout/Sliders";
import React,{useState,useEffect} from "react";
import NoticeList from "./main/MainNoticeList";
import SecondSlider from "../../layout/SecondSliders"
import QnaList from "./main/MainQnaList";
import MainPopup from "./event/MainPopup";
import { useAuth } from '../index/AuthContext';

function Main() {
    const [isMobile, setIsMobile] = useState(false);
    const [showMainPop, setShowMainPop] = useState(false);
    const HOME_VISITED = localStorage.getItem("homeVisited");
    const { isAuthenticated, setAuthToken } = useAuth();

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

        // 토큰 검사 로직
        const checkToken = () => {
            const token = localStorage.getItem('authToken');
            if (token && !isAuthenticated) {
                setAuthToken(token);
            }
        };

        checkToken();

        return () => window.removeEventListener('resize', handleResize);
    }, [HOME_VISITED]);

    return (
        <div className="App">
            <Sliders />
            <SecondSlider />
            <div className="ListContainer">
                <NoticeList></NoticeList>
                <QnaList></QnaList>
            </div>
            {showMainPop && <MainPopup setShowMainPop={setShowMainPop} />}
        </div>
    );
}

export default Main;
