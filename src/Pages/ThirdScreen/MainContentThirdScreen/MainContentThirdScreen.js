import { useRef } from 'react';
import {v4 as uuidv4} from 'uuid';
import { useSelector } from 'react-redux';
import FormSend from '../../../components/FormSend/FormSend';

import './mainContentThirdScreen.scss';

import mailSendImage from '../../../data/images/icon/mail-send.svg';
import mailSendBlackImage from '../../../data/images/icon/mail-send-black.svg';
import xIcon from '../../../data/images/icon/x-icon.svg';


const MainContentThirdScreen = () => {  

    const priceBoxRef = useRef(null);
    const {currentToolbox} = useSelector(state => state.toolbox);
    const {fullPrice} = useSelector(state => state.accessories);

    return (
        <section className="total-result" id="total-result">
            <div className="container">
            <div className="row">
                <div className="col-12 order-2 col-md-6 order-md-1 d-flex align-items-center">
                <div className="total-result__form-box">
                    <h3>Get a offer for the selected toolbox and accessories</h3>
                    <FormSend priceBoxRef={priceBoxRef}/>
                </div>
                <div className="total-result__after-send">
                    <img src={mailSendImage} alt="Email" className="d-none d-md-inline" />
                    <img src={mailSendBlackImage} alt="Email" className="d-inline d-md-none" />
                    <p className="total-result__title-send">Thank you for your interest</p>
                    <p className="total-result__text-send">
                    We will process your request as quickly as we can, and you will soon receive an offer from us by e-mail of the composition that you have chosen and can see above.
                    </p>
                </div>
                </div>
                <div className="col-12 order-1 col-md-6 order-md-2">
                <div ref={priceBoxRef} className="total-result__price-box total-items-box">
                    <div className="total-items-box__header">
                    <p className="total-items-box__name">
                        {currentToolbox?.name}
                    </p>
                    <p className="total-items-box__price">
                        <span>{currentToolbox?.price}</span>,00 EUR
                    </p>
                    </div>
                    <div className="total-items-box__items">
                        <ListAccessories />
                    </div>
                    <div className="total-items-box__total">
                    <p className="total-items-box__name">
                        Total price
                    </p>
                    <p className="total-items-box__price">
                        <span>{fullPrice}</span>,00 EUR
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}

const ListAccessories = () => {

    const {drawersData, selectedAttachedAcc} = useSelector(state => state.accessories);
    if (!drawersData || !selectedAttachedAcc) return null;

    const selectedAccList = Object.entries(drawersData).map(([key,array]) => {
        if (array.length === 0) return null;

        return (
            <div key={uuidv4()}>{
            array.map(acc => (
                <div key={uuidv4()} className="total-items-box_item">
                    <div className="total-items-box__name d-flex justify-content-between">
                        <p>{acc.name}</p>
                        <div className="total-items-box__close d-none"><img src={xIcon} alt="close" /></div>
                    </div>
                    <div className="total-items-box__price d-flex">
                        {acc.price} EUR
                        <p className="d-flex d-none justify-content-center align-items-center">
                            <img src={xIcon} className="delete_item" alt="delete" />
                        </p>
                    </div>
                </div>
            ))}</div>
        );
    });
    
    return  <>
                {selectedAccList ? selectedAccList : null}
            </>
};

export default MainContentThirdScreen;