import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import useToolboxService from '../../services/ToolboxService';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";

import FirstScreen from '../FirstScreen/FirstScreen';
import SecondScreen from '../SecondScreen/SecondScreen';
import ThirdScreen from '../ThirdScreen/ThirdScreen';

import './App.scss';

const App = () => {
    const [currentToolbox, setCurrentToolbox] = useState(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(null);
    const [drawersData, setDrawersData] = useState({});
    const [selectedAttachedAcc, setSelectedAttachedAcc] = useState([]);
    const [currentDrawer, setCurrentDrawer] = useState(0);
    const [fullPrice, setFullPrice] = useState(currentToolbox?.price || 0);

    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [attachingAccessories, setAttachingAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const {setProcess, getAccessories, getAttachingAccessories} = useToolboxService();

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate('/sendForm', {state: {currentToolbox}});
    }

    useEffect(() => {

        setIsMobile(window.innerWidth < 768);

        window.addEventListener('scroll', () => {

            if((window.scrollY > 78 && !isMobile) || (window.scrollY > 0 && isMobile)) {
                setIsSticky(true);
            } else {setIsSticky(false)}

        });
        // eslint-disable-next-line
    }, []);

    const toggleDropdownMenuOpen = () => {setMenuOpen(!isMenuOpen)}

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
            setProcess('confirmed');
        } catch (error) {
            setProcess('error');
            console.error('Failed to fetch accessories');
        } finally {
            setLoading(false);
        }
    }

    const searchAcc = (event) => {
        const searchValue = event.target.value.toLowerCase();

        setFilteredAccessories(
            accessories.filter(acc => acc.name.toLowerCase().includes(searchValue) || acc.id.includes(searchValue))
        )
    }

    // Function to calculate remaining space in the current drawer
    const calculateRemainingSpace = (drawerItems) => {
        let remainingSpace = currentToolbox?.drawers[currentDrawer]; // Total space in a drawer

        drawerItems.forEach((item) => {
            remainingSpace -= item.size;
        });

        return remainingSpace;
    };

    const handleAccessoryClick = (accId) => {
        if (isMobile) {
            setMobileOpen(true);
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
    };
        
    const chooseCurrentAttachedAcc = (id) => {
        if (isMobile) {
            setMobileOpen(true);
        }

        setSelectedAttachedAcc(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(accId => accId !== id)
            }
            return [...prevState, id];
        });
    };

    const deleteAcc = (event) => {
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
    }

    const quantityItems =  selectedAttachedAcc.length + Object.values(drawersData).reduce((sum, array) => sum + array.length, 0);

    return (
        <>
            <Header 
                isSticky={isSticky} 
                isMobile={isMobile}
                isMenuOpen={isMenuOpen}
                toggleDropdownMenuOpen={toggleDropdownMenuOpen}
                quantityItems={quantityItems}/>
            <TopBar 
                isSticky={isSticky}
                isMobile={isMobile}
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
                toggleDropdownMenuOpen={toggleDropdownMenuOpen}
                currentToolbox={currentToolbox} 
                setCurrentToolbox={setCurrentToolbox} 
                handleClick={handleClick}
                drawersData={drawersData}
                selectedAttachedAcc={selectedAttachedAcc}
                attachingAccessories={attachingAccessories}
                fullPrice={fullPrice}
                setFullPrice={setFullPrice}
                deleteAcc={deleteAcc}
                quantityItems={quantityItems} />
            <Routes>
                <Route path="/" element={
                    <FirstScreen 
                        isSticky={isSticky}
                        isMobile={isMobile} />} />
                <Route 
                    path="/chooseAccessories" 
                    element={
                        <SecondScreen 
                            isMobile={isMobile}
                            mobileOpen={mobileOpen}
                            isSticky={isSticky}
                            toggleDropdownMenuOpen={toggleDropdownMenuOpen}
                            currentToolbox={currentToolbox} 
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
                            quantityItems={quantityItems} />} />
                <Route 
                    path="/sendForm" 
                    element={<ThirdScreen 
                                currentToolbox={currentToolbox}
                                drawersData={drawersData}
                                selectedAttachedAcc={selectedAttachedAcc}
                                fullPrice={fullPrice} />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App;


