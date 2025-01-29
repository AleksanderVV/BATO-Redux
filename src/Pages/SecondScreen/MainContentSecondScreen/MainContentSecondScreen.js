import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'react-bootstrap';

import AccessoriesFilters from '../../../components/AccessoriesFilters/AccessoriesFilters';
import AccessoriesList from '../../../components/AccessoriesList/AccessoriesList';
import DrawerSideBar from '../../../components/DrawerSideBar/DrawerSideBar';

import './mainContentSecondScreen.scss';
import filterMobile from '../../../data/images/icon/filter-mobile.svg';

const MainContentSecondScreen = ({  isMobile,
                                    mobileOpen,
                                    toggleDropdownMenuOpen, 
                                    currentToolbox, 
                                    fullPrice, 
                                    handleClick,
                                    drawersData,
                                    setDrawersData,
                                    selectedAttachedAcc,
                                    handleAccessoryClick,
                                    chooseCurrentAttachedAcc,
                                    currentDrawer,
                                    setCurrentDrawer,
                                    calculateRemainingSpace,
                                    searchAcc,
                                    loading,
                                    filteredAccessories,
                                    attachingAccessories,
                                    deleteAcc,
                                    quantityItems}) => {
    const [openChooseDrawers, setOpenChooseDrawers] = useState(false);

    return (
        <section id="choose-accessories" className="choose-accessories">
            <div className="container">
                <div className="row">
                    <DrawerSideBar 
                        isMobile={isMobile}
                        toggleDropdownMenuOpen={toggleDropdownMenuOpen}
                        currentToolbox={currentToolbox}
                        fullPrice={fullPrice}
                        handleClick={handleClick}
                        currentDrawer={currentDrawer}
                        setCurrentDrawer={setCurrentDrawer}
                        drawersData={drawersData}
                        setDrawersData={setDrawersData}
                        selectedAttachedAcc={selectedAttachedAcc}
                        deleteAcc={deleteAcc}
                        mobileOpen={mobileOpen}
                        openChooseDrawers={openChooseDrawers}
                        setOpenChooseDrawers={setOpenChooseDrawers} />
                    <div className="col-xl-6 col-xxl-8">
                        <div className="choose-accessories__select">
                        <Tab.Container defaultActiveKey={'all'}>
                            <AccessoriesFilters searchAcc={searchAcc}/>
                            {!loading ? (
                                <AccessoriesList 
                                    currentToolbox={currentToolbox} 
                                    accessories={filteredAccessories} 
                                    attachingAccessories={attachingAccessories}
                                    selectedAttachedAcc={selectedAttachedAcc}
                                    chooseCurrentAttachedAcc={chooseCurrentAttachedAcc}
                                    currentDrawer={currentDrawer}
                                    drawersData={drawersData}
                                    calculateRemainingSpace={calculateRemainingSpace}
                                    handleAccessoryClick={handleAccessoryClick}/>
                            ) : (
                                <p>Loading accessories...</p>
                            )}
                        </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                className="choose-accessories__filter-top d-sm-none"
                style={{display: mobileOpen ? 'flex' : 'none'}}
                onClick={() => setOpenChooseDrawers(true)}
                 >
                <img src={filterMobile} alt="icon" />
                <span>{quantityItems}</span>
            </button>
        </section>
    )
}

export default MainContentSecondScreen;