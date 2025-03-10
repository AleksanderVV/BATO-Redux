import { useCallback, useEffect } from 'react';
import { Tab } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsMobileOpen } from '../../reducers/conditions';
import {
        setSelectedAttachedAcc, 
        updateDrawersData, 
        onRequest 
    } from '../../reducers/accessories';

import accImage from '../../data/images/accessory-1.png';
import accImageSmall from '../../data/images/accessory-1-small.png';
import plusBlack from '../../data/images/icon/plus-black.svg';
import plusImage from '../../data/images/icon/plus.svg';
import accSize1 from '../../data/images/icon/accessory-size-1.svg';
import accSize2 from '../../data/images/icon/accessory-size-2.svg';
import accSize3 from '../../data/images/icon/accessory-size-3.svg';
import d8909 from '../../data/images/d-8909.jpg';
import d8940 from '../../data/images/d-8940.jpg';
import d8919 from '../../data/images/d-8919.jpg';

const AccessoriesList = () => {
    
    const {currentToolbox} = useSelector(state => state.toolbox);
    const {
            drawersData, 
            selectedAttachedAcc, 
            attachingAccessories, 
            accessories,
            loading,
            currentDrawer
        } = useSelector(state => state.accessories);
    const {isMobile} = useSelector(state => state.conditions);

    const dispatch = useDispatch();

    // Function to calculate remaining space in the current drawer
    const calculateRemainingSpace = useCallback((drawerItems) => {
        let remainingSpace = currentToolbox?.drawers[currentDrawer]; // Total space in a drawer

        drawerItems.forEach((item) => {
            remainingSpace -= item.size;
        });

        return remainingSpace;
    }, [currentToolbox, currentDrawer]);

    useEffect(() => {
        if(!loading && accessories.length === 0) {
            dispatch(onRequest());
        }
      }, [dispatch, loading, accessories.length]);

    const filteredAttachedAccessories = attachingAccessories.filter(acc => 
        currentToolbox?.accessories.includes(Number(acc.id))
    );

    const currentDrawerLength = currentToolbox?.drawers[currentDrawer];

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


    const currentSizeAcc = (size = null) => {
        const currentDrawerItems = drawersData[currentDrawer] || [];
        const remainingSpace = calculateRemainingSpace(currentDrawerItems);
        const isCurrentDrawerHasSize2 = currentDrawerItems.some(item => item.size === 2);
        
        return accessories
            .filter(acc => size === null || acc.size === size)
            .map((acc, index) => {
                let accImage = null;
                let accSize = null;

                if (acc.size === 1) {
                    accImage = d8909;
                    accSize = accSize1;
                } else if (acc.size === 2) {
                    accImage = d8940;
                    accSize = accSize2;
                } else {
                    accImage = d8919;
                    accSize = accSize3;
                }

                const isSelected = Object.values(drawersData).some(
                    drawerAcc => drawerAcc.some(selectedAcc => selectedAcc.id === acc.id)
                );
                const selectedDrawer = Object.keys(drawersData).find(key =>
                    drawersData[key]?.some(selectedAcc => selectedAcc.id === acc.id)
                );
                const isNotActive = (!isSelected && acc.size > remainingSpace) 
                                    || (selectedDrawer !== undefined && selectedDrawer !== String(currentDrawer))
                                    || (currentDrawerLength === 4 && remainingSpace === 2 && !isSelected && acc.size !== 1 && isCurrentDrawerHasSize2);

                return (
                <div 
                    key={index} 
                    data-drawer={selectedDrawer}
                    className={`accessory-cards__item d-flex flex-column ${isSelected 
                                ? 'accessory-cards__item_choose'
                                : ''} ${isNotActive ? 'not-active' : ''}`}
                    onClick={() => !isNotActive && handleAccessoryClick(acc.id)}>
                    <div className="accessory-cards__item_first">
                        <div className="accessory-cards__img">
                            <div className="accessory-cards__img-wrapper">
                                <img src={accImage} alt="Accessory" className="d-none d-sm-inline" />
                                <img src={accImageSmall} alt="Accessory" className="d-inline d-sm-none" />
                            </div>
                        </div>
                        <div className="accessory-cards__content d-flex flex-column justify-content-between">
                            <div className="accessory-cards__title">{acc.name}</div>
                            <div className="accessory-cards__main">
                                <div className="accessory-cards__id-accessory d-flex justify-content-between">
                                    <p className="accessory-cards__id-subtitle">Item number:</p>
                                    <p className="accessory-cards__id">{acc.id}</p>
                                </div>
                                <div className="accessory-cards__size-accessory d-flex justify-content-between">
                                    <p className="accessory-cards__size-subtitle">Size <span>{acc.size}</span>/3</p>
                                    <p className="accessory-cards__size">
                                        <img src={accSize} className="accessory-cards__size-img" alt="size" data-size="1" />
                                    </p>
                                </div>
                                <div className="accessory-cards__footer d-flex justify-content-between align-items-center">
                                    <button 
                                        type="button" 
                                        className="d-flex align-items-center justify-content-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            !isNotActive && handleAccessoryClick(acc.id)}}>
                                        <img src={plusBlack} alt="plus" className="accessory-cards__plus" />
                                        <img src={plusImage} alt="plus" className="accessory-cards__plus-hover" />
                                    </button>
                                    <p className="accessory-cards__price"><span>{acc.price}</span>,00 EUR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accessory-cards__item_second">
                    </div>
                </div>
        )})
    };

    const chooseCurrentAttachedAcc = useCallback((id) => {
        if (isMobile) {
            dispatch(checkIsMobileOpen(true));
        }
        
        dispatch(setSelectedAttachedAcc(id));
    },[dispatch, isMobile]);

    return (
        <>
            <Tab.Content>
                <Tab.Pane eventKey={'all'}>
                    <div className="choose-accessories__cards accessory-cards d-flex flex-wrap justify-content-left">
                        {
                            currentSizeAcc()
                        }
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey={1}>
                    <div className="choose-accessories__cards accessory-cards d-flex flex-wrap justify-content-left">
                    {currentSizeAcc(1)}
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                    <div className="choose-accessories__cards accessory-cards d-flex flex-wrap justify-content-left">
                    {currentSizeAcc(2)}
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey={3}>
                    <div className="choose-accessories__cards accessory-cards d-flex flex-wrap justify-content-left">
                    {currentSizeAcc(3)}
                    </div>
                </Tab.Pane>
            </Tab.Content>
            <div className="choose-accessories__cards-attaching-title">
                <p>Attaching accessories</p><span></span>
            </div>
            <div className="choose-accessories__cards-attaching accessory-cards d-flex flex-wrap justify-content-between">
                {
                    filteredAttachedAccessories.length > 0 ? (
                        filteredAttachedAccessories.map((acc,id) => {
                            const isSelected = selectedAttachedAcc.includes(acc.id);

                            return (
                            <div 
                                key={id} 
                                className={`accessory-cards__item d-flex flex-column ${isSelected ? 'accessory-cards__item_choose' : ''}`} 
                                onClick={() => chooseCurrentAttachedAcc(acc.id)}>
                                <div className="accessory-cards__item_first">
                                    <div className="accessory-cards__img">
                                        <div className="accessory-cards__img-wrapper">
                                        <img src={accImage} alt="Accessory" className="d-none d-sm-inline" />
                                        <img src={accImageSmall} alt="Accessory" className="d-inline d-sm-none" />
                                        </div>
                                    </div>
                                    <div className="accessory-cards__content d-flex flex-column justify-content-between">
                                        <div className="accessory-cards__title">{acc.name}</div>
                                        <div className="accessory-cards__main">
                                            <div className="accessory-cards__id-accessory d-flex justify-content-between">
                                                <p className="accessory-cards__id-subtitle">Item number:</p>
                                                <p className="accessory-cards__id">{acc.id}</p>
                                            </div>
                                            <div className="accessory-cards__size-accessory d-flex justify-content-between">
                                                <p className="accessory-cards__size-subtitle">Size <span></span></p><p className="accessory-cards__size"><span className="accessory-cards__size-img" data-size={acc.size}></span></p>
                                            </div>
                                            <div className="accessory-cards__footer d-flex justify-content-between align-items-center">
                                                    <button 
                                                        type="button" 
                                                        className="d-flex align-items-center justify-content-center"
                                                        onClick={() => chooseCurrentAttachedAcc(acc.id)}>
                                                        <img src={plusBlack} alt="plus" className="accessory-cards__plus" />
                                                        <img src={plusImage} alt="plus" className="accessory-cards__plus-hover" /></button>
                                                    <p className="accessory-cards__price"><span>{acc.price}</span>,00 EUR</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accessory-cards__item_second">
                                </div>
                            </div>
                        )})
                    ) : (
                        <p>No attaching accessories available</p>
                    )
                }
            </div>
        </>
    )
}

export default AccessoriesList;

