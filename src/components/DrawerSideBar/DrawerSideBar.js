import { useState, useEffect, useRef, useCallback } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import DrawerViewAccessory from '../DrawerViewAccessory/DrawerViewAccessory';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { checkIsMenuOpen } from '../../reducers/conditions';
import { resetCurrentDrawer, selectQuantityItems, setCurrentDrawer, setIsOpenChooseDrawers } from '../../reducers/accessories';

import './drawerSideBar.scss';

import xIcon from '../../data/images/icon/x-icon.svg';
import drawer3 from '../../data/images/drawer3.webp';
import drawer4 from '../../data/images/drawer4.webp';
import drawer5 from '../../data/images/drawer5.webp';
import resetImage from '../../data/images/icon/reset.svg';
import cart from '../../data/images/icon/cart.svg';

const useDebouncedCallback = (callback, delay) => {
    const timeoutRef = useRef(null);

    return useCallback((...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};

const DrawerSideBar = () => {

    const {currentToolbox} = useSelector(state => state.toolbox);
    const {drawersData, fullPrice, currentDrawer, openChooseDrawers} = useSelector(state => state.accessories);
    const {isMobile, isMenuOpen, isMobileOpen} = useSelector(state => state.conditions);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quantityItems = useSelector(selectQuantityItems);

    const [isBoxSticky, setIsBoxSticky] = useState(false);
    const [drawerLeftStyle, setDrawerLeftStyle] = useState('0px');

    useEffect(() => {
        if (!isMobile) {
            setDrawerLeftStyle('150px');
        }
        if (window.innerWidth > 1600) {
            setDrawerLeftStyle(`${150 + (window.innerWidth - 1600) / 2}px`);
        }
    }, [isMobile]);

    const handleScroll = useCallback(() => {
        setIsBoxSticky(window.scrollY > 1060);
    }, []);

    const debouncedScroll = useDebouncedCallback(handleScroll, 50);

    useEffect(() => {
        window.addEventListener('scroll', debouncedScroll);

        return () => {
            window.removeEventListener('scroll', debouncedScroll);
        };
    }, [debouncedScroll]);

    if (!currentToolbox) {
        return <p>No toolbox selected</p>;
    }

    const drawersCurrentToolbox = currentToolbox.drawers.length;

    const mobileListDrawers = Array.from({ length: drawersCurrentToolbox }, (_, i) => (
        <option key={i} value={i}>
            Drawer {i + 1}
        </option>
    ));

    const handleResetCurrentDrawer = () => {
        dispatch(resetCurrentDrawer(currentDrawer));
    };

    const drawerButtons = Array.from({length: drawersCurrentToolbox}, (_,i) => {
        
        const drawerDepth = currentToolbox.drawers[i];
        const drawerCells = Array.from({length: drawerDepth}, (_, i) => (<div key={i} className="nav-img__item"></div>));

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
                        <DrawerViewAccessory />
                    </div>
                    {shelfImage}
                    <p 
                        className={`d-flex align-items-center ${!drawersFill ? 'not-active' : ''}`}
                        onClick={handleResetCurrentDrawer}>
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
        dispatch(setCurrentDrawer(event.target.value));
    };

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
                    onClick={() => dispatch(setIsOpenChooseDrawers(false))}>
                    <img src={xIcon} alt="close" />
                </div>
                <div className="choose-accessories__drawers-tabs">
                    <div className="choose-accessories__drawers-wrapper d-flex align-items-start justify-content-center justify-content-xl-start">
                        <Tab.Container defaultActiveKey={currentDrawer} onSelect={selectedKey => dispatch(setCurrentDrawer(selectedKey))}>
                            <Nav variant='pills' className='flex-column'>
                                <p className="d-none d-sm-block">Drawer</p>
                                {drawerButtons}
                                <div 
                                    className="nav-list_top d-sm-none d-flex justify-content-center align-items-center"
                                    onClick={() => (currentDrawer >= 0 && currentDrawer < drawersCurrentToolbox - 1) ? dispatch(setCurrentDrawer(+currentDrawer + 1)) : null}>
                                </div>
                                <div 
                                    className="nav-list_bottom d-sm-none d-flex justify-content-center align-items-center"
                                    onClick={() => (currentDrawer > 0 && currentDrawer < drawersCurrentToolbox) ? dispatch(setCurrentDrawer(+currentDrawer - 1)) : null}>
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
                        <button onClick={() => navigate('/sendForm')}  aria-label="Complete selection">
                            <img src={cart} alt="Cart" /> Færdig med valg
                        </button>
                        </div>
                        <div className="choose-accessories__drawers-price-items text-end">
                        <div className="choose-accessories__drawers-price-quantity">
                            <span>{quantityItems}</span> accessories
                        </div>
                        <div 
                            className="choose-accessories__drawers-price-show"
                            onClick={() => dispatch(checkIsMenuOpen(!isMenuOpen))}>
                            Show added items
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className="choose-accessories__drawers-price-button2 align-items-center justify-content-center d-sm-none"
                style={{display: isMobileOpen ? 'flex' : 'none'}}>
                <button onClick={() => navigate('sendForm')} aria-label="Complete selection">
                    <img src={cart} alt="Cart" /> Færdig med valg
                </button>
            </div>
        </div>
    )
}

export default DrawerSideBar;