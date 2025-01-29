import { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import DrawerViewAccessory from '../DrawerViewAccessory/DrawerViewAccessory';

import './drawerSideBar.scss';

import xIcon from '../../data/images/icon/x-icon.svg';
import drawer3 from '../../data/images/drawer3.webp';
import drawer4 from '../../data/images/drawer4.webp';
import drawer5 from '../../data/images/drawer5.webp';
import resetImage from '../../data/images/icon/reset.svg';
import cart from '../../data/images/icon/cart.svg';

const DrawerSideBar = ({isMobile,
                        toggleDropdownMenuOpen, 
                        currentToolbox, 
                        fullPrice, 
                        handleClick, 
                        currentDrawer, 
                        setCurrentDrawer,
                        drawersData,
                        setDrawersData,
                        selectedAttachedAcc,
                        deleteAcc,
                        mobileOpen,
                        openChooseDrawers,
                        setOpenChooseDrawers}) => {
    const [isBoxSticky, setIsBoxSticky] = useState(false);
    const [drawerLeftStyle, setDrawerLeftStyle] = useState('150px');

    useEffect(() => {
        if (window.innerWidth < 576) {
            setDrawerLeftStyle('0px');
        }

        const handleScroll = () => {
            document.querySelector('.choose-accessories__drawers') && window.scrollY > 1060 ? setIsBoxSticky(true) : setIsBoxSticky(false);
        }

        const handleResize = () => {
            if(window.innerWidth > 1600) {
                setDrawerLeftStyle(`${150 + (window.innerWidth - 1600) / 2}px`)
            }
        }

        const debounce = (func, delay) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func(...args), delay);
            };
        };

        const debouncedScroll = debounce(handleScroll, 10);
        const debouncedResize = debounce(handleResize, 100);

        window.addEventListener('resize', debouncedResize);
        window.addEventListener('scroll', debouncedScroll);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            window.removeEventListener('scroll', debouncedScroll);
        };

    }, []);

    if (!currentToolbox) {
        return <p>No toolbox selected</p>;
    }

    const drawersCurrentToolbox = currentToolbox.drawers.length;

    const mobileListDrawers = Array.from({ length: drawersCurrentToolbox }, (_, i) => (
        <option key={i} value={i}>
            Drawer {i + 1}
        </option>
    ));

    const resetCurrentDrawer = () => {
        setDrawersData( prev => {
            const updateData = { ...prev};
            delete updateData[currentDrawer];
            return updateData;
        });
    }

    const drawerButtons = Array.from({length: drawersCurrentToolbox}, (_,i) => {
        const drawerDepth = currentToolbox.drawers[i];
        const drawerCells = Array.from({length: drawerDepth}, (_, i) => (<div key={i} className="nav-img__item"></div>))

        const drawersFill = drawersData[i]?.reduce((total, acc) => total + acc.size, 0);

        if (isMobile && +currentDrawer !== i) {
            return null;
        }

        const activeClass = +currentDrawer === +i ? 'active' : null;
        
        return (
            <Nav.Item 
                key={i}
            >
                <Nav.Link eventKey={i} className={`d-flex align-items-center gap-1 ${activeClass}`}>
                        <div className={`choose-accessories__nav-img nav-img-${drawersFill || 0} d-flex`}>
                        {drawerCells}
                    </div>
                    <span className="button-number">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                    <span className="d-sm-none">Drawer</span>
                </Nav.Link> 
            </Nav.Item>
        )
    });

    const drawersView = () => {
        const drawerItems = Array.from({length: drawersCurrentToolbox}, (_, i) => {
            const drawerDepth = currentToolbox.drawers[i];
            const drawersFill = drawersData[i]?.reduce((total, acc) => total + acc.size, 0);
            
            let shelfImage = '';
            if (drawerDepth === 3) {
                shelfImage = <img src={drawer3} alt="Shelf" />;
            } else if(drawerDepth === 4) {
                shelfImage = <img src={drawer4} alt="Shelf" />;
            } else {
                shelfImage = <img src={drawer5} alt="Shelf" />;
            }

            return (
                <Tab.Pane eventKey={i} key={i}>
                    <div className="choose-accessories__drawers-content drawers-content">
                        <DrawerViewAccessory 
                            drawersData={drawersData}
                            deleteAcc={deleteAcc}
                            currentToolbox={currentToolbox}
                            currentDrawer={currentDrawer} />
                    </div>
                    {shelfImage}
                    <p 
                        className={`d-flex align-items-center ${!drawersFill ? 'not-active' : ''}`}
                        onClick={resetCurrentDrawer}>
                        <img src={resetImage} alt="" />
                        Reset
                    </p>
                </Tab.Pane>
            )
        })
        return (
            <>
                {drawerItems}
            </>
        )
    }

    const handleMobileDrawerChange = (event) => {
        setCurrentDrawer(event.target.value);
    };

    const quantityItems =  selectedAttachedAcc.length + Object.values(drawersData).reduce((sum, array) => sum + array.length, 0);

    return (
        <div className="col-xl-6 col-xxl-4">
            <div className="choose-accessories__drawers-title">
                Drawer top view
            </div>
            <div 
                className={`choose-accessories__drawers ${isBoxSticky === true ? 'box-sticky' : ''}`}
                style={{left:drawerLeftStyle, display: openChooseDrawers ? 'block' : ''}}>
                <div 
                    className="choose-accessories__close-popup d-sm-none d-flex justify-content-center align-items-center"
                    onClick={() => setOpenChooseDrawers(false)}>
                    <img src={xIcon} alt="close" />
                </div>
                <div className="choose-accessories__drawers-tabs">
                    <div className="choose-accessories__drawers-wrapper d-flex align-items-start justify-content-center justify-content-xl-start">
                        <Tab.Container defaultActiveKey={currentDrawer} onSelect={selectedKey => setCurrentDrawer(selectedKey)}>
                            <Nav variant='pills' className='flex-column'>
                                <p className="d-none d-sm-block">Drawer</p>
                                {drawerButtons}
                                <div 
                                    className="nav-list_top d-sm-none d-flex justify-content-center align-items-center"
                                    onClick={() => (currentDrawer >= 0 && currentDrawer < drawersCurrentToolbox - 1) ? setCurrentDrawer(+currentDrawer + 1) : null}>
                                </div>
                                <div 
                                    className="nav-list_bottom d-sm-none d-flex justify-content-center align-items-center"
                                    onClick={() => (currentDrawer > 0 && currentDrawer < drawersCurrentToolbox) ? setCurrentDrawer(+currentDrawer - 1) : null}>
                                </div>
                                <div className="d-sm-none">
                                    <select id="mobileTabsSelect" value={currentDrawer} onChange={handleMobileDrawerChange}>
                                        {mobileListDrawers}
                                    </select>
                                </div>
                            </Nav>
                            <Tab.Content>
                                {drawersView()}
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
                <div className="choose-accessories__drawers-price-total">
                    <div className="choose-accessories__drawers-price-title d-flex justify-content-between">
                        <p>
                        Total price
                        </p>
                        <p className="choose-accessories__drawers-price-summ">
                        <span>{fullPrice}</span>,00 EUR
                        </p>
                    </div>
                    <div className="choose-accessories__drawers-price-info d-flex justify-content-between">
                        <div className="choose-accessories__drawers-price-button align-items-center justify-content-center d-none d-sm-flex">
                        <button onClick={handleClick}  aria-label="Complete selection">
                            <img src={cart} alt="Cart" /> Færdig med valg
                        </button>
                        </div>
                        <div className="choose-accessories__drawers-price-items text-end">
                        <div className="choose-accessories__drawers-price-quantity">
                            <span>{quantityItems}</span> accessories
                        </div>
                        <div 
                            className="choose-accessories__drawers-price-show"
                            onClick={toggleDropdownMenuOpen}>
                            Show added items
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className="choose-accessories__drawers-price-button2 align-items-center justify-content-center d-sm-none"
                style={{display: mobileOpen ? 'flex' : 'none'}}>
                <button onClick={handleClick} aria-label="Complete selection">
                    <img src={cart} alt="Cart" /> Færdig med valg
                </button>
            </div>
        </div>
    )
}

export default DrawerSideBar;