/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Card,
    CardBody,
    Col,
    Row,
    InputGroup
} from "reactstrap";
import ReactSnackBar from "react-js-snackbar";
import { TiMessages, TiEdit, TiTrash } from "react-icons/ti";
import { useEffect, useState, Fragment, useCallback, useLayoutEffect } from 'react';
import { getActionRequest, editActionRequest, cleanMessage, deleteActionRequest } from './store';
import { useSelector, useDispatch } from "react-redux";
import AddUser from "./model/AddUserModel";
import Swal from 'sweetalert2';
import DatatablePagination from "components/DatatablePagination";
import { defaultPerPageRow } from "utility/reduxConstant";

const UserManagement = () => {

    const dispatch = useDispatch()
    const store = useSelector((state) => state.user);
    const [openModel, setOpenModel] = useState(false)
    const [userData, setUserData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [title, setTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("desc");
    const [sortColumn, setSortColumn] = useState("_id");
    const [rowsPerPage, setRowsPerPage] = useState(defaultPerPageRow);

    const handleUsersLists = useCallback((sorting = sort,
        sortCol = sortColumn, page = currentPage, perPage = rowsPerPage, search = searchInput) => {
        dispatch(getActionRequest({
            sort: sorting,
            sortColumn: sortCol,
            page,
            limit: perPage,
            search: search
        }));
    }, [sort, sortColumn, currentPage, rowsPerPage, searchInput, dispatch])

    useLayoutEffect(() => {
        handleUsersLists();
    }, [handleUsersLists, dispatch])

    useEffect(() => {
        if (store?.customerItem) {
            setUserData(() => store?.customerItem)
        }

        if (store.success) {
            handleUsersLists();
            setshowSnackbar(true);
            setSnakbarMessage(store.success);
        }

        if (store.error) {
            setshowSnackbar(true);
            setSnakbarMessage(store.error);
        }
    }, [handleUsersLists, store])

    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
        }, 6000);
    }, [showSnackBar])

    const onSearchKey = (value) => {
        setSearchInput(value);
        handleUsersLists(sort, sortColumn, currentPage, rowsPerPage, value)
    }

    const handlePagination = (page) => {
        setCurrentPage(page + 1);
        handleUsersLists(sort, sortColumn, page + 1, rowsPerPage, searchInput)
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection);
        setSortColumn(column.sortField);
        handleUsersLists(sortDirection, column.sortField, currentPage, rowsPerPage, searchInput)
    }

    const handlePerPage = (value) => {
        setRowsPerPage(value);
        handleUsersLists(sort, sortColumn, currentPage, value, searchInput)
    };

    const closePopup = () => {
        setOpenModel(() => false);
    };
    const getUserData = async (id) => {
        const query = { id: id }
        await dispatch(editActionRequest(query))
    }
    const addUser = () => {
        dispatch(cleanMessage())
        setTitle("Add User");
        setIsEditing(false)
        setOpenModel(() => true);
    }
    const editUser = async (id) => {
        await getUserData(id)
        setTitle("Edit User");
        setIsEditing(true)
        setOpenModel(() => true);
    }

    const deleteUser = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await dispatch(deleteActionRequest(id));
                Swal.fire(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the user.',
                    'error'
                );
            }
        }
    };

    const columns = [
        {
            name: 'Name',
            sortField: "first_name",
            sortable: true,
            cell: (row) => (
                <div className="text-break">
                    {`${row?.first_name ?? ""} ${row?.last_name ?? ""}`.trim()}
                </div>
            )
        },
        {
            name: 'Email',
            sortField: "email",
            sortable: true,
            cell: (row) => (
                <div className="text-break">
                    {row?.email || ""}
                </div>
            )
        },
        {
            name: 'Username',
            sortField: "user_name",
            sortable: true,
            selector: (row) => row?.user_name || ""
        },
        {
            name: 'Status',
            center: true,
            selector: (row) => <input type="checkbox" id="isActive" defaultChecked={row?.is_active} disabled />
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <Fragment>
                    <TiEdit size={20} cursor="pointer" onClick={() => editUser(row?._id)} />
                    <TiTrash size={20} cursor="pointer" onClick={() => deleteUser(row?._id)} />
                </Fragment>
            )
        }
    ];

    return (
        <div className="content data-list">
            <div className='container-fluid'>
                {showSnackBar && <ReactSnackBar Icon={<span><TiMessages size={25} /></span>} Show={showSnackBar}>
                    {snakebarMessage}
                </ReactSnackBar>}
                <Row className='row-row'>
                    <Card className="col-xl-10 ml-auto mr-auto tbl-height-container">
                        <div className="d-flex justify-content-between p-0 border-bottom card-header">
                            <h3 className="card-title">Users List</h3>
                        </div>
                        <CardBody className='pl-0 pr-0'>
                            <Row className="mt-2">
                                <Col sm="6">
                                    <InputGroup>
                                        <input className="form-control " type="search" placeholder="Search" aria-label="Search" value={searchInput} onChange={(event) => onSearchKey(event?.target?.value)} />
                                        <span className="edit2-icons position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </span>
                                    </InputGroup>
                                </Col>
                                <Col sm="6" className='text-right my-2'>
                                    <button onClick={() => addUser()} className="btn btn-primary" type="button">Add User</button>
                                </Col>
                            </Row>
                            <Row className="userManagement mt-3">
                                <Col className="pb-2" md="12">
                                    <DatatablePagination
                                        data={userData}
                                        columns={columns}
                                        pagination={store?.pagination}
                                        handleSort={handleSort}
                                        handlePagination={handlePagination}
                                        handleRowPerPage={handlePerPage}
                                        rowsPerPage={rowsPerPage}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </div>
            {openModel && < AddUser lgshow={openModel} closePopup={closePopup} title={title} initialValues={store.editItem} isEditing={isEditing} />}
        </div>
    )
}
export default UserManagement;