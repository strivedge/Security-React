// ** React Imports
import React, { useState, useCallback, useEffect, useLayoutEffect, Fragment } from 'react';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import {
    getConnectionList,
    editConnectionRequest,
    cleanConnectionMessage,
    deleteConnection
} from './store';

// ** Reactstrap Imports
import {
    Col,
    Row,
    Card,
    CardBody,
    InputGroup
} from 'reactstrap';

// ** Custom Components
import DatatablePagination from 'components/DatatablePagination';
import Swal from 'sweetalert2';
import { defaultPerPageRow } from 'utility/reduxConstant';
import ConnectionProfileForm from './model/AddEditConnection';
import ReactSnackBar from "react-js-snackbar";
import { TiMessages, TiEdit, TiTrash } from "react-icons/ti";

const ConnectionProfileList = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.connection);

    const [openModel, setOpenModel] = useState(false);
    const [title, setTitle] = useState('Add Connection');
    const [loadFirst, setLoadFirst] = useState(true);

    /* Pagination */
    const [sort, setSort] = useState("desc");
    const [sortColumn, setSortColumn] = useState("_id");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(defaultPerPageRow);
    const [isEdited, setIsEdited] = useState(false)
    const [searchInput, setSearchInput] = useState('');

    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")

    const handleConnectionLists = useCallback((sorting = sort,
        sortCol = sortColumn, page = currentPage, perPage = rowsPerPage, search = searchInput) => {
        dispatch(getConnectionList({
            sort: sorting,
            sortColumn: sortCol,
            page,
            limit: perPage,
            search: search,
        }));
    }, [sort, sortColumn, currentPage, rowsPerPage, searchInput, dispatch])

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection);
        setSortColumn(column.sortField);
        handleConnectionLists(sortDirection, column.sortField, currentPage)
    }

    const handlePagination = (page) => {
        setCurrentPage(page + 1);
        handleConnectionLists(sort, sortColumn, page + 1)
    }
    const onSearchKey = (value) => {
        setSearchInput(value);
        handleConnectionLists(sort, sortColumn, currentPage, rowsPerPage, value)
    }
    const handlePerPage = (value) => {
        setRowsPerPage(value);
        handleConnectionLists(sort, sortColumn, currentPage, value, searchInput)
    };

    useLayoutEffect(() => {
        if (loadFirst) {
            handleConnectionLists();
            setLoadFirst(false)
        }
    }, [handleConnectionLists, loadFirst, dispatch])

    useEffect(() => {
        if (store.actionFlag === "CONNECTION_CREATED" || store.actionFlag === "Connection_UPDATED") {
            handleConnectionLists()
        }
    }, [handleConnectionLists, store.actionFlag])

    useEffect(() => {
        if (store.success) {
            setshowSnackbar(true)
            setSnakbarMessage(store.success)
        }
        if (store.error) {
            setshowSnackbar(true)
            setSnakbarMessage(store.error)
        }
    }, [store.error, store.success])

    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
            setSnakbarMessage('')
        }, 6000);
    }, [showSnackBar])

    const AddConnection = () => {
        setIsEdited(() => false)
        dispatch(cleanConnectionMessage());
        setOpenModel(true);
        setTitle('Add Connection');
    }

    const EditConnection = (id) => {
        const query = { id: id }
        setIsEdited(() => true)
        dispatch(editConnectionRequest(query));
        setOpenModel(true);
        setTitle('Edit Connection');
    }

    const deleteProfile = async (id) => {
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
                // Perform delete action here, e.g., call an API to delete the user
                await dispatch(deleteConnection(id));
                Swal.fire(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                );
                // Refresh user list or update UI as needed
                setLoadFirst(true)
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the user.',
                    'error'
                );
            }
        }
    };

    const closePopup = () => {
        setOpenModel(() => false);
    };

    const columns = [
        {
            name: 'Name',
            sortField: "type",
            sortable: true,
            selector: (row) => row?.type || ""
        },
        {
            name: 'Username',
            sortField: "username",
            sortable: true,
            selector: (row) => row?.username || ""
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <Fragment>
                    <TiEdit size={20} color="#fff" cursor="pointer" onClick={() => EditConnection(row?._id)} className='mr-1' />
                    <TiTrash size={20} color="#fff" cursor="pointer" onClick={() => deleteProfile(row?._id)} />
                </Fragment>
            )
        }
    ];
    return (
        <div className="content data-list">
            {showSnackBar && <ReactSnackBar Icon={<span><TiMessages size={25} /></span>} Show={showSnackBar}>
                {snakebarMessage}
            </ReactSnackBar>}
            <Row>
                <Card className="col-md-10 ml-auto mr-auto tbl-height-container">
                    <div className="d-flex justify-content-between p-0 border-bottom card-header">
                        <h3 className="card-title">Connections List</h3>
                    </div>
                    <CardBody>
                        <Row className="mt-2">
                            <Col xs="6">
                                <InputGroup>
                                    <input className="form-control " type="search" placeholder="Search" aria-label="Search" value={searchInput} onChange={(e) => onSearchKey(e.target.value)} />
                                    <span className="edit2-icons position-absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </span>
                                </InputGroup>
                            </Col>
                            <Col xs="6" className='text-right'>
                                <button onClick={() => AddConnection()} className="btn btn-primary" type="button">Add Connection</button>
                            </Col>
                        </Row>
                        <Row className="userManagement mt-3">
                            <Col className="pb-2" md="12">
                                <DatatablePagination
                                    data={store.ConnectionItems}
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

            {openModel && (<ConnectionProfileForm show={openModel} closePopup={closePopup} title={title} initialValues={isEdited ? store.ConnectionItem : store.addConnectionItem} />)}
        </div>
    );
};

export default ConnectionProfileList;