import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { checkIsMobile, checkIsSticky } from "../../reducers/conditions";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";

import FirstScreen from '../FirstScreen/FirstScreen';
import SecondScreen from '../SecondScreen/SecondScreen';
import ThirdScreen from '../ThirdScreen/ThirdScreen';

import './App.scss';
import { clearDrawersData, clearSelectedAttachedAcc } from "../../reducers/accessories";

const App = () => {
    const {isMobile} = useSelector(state => state.conditions);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        
        dispatch(checkIsMobile(window.innerWidth < 768));
    
        const handleScroll = () => {       
            if ((window.scrollY > 78 && !isMobile) || (window.scrollY > 0 && isMobile)) {
                dispatch(checkIsSticky(true));
            } else {
                dispatch(checkIsSticky(false));
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch, isMobile]);

    useEffect(() => {
        if (location.pathname === "/") {   
            dispatch(clearDrawersData());
            dispatch(clearSelectedAttachedAcc());
        }
    },[location.pathname, dispatch])

    return (
        <>
            <Header />
            <TopBar />
            <Routes>
                <Route path="/" element={ <FirstScreen />} /> 
                <Route 
                    path="/chooseAccessories" 
                    element={ <SecondScreen />} />
                <Route 
                    path="/sendForm" 
                    element={ <ThirdScreen />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App;


