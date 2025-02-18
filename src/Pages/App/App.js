import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import useToolboxService from '../../services/ToolboxService';

import { useSelector, useDispatch } from "react-redux";
import { checkIsMobile, checkIsSticky, checkIsMobileOpen } from "../../actions";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";

import FirstScreen from '../FirstScreen/FirstScreen';
import SecondScreen from '../SecondScreen/SecondScreen';
import ThirdScreen from '../ThirdScreen/ThirdScreen';

import './App.scss';
import { updateDrawersData, clearDrawersData } from "../../reducers/accessories";

const App = () => {
    const [selectedAttachedAcc, setSelectedAttachedAcc] = useState([]);
    const [currentDrawer, setCurrentDrawer] = useState(0);

    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [attachingAccessories, setAttachingAccessories] = useState([]);
    const [loading, setLoading] = useState(true);

    const {getAccessories, getAttachingAccessories} = useToolboxService();

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
        onRequest();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (location.pathname === "/") {   
            dispatch(clearDrawersData());
            setSelectedAttachedAcc([]);
        }
    },[location.pathname, dispatch])
    
    const onRequest = async () => {
        setLoading(true);
        try {
            const acc = await getAccessories();
            const attachingAcc = await getAttachingAccessories();
            setAccessories(acc);
            setFilteredAccessories(acc);
            setAttachingAccessories(attachingAcc);
        } catch (error) {
            console.error('Failed to fetch accessories');
        } finally {
            setLoading(false);
        }
    }

    const searchAcc = useCallback((event) => {
        const searchValue = event.target.value.toLowerCase();

        setFilteredAccessories(
            accessories.filter(acc => acc.name.toLowerCase().includes(searchValue) || acc.id.includes(searchValue))
        )
    }, [accessories]);

    // Function to calculate remaining space in the current drawer
    const calculateRemainingSpace = useCallback((drawerItems) => {
        let remainingSpace = currentToolbox?.drawers[currentDrawer]; // Total space in a drawer

        drawerItems.forEach((item) => {
            remainingSpace -= item.size;
        });

        return remainingSpace;
    }, [currentToolbox, currentDrawer]);

    const handleAccessoryClick = useCallback((accId) => {
        
        if (isMobile) {
            dispatch(checkIsMobileOpen(true));
        }

        const newDrawerData = { ...drawersData };
        const drawerItems = [...(newDrawerData[currentDrawer] || [])];

        const accessoryIndex = drawerItems.findIndex((acc) => acc.id === accId);
        const accessory = accessories.find((acc) => acc.id === accId);
        
        if (accessoryIndex !== -1) {
            drawerItems.splice(accessoryIndex, 1); // Remove accessory if it already exists
        } else {
            const remainingSpace = calculateRemainingSpace(drawerItems);     
            
            if (accessory && accessory.size <= remainingSpace) {
                drawerItems.push(accessory); // Add accessory to the drawer
            }
        }
        
        if (drawerItems.length === 0) {
            delete newDrawerData[currentDrawer]; // Remove drawer if empty
        } else {
        newDrawerData[currentDrawer] = drawerItems;
        }

        dispatch(updateDrawersData(newDrawerData));

    }, [accessories, calculateRemainingSpace, currentDrawer, dispatch, isMobile, drawersData]);
        
    const chooseCurrentAttachedAcc = useCallback((id) => {
        if (isMobile) {
            dispatch(checkIsMobileOpen(true));
        }

        setSelectedAttachedAcc(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(accId => accId !== id)
            }
            return [...prevState, id];
        });
    },[dispatch, isMobile]);

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
                currentToolbox={currentToolbox} 
                handleClick={handleClick}
                selectedAttachedAcc={selectedAttachedAcc}
                attachingAccessories={attachingAccessories}
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
                            selectedAttachedAcc={selectedAttachedAcc}
                            handleAccessoryClick={handleAccessoryClick}
                            chooseCurrentAttachedAcc={chooseCurrentAttachedAcc}
                            currentDrawer={currentDrawer}
                            setCurrentDrawer={setCurrentDrawer}
                            calculateRemainingSpace={calculateRemainingSpace}
                            searchAcc={searchAcc}
                            loading={loading}
                            filteredAccessories={filteredAccessories}
                            attachingAccessories={attachingAccessories}
                            fullPrice={fullPrice}
                            deleteAcc={deleteAcc}/>} />
                <Route 
                    path="/sendForm" 
                    element={<ThirdScreen 
                                currentToolbox={currentToolbox} 
                                selectedAttachedAcc={selectedAttachedAcc}
                                fullPrice={fullPrice} />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App;


