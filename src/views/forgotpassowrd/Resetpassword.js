/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Input, Button, Container, InputGroup, InputGroupAddon, InputGroupText, FormFeedback, CardFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import { resetPassword, cleanAuthMessage } from 'views/login/store';
import { useDispatch, useSelector } from 'react-redux';
import ReactSnackBar from "react-js-snackbar";
import { TiMessages } from "react-icons/ti";
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from "classnames";

import securliLogo from "assets/img/securli-logo.png";
import reactLogo from "assets/img/react-logo.png";
const isSecurli = process.env?.REACT_APP_COM === 'sec';
const logo = isSecurli ? securliLogo : reactLogo;

const ResetPassword = () => {
    const { token } = useParams()
    console.log(token, 'here is token')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginStore = useSelector((state) => state.login);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const [state, setState] = useState({});
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")
    const [initialValues] = useState({ password: "", confirmPassword: "" })

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    useEffect(() => {
        if (loginStore?.actionFlag || loginStore?.success || loginStore?.error) {
            dispatch(cleanAuthMessage());
        }

        if (loginStore?.actionFlag === 'RESET_PASSWORD' && loginStore.success) {
            setshowSnackbar(true);
            setSnakbarMessage(loginStore.success);
        }

        if (loginStore?.actionFlag === 'RESET_PASSWORD' && loginStore.error) {
            setshowSnackbar(true);
            setSnakbarMessage(loginStore.error);
        }
    }, [loginStore.success, loginStore.error, loginStore?.actionFlag, navigate, dispatch])

    useEffect(() => {
        if (loginStore?.actionFlag === 'RESET_PASSWORD' && loginStore.success) {
            setTimeout(() => {
                setshowSnackbar(false);
                navigate('/');
            }, 6000);
        }
    }, [showSnackBar, loginStore?.actionFlag, loginStore.success, navigate])

    const onSubmit = (values) => {
        const payload = { password: values.password, token: token }
        dispatch(resetPassword(payload))
    }

    return (
        <div className="content login">
            {showSnackBar && <ReactSnackBar Icon={<span><TiMessages size={25} /></span>} Show={showSnackBar}>
                {snakebarMessage}
            </ReactSnackBar>}
            <Container className='h-100'>
                <Row className='align-items-center justify-content-center h-100'>
                    <Col className="ml-auto mr-auto" lg={4} md={6}>
                        <img
                            alt="..."
                            src={logo}
                            style={{ padding: "40px 40px 40px" }}
                        />

                        <Formik
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            {({ errors, touched, values, setFieldValue }) => (
                                <Form>
                                    <Card className="card-login">
                                        <CardBody className='p-0'>
                                            <div className="card-title border-bottom pb-2 mt-0 text-md">Reset Password</div>
                                            <InputGroup
                                                className={classnames({
                                                    "input-eyes": true,
                                                    "input-group-focus": state?.passFocus
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
                                                    placeholder="New Password"
                                                    value={values.password}
                                                    type={newPasswordVisible ? "text" : "password"}
                                                    onInput={(event) => setFieldValue(event?.target?.name, event?.target?.value)}
                                                    onFocus={(e) => setState({ ...state, passFocus: true })}
                                                    onBlur={(e) => setState({ ...state, passFocus: false })}
                                                />
                                                <InputGroupText className='input-eyes-text'>
                                                    <a onClick={toggleNewPasswordVisibility}>
                                                        {newPasswordVisible ? (
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

                                            <InputGroup
                                                className={classnames({
                                                    "input-eyes": true,
                                                    "input-group-focus": state?.newPassFocus
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend" style={{ padding: '3px 0px' }}>
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-lock-circle" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    autoComplete="off"
                                                    name="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    value={values.confirmPassword}
                                                    type={confirmPasswordVisible ? "text" : "password"}
                                                    onInput={(event) => setFieldValue(event?.target?.name, event?.target?.value)}
                                                    onFocus={(e) => setState({ ...state, newPassFocus: true })}
                                                    onBlur={(e) => setState({ ...state, newPassFocus: false })}
                                                />
                                                <InputGroupText className='input-eyes-text'>
                                                    <a onClick={toggleConfirmPasswordVisibility}>
                                                        {confirmPasswordVisible ? (
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
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <FormFeedback className="d-block p-0">
                                                    {errors.confirmPassword}
                                                </FormFeedback>
                                            ) : null}
                                        </CardBody>

                                        <CardFooter>

                                            <Button
                                                block
                                                size="lg"
                                                className="btn-fill" color="primary" type="submit">
                                                Reset Password
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Form>
                            )}
                        </Formik>
                    </Col >
                </Row>
            </Container>
        </div >
    );
};

export default ResetPassword;
