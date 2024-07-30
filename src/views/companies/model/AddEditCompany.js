/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Form as BootstrapForm, Row, Col, InputGroup } from 'react-bootstrap';
import { creatActionRequest, updateCompany, isEmailUniqueAction, isUserUniqueAction } from '../store';
import { useDispatch, useSelector } from 'react-redux';
// Validation schema using Yup

const validationSchema = Yup.object({
    name: Yup.string().required('Company Name is required'),
    contact_no: Yup.string()
        .required('Contact Number is required')
        .min(8, 'Invalid Contact Number (Minimum 8 Digits Are Required)')
        .max(10, 'Invalid Contact Number (Must Not Exceed 10 digits)'),
    email: Yup.string().email('Invalid email address').required('Email Address is required'),
    address: Yup.string().required('Physical Address is required'),

});
const CompanyProfileForm = ({ show, closePopup, initialValues, title }) => {
    const store = useSelector((state) => state.company)

    const dispatch = useDispatch()
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [passwordShown, setPasswordShown] = useState(true)
    const [errMessage, setErrMessage] = useState("")
    const [userErrMessage, setUserErrMessage] = useState("")
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    useEffect(() => {
        if (initialValues?.logo !== "") {
            setImagePreviewUrl(`${process.env.REACT_APP_DEV_NET_API_HOSTNAME}/${initialValues?.logo}`);
        }
    }, [initialValues?.logo])

    const handleEmailChange = useCallback(
        async (event, validateField, values) => {
            const { name, value } = event.target;
            const payload = {
                email: value
            }
            const Editpayload = {
                email: value,
                _id: initialValues?._id
            }
            await validateField(name);
            const errors = await validationSchema.validateAt(name, values).catch(err => err);

            if (!errors || !errors.message) {
                if (title === 'Add Company') {
                    dispatch(isEmailUniqueAction(payload))
                }
                if (title === 'Edit Company') {
                    dispatch(isEmailUniqueAction(Editpayload))
                }
            }
        },
        [dispatch, initialValues, title]
    );

    const handleUserChange = useCallback(
        async (event) => {
            const user_name = event.target.value
            const payload = {
                user_name: user_name
            }
            if (user_name) { dispatch(isUserUniqueAction(payload)); }

        },
        [dispatch]
    );

    useEffect(() => {
        if (store.actionFlag === 'CHECK_EMIAL_IS_UNIQUE') {
            if (!store.isEmailUnique) {
                setErrMessage("Email is not unique")
            }
            if (store.isEmailUnique) {
                setErrMessage("")
            }

        }
        if (store.actionFlag === 'CHECK_USER_IS_UNIQUE') {
            if (!store.isUserUnique) {
                setUserErrMessage("User is not unique")
            }
            if (store.isUserUnique) {
                setUserErrMessage("")
            }
        }
    }, [store])

    const handleFileUpload = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFieldValue('logo', reader.result); // Store base64 encoded image
                setImagePreviewUrl(reader.result); // Set image preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (values) => {
        if (title === 'Add Company') {
            if (!values.user_name || !values.password) {
                return;
            }
            if (userErrMessage !== "" && errMessage !== "") {
                return
            }
            if (userErrMessage === "" && errMessage === "") {
                dispatch(creatActionRequest(values))

            }
        }
        if (title === 'Edit Company') {
            const payload = {
                _id: initialValues?._id,
                name: values.name,
                contact_no: values.contact_no,
                email: values.email,
                address: values.address,
                logo: imagePreviewUrl,
            }
            if (errMessage === "") {
                dispatch(updateCompany(payload))
            }
        }
        setImagePreviewUrl('');
        closePopup();
    };
    return (
        <Modal className="UpdateUserPopup" size="lg" show={show} aria-labelledby="example-modal-sizes-title-lg" centered>
            <Modal.Header>
                <span className='modal-title border-bottom col-sm-12 ' id="example-modal-sizes-title-lg">
                    <h3 className='border-bottom pb-2 mb-0 mt-0'>{title}</h3>
                </span>
                <button type="button" className='Close-button' onClick={closePopup}>×</button>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({ setFieldValue, values, touched, validateField }) => (

                        <Form>
                            <Row className="mb-2">
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridCompanyName">
                                        <BootstrapForm.Label>Company Name</BootstrapForm.Label>
                                        <Field type="text" name="name" className="form-control" placeholder="Enter Company Name" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </BootstrapForm.Group>
                                </Col>
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridClientLogo" >
                                        <BootstrapForm.Label>Logo</BootstrapForm.Label>
                                        <div className='d-flex'>
                                            <input
                                                type="file"
                                                name="logo"
                                                onChange={(event) => handleFileUpload(event, setFieldValue)}
                                                className="form-control-file "
                                                accept="image/*"
                                            />
                                            {imagePreviewUrl && (
                                                <img
                                                    height={50}
                                                    width={50}
                                                    src={imagePreviewUrl}
                                                    alt="Client Logo Preview"
                                                    style={{ marginTop: '10px', maxWidth: '100%' }}
                                                />
                                            )}
                                        </div>
                                    </BootstrapForm.Group>
                                </Col>
                            </Row>
                            {title === 'Add Company' && <Row className="mb-2">
                                <Col as={BootstrapForm.Group} controlId="formGridUserName">
                                    <BootstrapForm.Label>User Name</BootstrapForm.Label>
                                    <Field className="form-control" type="text" name="user_name" placeholder="Enter User Name" onBlur={(event) => handleUserChange(event)} />
                                    {touched?.user_name && values?.user_name === '' && <div className="text-danger">Username is required</div>}
                                    {userErrMessage !== "" && <div className="text-danger">Username is not unique</div>}
                                </Col>
                                <Col as={BootstrapForm.Group} controlId="formGridPassword">
                                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                                    <div className="position-relative">
                                        <InputGroup className="mb-0">
                                            <Field className="form-control" type={passwordShown ? "text" : "password"} name="password" placeholder="Enter Password" />
                                            <InputGroup.Text className='input-eyes-text'>
                                                <a onClick={togglePasswordVisibility}>
                                                    {passwordShown ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                                        </svg>
                                                    )}
                                                </a>
                                            </InputGroup.Text>
                                        </InputGroup>
                                        <div><small>*Password must be alphanumeric & Min. 8 characters</small></div>
                                        {touched?.password && values?.password === '' && <div className="text-danger">Password is required</div>}
                                    </div>
                                </Col>
                            </Row>}
                            <Row className="mb-2">
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridContactNumber">
                                        <BootstrapForm.Label>Contact Number</BootstrapForm.Label>
                                        <Field type="text" name="contact_no" className="form-control" placeholder="Enter Contact Number" />
                                        <ErrorMessage name="contact_no" component="div" className="text-danger" />
                                    </BootstrapForm.Group>
                                </Col>
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridEmailAddress">
                                        <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                                        {title === 'Add Company' && <Field type="email" name="email" className="form-control" placeholder="Enter Your Email Address" onBlur={(e) => handleEmailChange(e, validateField, values)} />}
                                        {title === 'Edit Company' && <Field type="email" name="email" className="form-control" placeholder="Enter Your Email Address" value={values?.email} readOnly />}
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                        {errMessage !== "" && <div className="text-danger">{errMessage}</div>}
                                    </BootstrapForm.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <BootstrapForm.Group as={Col} controlId="formGridPhysicalAddress">
                                    <BootstrapForm.Label>Physical Address</BootstrapForm.Label>
                                    <Field type="text" name="address" className="form-control" placeholder="Enter Your Physical Address" />
                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                </BootstrapForm.Group>
                            </Row>
                            <Row className="mb-2">
                                <BootstrapForm.Group as={Col} controlId="formGridHeaderColor" className='col-12 col-md-6 col-lg-3'>
                                    <BootstrapForm.Label>Header Color</BootstrapForm.Label>
                                    <Field type="color" name="header_color" className="form-control col-12 col-md-6 col-lg-4" />
                                </BootstrapForm.Group>
                                <BootstrapForm.Group as={Col} controlId="formGridFooterColor" className='col-12 col-md-6 col-lg-3'>
                                    <BootstrapForm.Label>Footer Color</BootstrapForm.Label>
                                    <Field type="color" name="footer_color" className="form-control col-12 col-md-6 col-lg-4" />
                                </BootstrapForm.Group>
                            </Row>
                            <div className="w-100 PadR0 ItemInfo-right mt-3">
                                <div className="row justify-content-end m-0">
                                    <button type="submit" className="float-end btn btn-primary">Submit</button>
                                    <button type="button" onClick={() => closePopup()} className="float-end btn btn-primary">Cancel</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default CompanyProfileForm;
