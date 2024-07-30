// ** Module Imports
import Dashboard from "views/dashboard/Dashboard";
import UserManagement from "views/users";
import RoleManagement from "views/roles";
import CompanyManagement from "views/companies";
import ConnectionManagement from "views/connections";
import UserProfile from "views/users/profile";
import ModulePermission from "views/roles/ModulePermission";
import RiskAssessmentMethod from "views/ram";
import CompanyProfile from "views/companies/profile";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    mini: "D",
    icon: "tim-icons icon-chart-pie-36",
    layout: "/admin",
    component: (<Dashboard />)
  },
  {
    collapse: true,
    name: "Governance",
    mini: "Governance",
    icon: "tim-icons icon-bank",
    state: "GovernanceCollapse",
    permissionId: "governance",
    views: [
      {
        path: "/risk-assessment-method",
        name: "Risk Assessment Method",
        mini: "RAM",
        layout: "/admin",
        customClass: "",
        component: (<RiskAssessmentMethod />),
        permissionId: "risk-assessment-method"
      },
    ]
  },
  {
    collapse: true,
    name: "Master",
    mini: "Master",
    icon: "tim-icons icon-settings-gear-63",
    state: "MasterCollapse",
    permissionId: "master",
    views: [
      {
        path: "/roles",
        name: "Roles",
        mini: "RM",
        layout: "/admin",
        customClass: "",
        component: (<RoleManagement />),
        permissionId: "roles"
      },
      {
        path: "/roles/permission/:id",
        name: "Roles",
        mini: "RM",
        layout: "/admin",
        customClass: "d-none",
        component: (<ModulePermission />),
        permissionId: "roles"
      },
      {
        path: "/users",
        name: "Users",
        mini: "UM",
        layout: "/admin",
        customClass: "",
        component: (<UserManagement />),
        permissionId: "users"
      },
      {
        path: "/companies",
        name: "Companies",
        mini: "CM",
        layout: "/admin",
        component: <CompanyManagement />,
        permissionId: "companies"
      },
    ]
  },
  {
    collapse: true,
    name: "SETTINGS",
    mini: "SET",
    icon: "tim-icons icon-settings-gear-63",
    state: "SETTINGSCollapse",
    permissionId: "setting",
    views: [
      {
        path: "/connections",
        name: "Connections",
        mini: "C",
        layout: "/admin",
        component: (<ConnectionManagement />),
        permissionId: "connections",
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    mini: "P",
    icon: "tim-icons icon-single-02",
    layout: "/admin",
    customClass: "d-none",
    component: (<UserProfile />)
  },
  {
    path: "/company-profile",
    name: "Company Profile",
    mini: "CP",
    icon: "tim-icons icon-single-02",
    layout: "/admin",
    customClass: "d-none",
    component: (<CompanyProfile />)
  }
];

export default routes;
