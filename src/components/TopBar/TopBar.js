import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import TopBarAccessory from '../TopBarAccessory/TopBarAccessory';
import TopBarAttachedAccessory from '../TopBarAttachedAccessory/TopBarAttachedAccessory';

import { useSelector, useDispatch } from 'react-redux';
import { checkIsMenuOpen } from '../../reducers/conditions';
import { selectQuantityItems, setFullPrice } from '../../reducers/accessories';

import './topBar.scss';

import arrowDown from '../../data/images/icon/arrow-down.svg';
import arrowUpWhite from '../../data/images/icon/arrow-up-white.svg';
import cartImage from '../../data/images/icon/cart.svg';

const TopBar = () => {    
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const {currentToolbox} = useSelector(state => state.toolbox);
    const { isMobile, isSticky, isMenuOpen } = useSelector(state => state.conditions);
    const { 
            drawersData, 
            selectedAttachedAcc, 
            attachingAccessories,
            fullPrice } = useSelector(state => state.accessories);
    const quantityItems = useSelector(selectQuantityItems);

    const dispatch = useDispatch();

    useEffect(() => {

        const handleClickOutside = (event) => {
            const overlay = document.querySelector('.overlay');
          if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target === overlay) {
            dispatch(checkIsMenuOpen(false));
          }
        }
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        }
        // eslint-disable-next-line
    }, []);

    const topBarSwitcher = () => {
        
        switch (location.pathname) {
            case "/chooseAccessories":
                return (
                    <div 
                        className="result__total-item d-flex justify-content-end"
                        onClick={() => dispatch(checkIsMenuOpen(!isMenuOpen))}>
                        <p>
                            <span>{quantityItems || 0}</span> accessories
                            <span className="result__total-item-text">, show</span>
                            <img 
                                src={arrowDown} 
                                className={classNames("result__img_close", {close: isMenuOpen})} 
                                alt="arrow" />
                            <img 
                                src={arrowUpWhite} 
                                className={classNames("result__img_close", {close: !isMenuOpen})} 
                                alt="arrow" />
                        </p>
                    </div>
                );
            case "/sendForm":
                return null;
            default:
                return (
                    <div className="result__total-item d-flex justify-content-end">
                        <p><span>{quantityItems || 0}</span> accessories</p>
                    </div>
                );
        }
    }

    let resultDropdownClassName = 'result-dropdown';

    resultDropdownClassName = isSticky ? resultDropdownClassName += ' result_sticky' : resultDropdownClassName;
    resultDropdownClassName = isMenuOpen ? resultDropdownClassName += ' open-dropdown' : resultDropdownClassName;

    const handleClickTopBar = () => {
        navigate('/sendForm');
        dispatch(checkIsMenuOpen(false));
    }

    useEffect(() => {
        const attachedAccPrice = attachingAccessories
                .filter(item => selectedAttachedAcc.includes(item.id))
                .reduce((total, item) => total + item.price, 0);
        const accessoriesPrice = Object.values(drawersData).flat().reduce((total, item) => total + item.price, 0);
        
        dispatch(setFullPrice((currentToolbox?.price || 0) + attachedAccPrice + accessoriesPrice));
    },[selectedAttachedAcc, attachingAccessories, currentToolbox, drawersData, dispatch])

    return (
        <>
            <section 
            className={`result ${isSticky && !isMobile ? 'result_sticky' : ''}`}
            style={{marginTop: isSticky && isMobile && location.pathname === '/chooseAccessories' ? '70px' : '0px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="result__items justify-content-between">
                                <div className={classNames(
                                                    "result__item", 
                                                    "result__item_first", 
                                                    {"result__item_current": location.pathname === '/'})}>
                                    
                                    {isMobile ? '01. Toolbox' : '01. Toolbox Selection'}
                                </div>
                                <div className="result__delimiter flex-fill"></div>
                                <div className={classNames(
                                                    "result__item", 
                                                    "result__item_second", 
                                                    {"result__item_current": location.pathname === '/chooseAccessories'})}>
                                    {isMobile ? '02. Accessories' : '02. Accessories Selection'}
                                </div>
                                <div className="result__delimiter flex-fill"></div>
                                <div className={classNames(
                                                    "result__item", 
                                                    "result__item_last", 
                                                    {"result__item_current": location.pathname === '/sendForm'})}>
                                    03. Summary
                                </div>
                            </div>
                        </div>
                        <div className="col-3 col-lg-4 d-none d-lg-block">
                            {topBarSwitcher()}
                        </div>
                    </div>
                </div>
            </section>
            <section 
                ref={dropdownRef} 
                className={resultDropdownClassName}>
                <div className="result-dropdown__wrapper">
                <div className="container">
                    <div className="result-dropdown__section">
                    <div className="row">
                        <div className="col-12">
                        <div className="result-dropdown__box box-selected d-flex justify-content-between align-items-center">
                            <div className="box-selected__item">
                                {currentToolbox?.name}
                            </div>
                            <div className="box-selected__price">
                                <span>{currentToolbox?.price}</span>,00 EUR
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row flex-fill">
                        <div className="col-12">
                            <div className="result-dropdown__accessory accessory-selected">
                                    {<TopBarAccessory />}
                                    {<TopBarAttachedAccessory />}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="result-dropdown__total total-selected d-flex justify-content-between align-items-end">
                            <div className="total-selected__text">Total price</div>
                            <div className="total-selected__delimiter flex-fill"></div>
                            <div className="total-selected__price"><span>{fullPrice}</span>,00 EUR</div>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <div className="result-dropdown__submit d-flex align-items-center justify-content-center">
                            <button type="button" onClick={handleClickTopBar}><span>
                                <img src={cartImage} alt="cart" />Færdig med valg</span>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="result-dropdown__close" onClick={() => dispatch(checkIsMenuOpen(!isMenuOpen))}>
            
                </div>
            </section>
        </>
    );
}

export default TopBar;
