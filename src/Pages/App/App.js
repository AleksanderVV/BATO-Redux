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

const App = () => {
    const [drawersData, setDrawersData] = useState({});
    const [selectedAttachedAcc, setSelectedAttachedAcc] = useState([]);
    const [currentDrawer, setCurrentDrawer] = useState(0);

    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [attachingAccessories, setAttachingAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [mobileOpen, setMobileOpen] = useState(false);

    const {getAccessories, getAttachingAccessories} = useToolboxService();

    const {currentToolbox} = useSelector(state => state.toolbox);
    const {isMobile} = useSelector(state => state.conditions);
    const dispatch = useDispatch();

    const [fullPrice, setFullPrice] = useState(currentToolbox?.price || 0);

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = useCallback(() => {
        navigate('/sendForm', {state: {currentToolbox}});
    },[currentToolbox, navigate]);

    useEffect(() => {

        dispatch(checkIsMobile(window.innerWidth < 768));

        window.addEventListener('scroll', () => {

            if((window.scrollY > 78 && !isMobile) || (window.scrollY > 0 && isMobile)) {
                dispatch(checkIsSticky(true));
            } else {dispatch(checkIsSticky(false))}

        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (location.pathname === "/") {   
            setDrawersData({});
            setSelectedAttachedAcc([]);
        }
    },[location.pathname])
    
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

        setDrawersData((prev) => {
          const newDrawerData = { ...prev };

          if (!newDrawerData[currentDrawer]) {
            newDrawerData[currentDrawer] = [];
          }

          const drawerItems = newDrawerData[currentDrawer];
          const accessoryIndex = drawerItems.findIndex((acc) => acc.id === accId);
          const accessory = accessories.find((acc) => acc.id === accId);
    
          if (accessoryIndex !== -1) {
            drawerItems.splice(accessoryIndex, 1); // Remove accessory if it already exists
          } else {
            const remainingSpace = calculateRemainingSpace(drawerItems); 

            if (accessory && accessory.size <= remainingSpace) {
                newDrawerData[currentDrawer].push(accessory); // Add accessory to the drawer
            }
          }

          if (drawerItems.length === 0) {
            delete newDrawerData[currentDrawer]; // Remove drawer if empty
          } else {
            newDrawerData[currentDrawer] = drawerItems;
          }

          return newDrawerData;
        });
    }, [accessories, calculateRemainingSpace, currentDrawer, dispatch, isMobile]);
        
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

        setDrawersData(prev => {
            const newDrawerData = { ...prev };

            newDrawerData[drawerAcc] = newDrawerData[drawerAcc].filter(i => i.id !== idAcc);

            return newDrawerData;
        })
    },[drawersData]);

    const quantityItems =  useCallback(() => {
        return selectedAttachedAcc.length + Object.values(drawersData).reduce((sum, array) => sum + array.length, 0);
    },[selectedAttachedAcc,drawersData]);

    return (
        <>
            <Header 
                quantityItems={quantityItems()}/>
            <TopBar 
                currentToolbox={currentToolbox} 
                handleClick={handleClick}
                drawersData={drawersData}
                selectedAttachedAcc={selectedAttachedAcc}
                attachingAccessories={attachingAccessories}
                fullPrice={fullPrice}
                setFullPrice={setFullPrice}
                deleteAcc={deleteAcc}
                quantityItems={quantityItems()} />
            <Routes>
                <Route path="/" element={
                    <FirstScreen />
                } /> 
                <Route 
                    path="/chooseAccessories" 
                    element={
                        <SecondScreen 
                            // mobileOpen={mobileOpen}
                            handleClick={handleClick}
                            drawersData={drawersData}
                            setDrawersData={setDrawersData}
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
                            deleteAcc={deleteAcc}
                            quantityItems={quantityItems()} />} />
                <Route 
                    path="/sendForm" 
                    element={<ThirdScreen 
                                drawersData={drawersData}
                                selectedAttachedAcc={selectedAttachedAcc}
                                fullPrice={fullPrice} />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App;


