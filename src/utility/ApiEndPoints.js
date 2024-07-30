export const API_ENDPOINTS = {
  auth: {
    login: `/v1/users/login`,
    profile: `/v1/user/profile`,
    changepassword: `/v1/users/changePassword`,
    get: `v1/users/profile`,
    role: `/v1/auth/role`,
    rolePermission: `/v1/auth/role-permission`,
    verifyemail: `/v1/users/forgotpassword`,
    verifyotp: `/v1/users/verifyotp`,
    resetpassword: `/v1/users/resetpassword`,
  },
  customer: {
    listing: `/v1/users`,
    create: `/v1/users`,
    edit: `/v1/users`,
    update: `/v1/users`,
    delete: `/v1/users`
  },
  role: {
    get: `/v1/roles`,
    listing: `/v1/roles`,
    create: `/v1/roles`,
    update: `/v1/roles`,
    delete: `/v1/roles`
  },
  permission: {
    create: `/v1/permissions`,
    update: `/v1/permissions`,
    rolePermission: `/v1/role-permissions`
  },
  company: {
    listing: `/v1/company`,
    edit: `/v1/company`,
    create: `/v1/company`,
    update: `/v1/company`,
    delete: `/v1/company`,
    emailunique: '/v1/users/isemailunique',
    userunique: '/v1/users/isusernameunique'
  },
  Connection: {
    listing: `/v1/connections`,
    create: `/v1/connection`,
    update: `/v1/connection`,
    delete: `/v1/connection`,
    edit: `/v1/connection`
  }
}