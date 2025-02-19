import { useState } from 'react';
import { Tab } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectQuantityItems } from '../../../reducers/accessories';

import AccessoriesFilters from '../../../components/AccessoriesFilters/AccessoriesFilters';
import AccessoriesList from '../../../components/AccessoriesList/AccessoriesList';
import DrawerSideBar from '../../../components/DrawerSideBar/DrawerSideBar';

import './mainContentSecondScreen.scss';
import filterMobile from '../../../data/images/icon/filter-mobile.svg';

const MainContentSecondScreen = ({  
                                    fullPrice, 
                                    handleClick,
                                    currentDrawer,
                                    setCurrentDrawer,
                                    deleteAcc}) => {

    const [openChooseDrawers, setOpenChooseDrawers] = useState(false);
    const {isMobileOpen} = useSelector(state => state.conditions);
    const {loading} = useSelector(state => state.accessories);
    const {quantityItems} = useSelector(selectQuantityItems);

    return (
        <section id="choose-accessories" className="choose-accessories">
            <div className="container">
                <div className="row">
                    <DrawerSideBar 
                        fullPrice={fullPrice}
                        handleClick={handleClick}
                        currentDrawer={currentDrawer}
                        setCurrentDrawer={setCurrentDrawer}
                        deleteAcc={deleteAcc}
                        openChooseDrawers={openChooseDrawers}
                        setOpenChooseDrawers={setOpenChooseDrawers} />
                    <div className="col-xl-6 col-xxl-8">
                        <div className="choose-accessories__select">
                        <Tab.Container defaultActiveKey={'all'}>
                            <AccessoriesFilters />
                            {!loading ? (
                                <AccessoriesList 
                                    currentDrawer={currentDrawer}
                                />
                            ) : (
                                <p>Loading accessories...</p>
                            )}
                        </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                className="choose-accessories__filter-top"
                style={{display: isMobileOpen ? 'flex' : 'none'}}
                onClick={() => setOpenChooseDrawers(true)}
                 >
                <img src={filterMobile} alt="icon" />
                <span>{quantityItems}</span>
            </button>
        </section>
    )
}

export default MainContentSecondScreen;