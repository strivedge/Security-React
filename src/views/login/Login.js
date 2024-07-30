/* eslint-disable jsx-a11y/anchor-is-valid */

// ** React Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { login, cleanAuthMessage } from './store';
import { Link } from 'react-router-dom';
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Button,
    CardBody,
    Container,
    CardFooter,
    InputGroup,
    FormFeedback,
    InputGroupText,
    InputGroupAddon,
} from "reactstrap";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// ** Third Party Components
import classnames from "classnames";
import ReactSnackBar from "react-js-snackbar";
import { TiMessages } from "react-icons/ti";

import 'assets/css/AdminControl.css';
import securliLogo from "assets/img/securli-logo.png";
import reactLogo from "assets/img/react-logo.png";
const isSecurli = process.env?.REACT_APP_COM === 'sec';
const logo = isSecurli ? securliLogo : reactLogo;

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.login);

    const [state, setState] = useState({});
    const [showSnackBar, setshowSnackbar] = useState(false);
    const [SnackMessage, setSnackMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        user_name: Yup.string().required('Username is required!'),
        password: Yup.string().required('Password is required!'),
    });

    // Initial form values
    const initialValues = {
        user_name: '',
        password: ''
    };

    useEffect(() => {
        if (store?.actionFlag === "LOGGED") {
            navigate(`/admin/dashboard`);
        }

        if (store?.actionFlag || store?.success || store?.error) {
            dispatch(cleanAuthMessage());
        }

        if (store?.success) {
            setshowSnackbar(true);
            setSnackMessage(store.success);
        }

        if (store?.error) {
            setshowSnackbar(true);
            setSnackMessage(store.error);
        }
    }, [store.actionFlag, store.success, store.error, navigate, dispatch])

    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
        }, 6000);
    }, [showSnackBar])

    // Form submit handler
    const onSubmit = (values, { setSubmitting }) => {
        // Example of what you might do with the form values
        dispatch(login(values));
        // You can make API calls, validate credentials, etc.
        setSubmitting(false);
    };

    return (
        <div className="content login">
            <ReactSnackBar Icon={(
                <span><TiMessages size={25} /></span>
            )} Show={showSnackBar}>
                {SnackMessage}
            </ReactSnackBar>

            <Container className='h-100'>
                <Row className='align-items-center justify-content-center h-100'>
                    <Col className="ml-auto mr-auto" lg={4} md={6}>
                        <img
                            alt="..."
                            src={logo}
                            style={{ padding: "40px 40px 40px" }}
                        />

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ errors, touched, values, isSubmitting, setFieldValue }) => (
                                <Form className="form">
                                    <Card className="card-login">
                                        <CardBody className='p-0'>
                                            <InputGroup
                                                className={classnames({
                                                    "input-group-focus": state?.emailFocus,
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend" style={{ padding: '3px 0px' }}>
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-single-02" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    name="user_name"
                                                    value={values.user_name}
                                                    placeholder="User Name"
                                                    onInput={(event) => setFieldValue(event?.target?.name, event?.target?.value)}
                                                    onFocus={(e) => setState({ ...state, emailFocus: true })}
                                                    onBlur={(e) => setState({ ...state, emailFocus: false })}
                                                />
                                            </InputGroup>
                                            {errors.user_name && touched.user_name ? (
                                                <FormFeedback className="d-block p-0">
                                                    {errors.user_name}
                                                </FormFeedback>
                                            ) : null}

                                            <InputGroup
                                                className={classnames({
                                                    "input-eyes": true,
                                                    "input-group-focus": state?.passFocus,
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend" style={{ padding: '3px 0px' }}>
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-lock-circle" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="password"
                                                    autoComplete="off"
                                                    placeholder="Password"
                                                    value={values.password}
                                                    type={passwordShown ? "text" : "password"}
                                                    onInput={(event) => setFieldValue(event?.target?.name, event?.target?.value)}
                                                    onFocus={(e) => setState({ ...state, passFocus: true })}
                                                    onBlur={(e) => setState({ ...state, passFocus: false })}
                                                />
                                                <InputGroupText className='input-eyes-text'>
                                                    <a onClick={togglePasswordVisiblity}>
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
                                                </InputGroupText>
                                            </InputGroup>
                                            {errors.password && touched.password ? (
                                                <FormFeedback className="d-block p-0">
                                                    {errors.password}
                                                </FormFeedback>
                                            ) : null}
                                        </CardBody>

                                        <CardFooter>
                                            <Link to={`/forgot-passowrd`} className='forget-link'>Forgot Password ?</Link>
                                            <Button
                                                block
                                                size="lg"
                                                color="primary"
                                                disabled={isSubmitting}
                                            >
                                                {store?.loading ? "Login" : "Loading..."}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginForm;
