import './mainTitleSecondScreen.scss';
import plusImage from '../../../data/images/icon/plus.svg';
import shadowImage from '../../../data/images/box-shadow.png';
import mouseImage from '../../../data/images/icon/mouse.svg';
import flagImage from '../../../data/images/icon/flag.svg';

const MainTitleSecondScreen = ({isSticky, isMobile}) => {
    return (
        <section className={`total-main total-accessories ${!isSticky ? '' : isMobile ? '' : 'margin-top'}`}>
            <div className="container d-none d-sm-block">
                <div className="row">
                    <div className="d-block d-md-none">
                        <div className="total-main__top-image text-center">
                            <img src={flagImage} alt="Flag" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-md-6 text-center text-md-start">
                        <div className="total-main__content">
                            <h1>BATO Tools cabinet</h1>
                            <p className="total-main__title">
                                4 drawers mini without swheels.Blue.
                            </p>
                            <p>
                                You choose the accessories by clicking on it. Do you want to opt out, simply click on it again. When you are finished assembling, click on the blue "Finished choice" button on the right side.
                            </p>
                            <a href="#choose-accessories" className="total-main__link d-none d-md-flex">
                                <span>
                                    <img src={plusImage} alt="Cart" />Add accessories
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="d-none d-md-block col-md-6 col-lg-6">
                        <div className="total-main__image">
                            <img src={shadowImage} alt="Box" />
                        </div>
                    </div>
                    <div className="d-block d-md-none">
                        <div className="total-main__scroll-image text-center">
                            <img src={mouseImage} alt="Box" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainTitleSecondScreen;