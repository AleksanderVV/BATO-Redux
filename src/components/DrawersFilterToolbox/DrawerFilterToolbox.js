import { useState, useEffect, useRef } from 'react';

import './drawerFilterToolbox.scss';

import arrowDown from '../../data/images/icon/arrow-down-black.svg';

const DrawerFilterToolbox = ({data, isMobile, updateFilter}) => {
  const [numberDrawers, setNumberDrawers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [handleChooseNumberOfDrawers, setHandleChooseNumberOfDrawers] = useState('all');
  
  const menuRef = useRef(null);

  // Create dropdown filter items
  useEffect(() => {
    const filters = [...new Set(data.map(i => i.numberDrawers))].sort((a,b) => a - b);
    setNumberDrawers(filters);
  },[data]);

  // Toggle  open/close dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  // Create event close menu when click outside menu container
  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  const changeNumberOfDrawers = (selectedValue) => {
    setHandleChooseNumberOfDrawers(selectedValue);
    setIsMenuOpen(false);

    if (!isNaN(parseInt(selectedValue))) {
      updateFilter(parseInt(selectedValue));
    } else {
      updateFilter(selectedValue);
    }
    
  }

  return (
      <div ref={menuRef} className="filter-boxes__drawers filter-drawers" onClick={toggleMenu}>
      <div className="filter-drawers__top d-flex align-items-center justify-content-center">
        <div className="filter-drawers__text">{isMobile ? 'Drawers:' : 'Number of drawers:'}</div>
        <div className="filter-drawers__number">{handleChooseNumberOfDrawers === 'all' ? 'All' : handleChooseNumberOfDrawers}</div>
        <div className="filter-drawers__close open"><img src={arrowDown} alt="Open"/></div>
      </div>
      <div className={`filter-drawers__down ${isMenuOpen ? 'open' : 'close'}`}>
        <div 
          className="filter-drawers__item d-flex justify-content-between align-items-center selected"
          onClick={() => changeNumberOfDrawers('all')}
          key={'all'}>
            <div className="filter-drawers__number">All</div>
        </div>
        {numberDrawers.map(i => {
          if (i < 10) { i = `0${i}`};
          return (
            <div 
              className="filter-drawers__item d-flex justify-content-between align-items-center" 
              key={i}
              onClick={() => changeNumberOfDrawers(i)}>
                <div className="filter-drawers__number">{i}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DrawerFilterToolbox;