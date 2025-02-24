import { Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuantityItems, setIsOpenChooseDrawers } from '../../../reducers/accessories';

import AccessoriesFilters from '../../../components/AccessoriesFilters/AccessoriesFilters';
import AccessoriesList from '../../../components/AccessoriesList/AccessoriesList';
import DrawerSideBar from '../../../components/DrawerSideBar/DrawerSideBar';

import './mainContentSecondScreen.scss';
import filterMobile from '../../../data/images/icon/filter-mobile.svg';

const MainContentSecondScreen = () => {

    const {isMobileOpen} = useSelector(state => state.conditions);
    const {loading} = useSelector(state => state.accessories);
    const {quantityItems} = useSelector(selectQuantityItems);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setIsOpenChooseDrawers(true));
    };

    return (
        <section id="choose-accessories" className="choose-accessories">
            <div className="container">
                <div className="row">
                    <DrawerSideBar />
                    <div className="col-xl-6 col-xxl-8">
                        <div className="choose-accessories__select">
                        <Tab.Container defaultActiveKey={'all'}>
                            <AccessoriesFilters />
                            {!loading ? (
                                <AccessoriesList />
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
                onClick={handleClick}
                 >
                <img src={filterMobile} alt="icon" />
                <span>{quantityItems || 0}</span>
            </button>
        </section>
    )
}

export default MainContentSecondScreen;