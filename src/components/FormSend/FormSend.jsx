import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

export default FormSend;