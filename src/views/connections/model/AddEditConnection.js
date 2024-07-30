import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Form as BootstrapForm, Row, Col, InputGroup } from 'react-bootstrap';
import { createConnection, updateConnection } from '../store';
import { useDispatch } from 'react-redux';

// Validation schema using Yup
const validationSchema = Yup.object({
    type: Yup.string().required('Connection Type is required'),
    ip_address: Yup.string().required('IP Address Address is required'),
    port: Yup.string().required('Port is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

const ConnectionProfileForm = ({ show, closePopup, initialValues, title }) => {
    const dispatch = useDispatch()
    const [passwordShown, setPasswordShown] = useState(true)

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }
    const onSubmit = (values) => {
        if (title === 'Add Connection') {
            dispatch(createConnection(values))
        }
        if (title === 'Edit Connection') {
            dispatch(updateConnection(values))
        }
        closePopup()
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
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form>
                            <Row className="mb-2">
                                <Col md={12}>
                                    <BootstrapForm.Group controlId="formGridCompanyName">
                                        <BootstrapForm.Label>Type</BootstrapForm.Label>
                                        <Field type="text" name="type" className="form-control" />
                                        <ErrorMessage name="type" component="div" className="text-danger" />
                                    </BootstrapForm.Group>
                                </Col>

                            </Row>
                            <Row className="mb-2">
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridContactNumber">
                                        <BootstrapForm.Label>IP Address</BootstrapForm.Label>
                                        <Field type="text" name="ip_address" className="form-control" />
                                        <ErrorMessage name="ip_address" component="div" className="text-danger" />
                                    </BootstrapForm.Group>
                                </Col>
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridEmailAddress">
                                        <BootstrapForm.Label>Port</BootstrapForm.Label>
                                        <Field type="text" name="port" className="form-control" />
                                        <ErrorMessage name="port" component="div" className="text-danger" />
                                    </BootstrapForm.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={6}>
                                    <BootstrapForm.Group controlId="formGridContactNumber">
                                        <BootstrapForm.Label>Username</BootstrapForm.Label>
                                        <Field type="text" name="username" className="form-control" />
                                        <ErrorMessage name="username" component="div" className="text-danger" />
                                    </BootstrapForm.Group>
                                </Col>
                                <Col md={6}>
                                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                                    <div className="position-relative">
                                        <InputGroup className="mb-0">
                                            <Field className="form-control" type={passwordShown ? "text" : "password"} name="password" />
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
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                </Col>
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

export default ConnectionProfileForm;
