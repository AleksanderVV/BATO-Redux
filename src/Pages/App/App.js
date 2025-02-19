import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { checkIsMobile, checkIsSticky } from "../../actions";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";

import FirstScreen from '../FirstScreen/FirstScreen';
import SecondScreen from '../SecondScreen/SecondScreen';
import ThirdScreen from '../ThirdScreen/ThirdScreen';

import './App.scss';
import { updateDrawersData, clearDrawersData, clearSelectedAttachedAcc } from "../../reducers/accessories";

const App = () => {
    const [currentDrawer, setCurrentDrawer] = useState(0);

    const {currentToolbox} = useSelector(state => state.toolbox);
    const {drawersData} = useSelector(state => state.accessories);
    const {isMobile} = useSelector(state => state.conditions);
    const dispatch = useDispatch();

    const [fullPrice, setFullPrice] = useState(currentToolbox?.price || 0);

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = useCallback(() => {
        navigate('/sendForm');
    },[navigate]);

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

    const deleteAcc = useCallback((event) => {
        const drawerAcc = event.target.dataset.drawer;
        const idAcc = event.target.dataset.id;

        if (!drawersData[drawerAcc]) {
            console.error(`Drawer ${drawerAcc} does not exist.`);
            return;
        }

        const updatedDrawerData = {
            ...drawersData,
            [drawerAcc]: drawersData[drawerAcc].filter(i => i.id !== idAcc)
        };
    
        dispatch(updateDrawersData(updatedDrawerData));
    },[drawersData, dispatch]);

    return (
        <>
            <Header />
            <TopBar 
                handleClick={handleClick}
                fullPrice={fullPrice}
                setFullPrice={setFullPrice}
                deleteAcc={deleteAcc} />
            <Routes>
                <Route path="/" element={
                    <FirstScreen />
                } /> 
                <Route 
                    path="/chooseAccessories" 
                    element={
                        <SecondScreen 
                            handleClick={handleClick}
                            currentDrawer={currentDrawer}
                            setCurrentDrawer={setCurrentDrawer}
                            fullPrice={fullPrice}
                            deleteAcc={deleteAcc}/>} />
                <Route 
                    path="/sendForm" 
                    element={<ThirdScreen 
                                fullPrice={fullPrice} />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App;


