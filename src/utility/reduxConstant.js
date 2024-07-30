const superAdminRole = "6694b16dc2bc754ae7c64e0a";
const companyAdminRole = "6694b643c788405b9fcafbe1";

/* Used for datatable display entries */
const defaultPerPageRow = 10;

const perPageRowItems = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
];
/* /Used for datatable display entries */

/* Role */
const roleItem = {
    _id: "",
    name: "",
    group: "",
    status: 1,
    deletedAt: null
}
/* /Role */

/* /User */
const userItem = {
    id: null,
    name: "",
    email: "",
};
const profileItem = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    user_name: "",
}

const initialConnectionValue = {
    type: '',
    ip_address: '',
    port: '',
    username: '',
    password: ''
}

export {
    superAdminRole,
    companyAdminRole,
    defaultPerPageRow,
    perPageRowItems,

    roleItem,
    userItem,
    profileItem,
    initialConnectionValue
}
