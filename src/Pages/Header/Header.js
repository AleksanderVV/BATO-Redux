
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { checkIsMenuOpen } from '../../reducers/conditions';
import { selectQuantityItems } from '../../reducers/accessories';

import arrowDown from '../../data/images/icon/arrow-down.svg';
import arrowUpWhite from '../../data/images/icon/arrow-up-white.svg'

import './header.scss';

const Header = () => {
    const location = useLocation();
    const { isMobile, isSticky, isMenuOpen } = useSelector(state => state.conditions);
    const dispatch = useDispatch();
    const quantityItems = useSelector(selectQuantityItems);

    return (
        <>
            <div className='overlay'></div>
            <header className={isMobile && isSticky ? 'header result_sticky' : 'header'}>
                <div className="container">
                <div className="row justify-content-between">
                    <div className="col-1 align-middle">
                    <Link to={{pathname: "/"}} className="header__logo">BATO</Link>
                    </div>
                    <div className="col-1 d-none justify-content-end d-md-flex">
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center d-lg-none">
                    <div 
                        className="header__total-item d-flex justify-content-end"
                        onClick={() => dispatch(checkIsMenuOpen(!isMenuOpen))}>
                        <p><span>{ quantityItems || 0}</span> item added</p>
                        {
                        location.pathname === '/chooseAccessories' && !isMenuOpen ?
                           <img src={arrowDown} className="header__img_close" alt="arrow" /> :
                           <img src={arrowUpWhite} className="header__img_open" alt="arrow" /> 
                        }
                    </div>
                    </div>
                </div>
                </div>
            </header>
        </>
    )
}

export default Header;

