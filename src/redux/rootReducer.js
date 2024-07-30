// ** Reducers Imports
import login from '../views/login/store/index.js';
import user from '../views/users/store/index.js';
import roles from "../views/roles/store/index.js";
import company from "../views/companies/store/index.js";
import connection from "../views/connections/store/index.js";

const rootReducer = {
    login,
    user,
    roles,
    company,
    connection
}

export default rootReducer
