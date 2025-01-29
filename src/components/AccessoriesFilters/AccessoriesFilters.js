import { Nav } from 'react-bootstrap';

import './accessoriesFilters.scss';

const AccessoriesFilters = ({searchAcc}) => {

    return (
        <>
            <div className="choose-accessories__select-title text-end">
            Accessory size
            </div>
            <div className="choose-accessories__top d-flex align-items-end">
                <div className="choose-accessories__search flex-fill">
                    <input 
                        onChange={searchAcc}
                        type="search" 
                        name="search" 
                        id="search-accessories" 
                        placeholder="Search accessory by item number or name" />
                </div>
                <p className="choose-accessories__title-size d-sm-none">Size</p>
                <Nav variant='pills'>
                    <Nav.Item>
                        <Nav.Link eventKey={'all'} className="d-flex align-items-center">
                            All
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={1} className="d-flex align-items-center">
                            1
                            <div className="choose-accessories__nav-img nav-img nav-img-1 d-flex">
                            <div className="nav-img__item"></div>
                            <div className="nav-img__item"></div>
                            <div className="nav-img__item"></div>
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={2} className="d-flex align-items-center">
                            2
                            <div className="choose-accessories__nav-img nav-img nav-img-2 d-flex">
                            <div className="nav-img__item"></div>
                            <div className="nav-img__item"></div>
                            <div className="nav-img__item"></div>
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={3} className="d-flex align-items-center">
                            3
                            <div className="choose-accessories__nav-img nav-img nav-img-3 d-flex">
                            <div className="nav-img__item"></div>
                            <div className="nav-img__item"></div>
                            <div className="nav-img__item"></div>
                            </div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </>
    )
}

export default AccessoriesFilters;