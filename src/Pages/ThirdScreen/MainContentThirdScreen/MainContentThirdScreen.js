import { useRef } from 'react';
import {v4 as uuidv4} from 'uuid';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './mainContentThirdScreen.scss';

import mailSendImage from '../../../data/images/icon/mail-send.svg';
import mailSendBlackImage from '../../../data/images/icon/mail-send-black.svg';
import xIcon from '../../../data/images/icon/x-icon.svg';


const MainContentThirdScreen = ({
        currentToolbox, 
        drawersData, 
        selectedAttachedAcc,
        fullPrice
    }) => {  

    const priceBoxRef = useRef(null);

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
                        {currentToolbox.name}
                    </p>
                    <p className="total-items-box__price">
                        <span>{currentToolbox.price}</span>,00 EUR
                    </p>
                    </div>
                    <div className="total-items-box__items">
                        <ListAccessories
                            drawersData={drawersData}
                            selectedAttachedAcc={selectedAttachedAcc} />
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

const ListAccessories = ({drawersData, selectedAttachedAcc}) => {

    if (!drawersData || !selectedAttachedAcc) return null;
    
    return <>
                {Object.entries(drawersData).map(([key,array]) => {
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
                })}
    </>
};

const FormSend = ({priceBoxRef}) => {

    const handleSubmit = (values) => {
        if (priceBoxRef.current) {
            const priceBoxContent = priceBoxRef.current.innerText; // Extract text content
            console.log('Price Box Content:', priceBoxContent);

            const emailContent = `
                Name: ${values.name}
                Company: ${values.company}
                Zip Code: ${values.zip}
                Email: ${values.email}
                Phone: ${values.phone}
                Message: ${values.message}

                --- Selected Items ---
                ${priceBoxContent}
                `;

            console.log('Email Content:', emailContent);

            // Replace this with your email sending logic
            alert('Email sent with the following content:\n' + emailContent);
        }
    };

    return (
        <Formik 
            initialValues = {{
                name: '',
                company: '',
                zip: '',
                email: '',
                phone: '',
                message: ''
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                            .min(2, 'Minimum 2 letters!!!')
                            .required('Required!!!'),
                company: Yup.string()
                            .required('Required!!!'),
                zip: Yup.string()
                            .required('Required!!!'),
                email: Yup.string()
                            .email('Enter valid email!!!')
                            .required('Required'),
                phone: Yup.number()
                            .required('Required!!!'),
                message: Yup.string()
            })}
            onSubmit = {handleSubmit}
        >
            <Form>
                <p>
                    <Field type="text" name="name" id="name" placeholder="Name and Surname" />
                    <ErrorMessage name='name'>{msg => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>
                </p>
                <p>
                    <Field type="text" name="company" id="company" placeholder="Company" />
                    <ErrorMessage name='company'>{msg => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>
                </p>
                <p>
                    <Field type="text" name="zip" id="zip" placeholder="Zip Code" />
                    <ErrorMessage name='zip'>{msg => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>
                </p>
                <p>
                    <Field type="text" name="email" id="email" placeholder="E-mail address" />
                    <ErrorMessage name='email'>{msg => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>
                </p>
                <p>
                    <Field type="number" name="phone" id="phone" placeholder="Telephone" />
                    <ErrorMessage name='phone'>{msg => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>
                </p>
                <p>
                    <Field as="textarea" name="message" id="message" placeholder="Message" ></Field>
                </p>
                <p className="total-result__submit">
                    <button type="submit"><span>Ja tak, send mig et tilbud</span></button>
                </p>
            </Form>
        </Formik>
    )
}

export default MainContentThirdScreen;