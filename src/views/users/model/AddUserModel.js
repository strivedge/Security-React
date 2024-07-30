import React, { useEffect, useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Row, Col, Form as BootstrapForm, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getRoleList } from '../../roles/store/index';
import { creatActionRequest, updateActionRequest } from '../store';
import { isUserUniqueAction, isEmailUniqueAction } from '../../companies/store/index';
import { getCompanyList } from '../../companies/store/index';
import '../../../assets/admincss/AdminControl.css'
import Select from "react-select";


const AddUser = ({ lgshow, closePopup, title, initialValues, isEditing }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.roles);
    const companyStore = useSelector((state) => state.company)
    const [passwordShown, setPasswordShown] = useState(true)
    const [roleData, setRoleData] = useState([])
    const [loadFirst, setLoadFirst] = useState(true)
    const [roleValue, setRoleValue] = useState(initialValues?.role_id ? { label: initialValues?.role_id?.name, value: initialValues?.role_id?._id } : "")
    const [errMessage, setErrMessage] = useState("")
    const [userErrMessage, setUserErrMessage] = useState("")

    useEffect(() => {
        if (loadFirst && roleData.length === 0) {
            dispatch(getRoleList());
            dispatch(getCompanyList())
            setLoadFirst(false);
        }
    }, [loadFirst, dispatch]);

    const handleUserChange = useCallback(
        async (event, validateField, values) => {
            const { name, value } = event.target;
            const payload = {
                user_name: value
            }
            const Editpayload = {
                user_name: value,
                _id: initialValues?._id
            }
            await validateField(name);
            const errors = await validationSchema.validateAt(name, values).catch(err => err);

            if (!errors || !errors.message) {
                if (title === 'Add User') {
                    dispatch(isUserUniqueAction(payload))
                }
                if (title === 'Edit User') {
                    dispatch(isUserUniqueAction(Editpayload))
                }
            }
            // if (user_name) { dispatch(isUserUniqueAction(payload)); }

        },
        [dispatch]
    );

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
                if (title === 'Add User') {
                    dispatch(isEmailUniqueAction(payload))
                }
                if (title === 'Edit User') {
                    dispatch(isEmailUniqueAction(Editpayload))
                }
            }
        },
        [dispatch, initialValues, title]
    );
    useEffect(() => {
        if (companyStore.actionFlag === 'CHECK_EMIAL_IS_UNIQUE') {
            if (!companyStore.isEmailUnique) {
                setErrMessage("Email is not unique")
            }
            if (companyStore.isEmailUnique) {
                setErrMessage("")
            }

        }
        if (companyStore.actionFlag === 'CHECK_USER_IS_UNIQUE') {
            if (!companyStore.isUserUnique) {
                setUserErrMessage("User is not unique")
            }
            if (companyStore.isUserUnique) {
                setUserErrMessage("")
            }
        }
    }, [companyStore])
    console.log(companyStore, 'loginstore')

    useEffect(() => {
        if (store?.roleItems?.length > 0 && roleData.length === 0) {
            let roleItemsList = [];
            roleItemsList = store?.roleItems.map((item) => {
                return {
                    value: item?._id,
                    label: item?.name,
                };
            });
            if (roleItemsList?.length > 0) {
                setRoleData(roleItemsList);
            }
        }
    }, [roleData, store?.roleItems])

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name Is Required'),
        last_name: Yup.string().required('Last Name Is Required'),
        email: Yup.string().email('Invalid email format').required('Email Is Required'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone Number Is Required'),
        user_name: Yup.string().required('Username Is Required').matches(/^\S*$/, 'Username should not contain spaces'),
        role_id: Yup.object()
            .shape({
                value: Yup.string().required('Role ID is required'),
                label: Yup.string().required('Role label is required') // Adjust if your select option has different properties
            })
            .required('Role is required')
    });
    const handleClose = () => {
        closePopup()
    };
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    const onSubmit = (values) => {
        if (isEditing) {
            const payload = {
                _id: values?._id,
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
                user_name: values.user_name,
                password: values?.password,
                role_id: values.role_id?.value,
                company_id: values.company_id?.value
            }
            dispatch(updateActionRequest(payload))
        }
        else {
            const payload = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
                user_name: values.user_name,
                password: values?.password,
                role_id: values.role_id?.value,
                company_id: values.company_id?.value
            }
            dispatch(creatActionRequest(payload))
        }
        closePopup()
    };

    const customStyles = {
        option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isFocused ? "#27293d" : isSelected ? "#27293d" : "transparent",
            color: isFocused || isSelected ? "#fff" : "#fff",
            "&:hover": {
                backgroundColor: "#27293d",
                color: "#000"
            }
        }),
        singleValue: (base, { isSelected }) => ({
            ...base,
            color: "#000",
            backgroundColor: isSelected ? "#27293d" : "transparent", // Change this to the color you want for the selected value
        }),
        control: (base, { isSelected }) => ({
            ...base,
            backgroundColor: isSelected ? "#27293d" : "transparent",  // Change this to the color you want for the dropdown background
            color: "rgba(255, 255, 255, 0.8)"  // Change this to the color you want for the control text color
        })
    };


    return (
        <>
            <Modal className="UpdateUserPopup" size="lg" show={lgshow} aria-labelledby="example-modal-sizes-title-lg" centered>
                <Modal.Header>
                    <span className='modal-title border-bottom col-sm-12 ' id="example-modal-sizes-title-lg">
                        <h3 className='border-bottom pb-2 mb-0 mt-0'>{title}</h3>
                    </span>
                    <button type="button" className='Close-button' onClick={handleClose}>×</button>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ validateField, values, setFieldValue, errors }) => (
                            <Form>
                                <Row className="mb-2">
                                    <Col as={BootstrapForm.Group} controlId="formGridFirstName">
                                        <BootstrapForm.Label>First Name</BootstrapForm.Label>
                                        <Field className="form-control" type="text" name="first_name" placeholder="First Name" />
                                        <ErrorMessage name="first_name" component="div" style={{ color: 'red' }} />
                                    </Col>
                                    <Col as={BootstrapForm.Group} controlId="formGridLastName">
                                        <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                                        <Field className="form-control" type="text" name="last_name" placeholder="Last Name" />
                                        <ErrorMessage name="last_name" component="span" style={{ color: 'red' }} />
                                    </Col>
                                </Row>
                                {console.log(errors)}
                                <Row className="mb-2">
                                    <Col as={BootstrapForm.Group} controlId="formGridEmail">
                                        <BootstrapForm.Label>Email</BootstrapForm.Label>
                                        <Field className="form-control" type="email" name="email" placeholder="Enter email" onBlur={(e) => handleEmailChange(e, validateField, values)} />
                                        <ErrorMessage name="email" component="span" style={{ color: 'red' }} />
                                        {errMessage !== "" && <div className="text-danger">{errMessage}</div>}
                                    </Col>
                                    <Col as={BootstrapForm.Group} controlId="formGridPhone">
                                        <BootstrapForm.Label>Phone</BootstrapForm.Label>
                                        <Field className="form-control" type="text" name="phone" placeholder="Enter Phone" />
                                        <div><small>*Phone number must be 10 digits</small></div>
                                        <ErrorMessage name="phone" component="span" style={{ color: 'red' }} />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col as={BootstrapForm.Group} controlId="formGridUserName">
                                        <BootstrapForm.Label>User Name</BootstrapForm.Label>
                                        <Field className="form-control" type="text" name="user_name" placeholder="Enter User Name" onBlur={(event) => handleUserChange(event, validateField, values)} />
                                        <ErrorMessage name="user_name" component="div" style={{ color: 'red' }} />
                                        {userErrMessage !== "" && <div className="text-danger">{userErrMessage}</div>}
                                    </Col>
                                    <Col as={BootstrapForm.Group} controlId="formGridPassword">
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
                                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col as={BootstrapForm.Group} controlId="formGridRole">
                                        <BootstrapForm.Label>Role</BootstrapForm.Label>
                                        {roleData && (
                                            <Select
                                                name="role_id"
                                                className="select-dropdown"
                                                styles={customStyles}
                                                value={roleValue}
                                                options={roleData}
                                                onChange={(roleVal) => { setFieldValue("role_id", roleVal); setRoleValue(roleVal) }}
                                                classNamePrefix="select Role"
                                            />)}
                                        {/* <ErrorMessage name="role_id" component="div" style={{ color: 'red' }} /> */}
                                        {errors?.role_id?.value && <div style={{ color: 'red' }}>{errors?.role_id?.value}</div>}
                                    </Col>
                                </Row>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddUser;