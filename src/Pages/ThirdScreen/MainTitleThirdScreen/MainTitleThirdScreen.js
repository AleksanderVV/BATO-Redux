import './mainTitleThirdScreen.scss';

import xIcon from '../../../data/images/box-shadow.png';
import cart from '../../../data/images/icon/cart.svg';
import mouse from '../../../data/images/icon/mouse.svg'; 
import flag from '../../../data/images/icon/flag.svg';

const MainTitleThirdScreen = () => {
    return (
        <section className="total-main">
            <div className="container">
            <div className="row">
                <div className="d-block d-md-none">
                <div className="total-main__top-image text-center">
                    <img src={flag} alt="Flag" />
                </div>
                </div>
                <div className="col-12 col-lg-6 col-md-6 text-center text-md-start">
                <div className="total-main__content">
                    <h1>You're almost done!</h1>
                    <p>
                    Now you have composed your tool-cart. Just enter your contact information and we will get back to you as soon as possible with a super good deal on the desired. REMEMBER! Your inquiry does not require a purchase.
                    </p>
                    <a href="#total-result" className="total-main__link d-none d-md-flex">
                        <span><img src={cart} alt="Cart" />Ja tak, send mig et tilbud</span>
                        </a>
                </div>
                </div>
                <div className="d-none d-md-block col-md-6 col-lg-6">
                <div className="total-main__image">
                    <img src={xIcon} alt="Box" />
                </div>
                </div>
                <div className="d-block d-md-none">
                <div className="total-main__scroll-image text-center">
                    <img src={mouse} alt="Box" />
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default MainTitleThirdScreen;