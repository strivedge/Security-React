/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateCompany, editActionRequest, isUserUniqueAction, isEmailUniqueAction } from 'views/companies/store/index';

import {
    Card,
    CardBody,
    CardText,
    Row,
    Col
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm } from 'react-bootstrap';

import ReactSnackBar from "react-js-snackbar";
import { TiMessages, TiContacts } from "react-icons/ti";
import animi3 from 'assets/img/anime3.png'

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Company Name is required'),
    contact_no: Yup.string()
        .required('Contact Number is required')
        .min(8, 'Invalid Contact Number (Minimum 8 Digits Are Required)')
        .max(10, 'Invalid Contact Number (Must Not Exceed 10 digits)'),
    email: Yup.string().email('Invalid email address').required('Email Address is required'),
    address: Yup.string().required('Physical Address is required')
});

const initialState = {
    user_id: {
        user_name: "",
        first_name: "",
        last_name: ""
    },
    name: "",
    logo: "",
    contact_no: "",
    email: "",
    address: "",
    header_color: "#ffffff",
    footer_color: "#ffffff",
}

const CompanyProfile = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.company)
    const loginStore = useSelector((state) => state.login)

    const [loadFirst, setLoadFirst] = useState(true)
    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")
    const [initialValues, setInitialValues] = useState(initialState)
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [errMessage, setErrMessage] = useState("")
    const [userErrMessage, setUserErrMessage] = useState("")

    useEffect(() => {
        if (loadFirst) {
            const query = { id: loginStore?.authUserItem?.company_id?._id }
            dispatch(editActionRequest(query));
            setLoadFirst(false)
        }
    }, [dispatch, loadFirst, loginStore?.authUserItem?.company_id?._id])

    useEffect(() => {
        if (store.editItem) {
            setInitialValues(store.editItem)
            setImagePreviewUrl(`${process.env.REACT_APP_DEV_NET_API_HOSTNAME}/${store.editItem.logo}`)
        }

        if (store.success && store.actionFlag === 'COMPANY_UPDATED') {
            setshowSnackbar(true)
            setSnakbarMessage(store.success)
        }

        if (store.error && store.actionFlag === 'COMPANY_UPDATED') {
            setshowSnackbar(true)
            setSnakbarMessage(store.error)
        }
    }, [store.editItem, store.actionFlag, store.success, store.error])

    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
        }, 6000);
    }, [showSnackBar])

    const handleUserChange = useCallback(
        async (event) => {
            const user_name = event.target.value
            const payload = {
                user_name: user_name,
                _id: initialValues?._id
            }
            if (user_name) { dispatch(isUserUniqueAction(payload)); }

        },
        [dispatch, initialValues]
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
        if (values?.user_id?.user_name === '') {
            return
        }
        if (userErrMessage !== "" && errMessage !== "") {
            return
        }
        if (userErrMessage === "" && errMessage === "" && values?.user_id?.user_name !== '') {
            dispatch(updateCompany(values))

        }
    };

    return (
        <>
            <div className="content">
                {showSnackBar && <ReactSnackBar Icon={<span><TiMessages size={25} /></span>} Show={showSnackBar}>
                    {snakebarMessage}
                </ReactSnackBar>}
                <Row>
                    <Col md="8">
                        <Card>
                            <div className="p-0 card-header">
                                <h3 className="card-title border-bottom pb-2 mb-0 mt-0">Company Profile</h3>
                            </div>
                            <CardBody className="pl-0 pr-0">
                                <Formik
                                    initialValues={initialValues}
                                    enableReinitialize={true}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
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
                                            <Row className="mb-2">
                                                <Col as={BootstrapForm.Group} controlId="formGridUserName">
                                                    <BootstrapForm.Label>User Name</BootstrapForm.Label>
                                                    <Field className="form-control" type="text" name="user_id.user_name" placeholder="Enter User Name" readOnly />
                                                    <ErrorMessage name="user_id.user_name" component="div" className="text-danger" />
                                                    {userErrMessage !== "" && <div className="text-danger">{userErrMessage}</div>}
                                                    {touched?.user_name && values?.user_name === '' && <div className="text-danger">Username is required</div>}
                                                </Col>

                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={6}>
                                                    <BootstrapForm.Group controlId="formGridContactNumber">
                                                        <BootstrapForm.Label>First Name</BootstrapForm.Label>
                                                        <Field type="text" name="user_id.first_name" className="form-control" placeholder="Enter First Name" />
                                                    </BootstrapForm.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <BootstrapForm.Group controlId="formGridEmailAddress">
                                                        <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                                                        <Field type="text" name="user_id.last_name" className="form-control" placeholder="Enter Last Name" />
                                                    </BootstrapForm.Group>
                                                </Col>
                                            </Row>
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
                                                        <Field type="email" name="email" className="form-control" placeholder="Enter Your Email Address" readOnly />
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
                                                    {/* <button type="button" onClick={() => closePopup()} className="float-end btn btn-primary">Cancel</button> */}
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-user">
                            <CardBody>
                                <CardText />
                                <div className="author">
                                    <div className="block block-one" />
                                    <div className="block block-two" />
                                    <div className="block block-three" />
                                    <div className="block block-four" />
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar"
                                            src={initialValues?.logo ? `${process.env.REACT_APP_DEV_NET_API_HOSTNAME}/${initialValues?.logo}` : animi3}
                                        />
                                        <h5 className="title">{initialValues?.company_name}</h5>
                                    </a>
                                    <p className="description">{initialValues?.email}</p>
                                    {initialValues?.phone !== "" && <p className="description"><TiContacts size={20} /> {initialValues?.contact_no ?? initialValues?.contact_no}</p>}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CompanyProfile;