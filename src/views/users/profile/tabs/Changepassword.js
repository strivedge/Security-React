import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Input, Button } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updatePassword } from 'views/login/store';
import { useDispatch, useSelector } from 'react-redux';
import ReactSnackBar from "react-js-snackbar";
import { TiMessages } from "react-icons/ti";
import * as Yup from 'yup';

const ChangePassword = () => {

    const dispatch = useDispatch();
    const loginStore = useSelector((state) => state.login);

    const validationSchema = Yup.object().shape({
        old_password: Yup.string()
            .required('Old Password is required'),
        password: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")
    const [initialValues, setInitialValues] = useState({ old_password: '', password: '', confirmPassword: '' })

    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    useEffect(() => {
        if (loginStore?.actionFlag === 'PASSWORD_UPDATED' && loginStore.success) {
            setshowSnackbar(true)
            setSnakbarMessage(loginStore.success)
            setInitialValues({ old_password: '', password: '', confirmPassword: '' })

        }
        if (loginStore?.actionFlag === 'PASSWORD_UPDATED' && loginStore.error) {
            setshowSnackbar(true)
            setSnakbarMessage(loginStore.error)
            setInitialValues({ old_password: '', password: '', confirmPassword: '' })

        }
    }, [loginStore.success, loginStore.error, initialValues, loginStore?.actionFlag])

    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
        }, 6000);
    }, [showSnackBar])

    const onSubmit = (values) => {
        dispatch(updatePassword(values))

    }

    return (
        <div className="content">
            {showSnackBar && <ReactSnackBar Icon={<span><TiMessages size={25} /></span>} Show={showSnackBar}>
                {snakebarMessage}
            </ReactSnackBar>}
            <Row>
                <Col md="12" className="mb-3">
                    <Card className="mb-0">
                        <div className="p-0 card-header">
                            <h3 className="card-title border-bottom pb-2 mt-0">Change Password</h3>
                        </div>
                        <CardBody className="pl-0 pr-0">
                            <Formik
                                onSubmit={onSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {() => (
                                    <Form>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Old Password</label>
                                                    <div className="input-group">
                                                        <Field
                                                            name="old_password"
                                                            placeholder="Old Password"
                                                            type={oldPasswordVisible ? 'text' : 'password'}
                                                            as={Input}
                                                        />
                                                        <div className="input-group-append">
                                                            <Button type="button" onClick={toggleOldPasswordVisibility}>
                                                                {oldPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <ErrorMessage name="old_password" component="span" style={{ color: 'red' }} />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>New Password</label>
                                                    <div className="input-group">
                                                        <Field
                                                            name="password"
                                                            placeholder="New Password"
                                                            type={newPasswordVisible ? 'text' : 'password'}
                                                            as={Input}
                                                        />
                                                        <div className="input-group-append">
                                                            <Button type="button" onClick={toggleNewPasswordVisibility}>
                                                                {newPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <ErrorMessage name="password" component="span" style={{ color: 'red' }} />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Confirm Password</label>
                                                    <div className="input-group">
                                                        <Field
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            type={confirmPasswordVisible ? 'text' : 'password'}
                                                            as={Input}
                                                        />
                                                        <div className="input-group-append">
                                                            <Button type="button" onClick={toggleConfirmPasswordVisibility}>
                                                                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <ErrorMessage name="confirmPassword" component="span" style={{ color: 'red' }} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button className="btn-fill" color="primary" type="submit">
                                            Change Password
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ChangePassword;
