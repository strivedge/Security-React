// ** React Imports
import React, { useState, useCallback, useEffect, useLayoutEffect, Fragment } from 'react';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import {
    getCompanyList,
    editActionRequest,
    cleanCompanyMessage,
    deleteActionRequest
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

// ** Third Party Components
import Swal from 'sweetalert2';
import ReactSnackBar from "react-js-snackbar";
import { TiMessages, TiEdit, TiTrash } from "react-icons/ti";

import CompanyProfileForm from './model/AddEditCompany';

import CompanyLogo from "assets/img/default_company.jpg";

const CompanyProfileList = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.company);

    const [openModel, setOpenModel] = useState(false);
    const [title, setTitle] = useState('Add Company');

    const [showSnackBar, setshowSnackbar] = useState(false)
    const [snakebarMessage, setSnakbarMessage] = useState("")

    /* Pagination */
    const [sort, setSort] = useState("desc");
    const [sortColumn, setSortColumn] = useState("_id");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPageSize] = useState(10);
    const [isEdited, setIsEdited] = useState(false)
    const [searchInput, setSearchInput] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(selectedPageSize);


    const handleCompanyLists = useCallback((sorting = sort,
        sortCol = sortColumn, page = currentPage, perPage = rowsPerPage, search = searchInput) => {
        dispatch(getCompanyList({
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
        handleCompanyLists(sortDirection, column.sortField, currentPage)
    }

    const handlePagination = (page) => {
        setCurrentPage(page + 1);
        handleCompanyLists(sort, sortColumn, page + 1)
    }
    const onSearchKey = (value) => {
        setSearchInput(value);
        handleCompanyLists(sort, sortColumn, currentPage, rowsPerPage, value)
    }

    useLayoutEffect(() => {
        handleCompanyLists();
    }, [handleCompanyLists, dispatch])

    useEffect(() => {
        if (store?.actionFlag === "CREAT" || store?.actionFlag === "COMPANY_UPDATED" || store?.actionFlag === "COMPANY_DELETED") {
            handleCompanyLists();
        }
    }, [handleCompanyLists, store.actionFlag])

    useEffect(() => {
        if (store.success && store.actionFlag === "COMPANY_UPDATED") {
            setshowSnackbar(true)
            setSnakbarMessage(store.success)
        }

        if (store.error) {
            setshowSnackbar(true)
            setSnakbarMessage(store.error)
        }
    }, [handleCompanyLists, store.error, store.success, store.actionFlag])


    useEffect(() => {
        setTimeout(() => {
            setshowSnackbar(false);
        }, 6000);
    }, [showSnackBar])

    const AddCompany = () => {
        dispatch(cleanCompanyMessage());
        setOpenModel(true);
        setTitle('Add Company');
    }

    const EditCompany = (id) => {
        const query = { id: id }
        setIsEdited(true)
        dispatch(editActionRequest(query));
        setOpenModel(true);
        setTitle('Edit Company');
    }
    const handlePerPage = (value) => {
        setRowsPerPage(value);
        handleCompanyLists(sort, sortColumn, currentPage, value, searchInput)
    };

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
                await dispatch(deleteActionRequest(id));
                Swal.fire(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                );
                // Refresh user list or update UI as needed
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
            name: 'Logo',
            cell: (row) => (
                <img
                    src={`${process.env.REACT_APP_DEV_NET_API_HOSTNAME}/${row?.logo}` || CompanyLogo}
                    alt="Client Logo"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = CompanyLogo;
                    }}
                    style={{ maxHeight: 50, maxWidth: 50 }}
                />
            )
        },
        {
            name: 'Name',
            sortField: "name",
            sortable: true,
            selector: (row) => row?.name || ""
        },
        {
            name: 'Contact',
            sortField: "contact_no",
            sortable: true,
            selector: (row) => row?.contact_no || ""
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
            name: 'Action',
            center: true,
            cell: (row) => (
                <Fragment>
                    <TiEdit size={20} color="#fff" cursor="pointer" onClick={() => EditCompany(row?._id)} className='mr-1' />
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
            <div className='container-fluid'>
                <Row className='row-row'>
                    <Card className="col-xl-10 ml-auto mr-auto tbl-height-container">
                        <div className="d-flex justify-content-between p-0 border-bottom card-header">
                            <h3 className="card-title">Companies List</h3>
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
                                <Col sm="6" className='text-right'>
                                    <button onClick={() => AddCompany()} className="btn btn-primary my-2" type="button">Add Company</button>
                                </Col>
                            </Row>
                            <Row className="userManagement mt-3">
                                <Col className="pb-2" md="12">
                                    <DatatablePagination
                                        data={store.CompanyItems}
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

            {openModel && (<CompanyProfileForm show={openModel} closePopup={closePopup} title={title} initialValues={isEdited ? store.editItem : store?.addItem} />)}
        </div>
    );
};

export default CompanyProfileList;