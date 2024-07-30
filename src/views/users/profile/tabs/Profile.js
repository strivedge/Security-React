/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { editProfile, updateProfile } from "views/login/store/index";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardText,
    FormGroup,
    Input,
    Row,
    Col,
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ReactSnackBar from "react-js-snackbar";
import { TiMessages, TiContacts } from "react-icons/ti";

import { profileItem } from "utility/reduxConstant";

import animi3 from 'assets/img/anime3.png';

function UserProfile() {
    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name Is Required'),
        last_name: Yup.string().required('Last Name Is Required'),
        email: Yup.string().email('Invalid email format').required('Email Is Required'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone Number Is Required'),
        user_name: Yup.string().required('Username Is Required'),
    });
    const dispatch = useDispatch();
    const store = useSelector((state) => state.login)

    const [user, setUser] = useState(profileItem);
    const [loadFirst, setLoadFirst] = useState(true)
    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")

    useEffect(() => {
        if (loadFirst) {
            dispatch(editProfile());
            setLoadFirst(false)
        }
    }, [dispatch, loadFirst])

    useEffect(() => {
        if (store.profile) {
            setUser(store.profile)
        }
        if (store.success) {
            setshowSnackbar(true)
            setSnakbarMessage(store.success)
        }
        if (store.error) {
            setshowSnackbar(true)
            setSnakbarMessage(store.error)
        }
    }, [user, store.profile, store.success, store.error])

    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
        }, 6000);
    }, [showSnackBar])

    const handleSubmit = (values) => {
        dispatch(updateProfile(values));
    };
    return (
        <>
            <div className="content">
                {showSnackBar && <ReactSnackBar Icon={<span><TiMessages size={25} /></span>} Show={showSnackBar}>
                    {snakebarMessage}
                </ReactSnackBar>}
                <Row>
                    <Col md="8" className="mb-3">
                        <Card className="mb-0">
                            <div className="p-0 card-header">
                                <h3 className="card-title border-bottom pb-2 mt-0">Profile</h3>
                            </div>
                            <CardBody className="pl-0 pr-0">
                                <Formik initialValues={user} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={validationSchema}>
                                    {({ }) => (
                                        <Form>
                                            <Row>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label>Username</label>
                                                        <Field
                                                            name="user_name"
                                                            placeholder="Username"
                                                            type="text"
                                                            as={Input}
                                                        />
                                                        <ErrorMessage name="user_name" component="span" style={{ color: 'red' }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label>Email address</label>
                                                        <Field
                                                            name="email"
                                                            placeholder="mike@email.com"
                                                            type="email"
                                                            as={Input}
                                                        />
                                                        <ErrorMessage name="email" component="span" style={{ color: 'red' }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label>Contact Number</label>
                                                        <Field
                                                            name="phone"
                                                            placeholder="Enter Contact Number"
                                                            // type="number"
                                                            as={Input}
                                                        />
                                                        <ErrorMessage name="phone" component="span" style={{ color: 'red' }} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label>First Name</label>
                                                        <Field
                                                            name="first_name"
                                                            placeholder="First Name"
                                                            type="text"
                                                            as={Input}
                                                        />
                                                        <ErrorMessage name="first_name" component="span" style={{ color: 'red' }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label>Last Name</label>
                                                        <Field
                                                            name="last_name"
                                                            placeholder="Last Name"
                                                            type="text"
                                                            as={Input}
                                                        />
                                                        <ErrorMessage name="last_name" component="span" style={{ color: 'red' }} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {/* <CardFooter> */}
                                            <Button
                                                className="btn-fill"
                                                color="primary"
                                                type="submit"
                                            // disabled={isSubmitting}
                                            >
                                                Submit
                                            </Button>
                                            {/* </CardFooter> */}
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4" className="mb-3">
                        <Card className="card-user mb-0">
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
                                            src={animi3}
                                        />
                                        <h5 className="title">{user?.user_name}</h5>
                                    </a>
                                    <p className="description">{user?.email}</p>
                                    {user?.phone !== "" && <p className="description"><TiContacts size={20} /> {user?.phone ?? user?.phone}</p>}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default UserProfile;