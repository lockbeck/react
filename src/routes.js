import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { get } from 'lodash';

import { isUserAuthenticated, getLoggedInUser, hasAccess } from "./helpers/authUtils";

// lazy load all the views
const Dashboard = React.lazy(() => import("./pages/dashboards/Dashbord"));
const AllApplication = React.lazy(() => import("./components/AllApplication"));
const Success_Application = React.lazy(() => import("./components/Success_Application"));
const NewApplication = React.lazy(() => import("./components/NewApplication"));
const RejectedApplication = React.lazy(() => import("./components/RejectedApplication"));
const Manager_to_User = React.lazy(() => import("./components/Manager_to_User"));
const InProccess = React.lazy(() => import("./components/InProccess"));
const View = React.lazy(() => import("./components/view/View"));
const AddGoal = React.lazy(() => import("./components/view/AddGoal"));
const AddDevice = React.lazy(() => import("./components/view/AddDevice"));
const AddManufacture = React.lazy(() => import("./components/view/AddManufacture"));
const AddSubject = React.lazy(() => import("./components/view/AddSubject"));
const SubjectType = React.lazy(() => import("./components/view/SubjectType"));
const AddStuff = React.lazy(() => import("./components/view/AddStuff"));
const Users = React.lazy(() => import("./components/Users"));
const Importance = React.lazy(() => import("./components/Importance"));
const CreateApplication = React.lazy(() => import("./components/CreateApplication"));
const EditPage = React.lazy(() => import("./components/EditPage"));
const EditApplication = React.lazy(() => import("./components/EditApplication"));
const ChangeAccount = React.lazy(() => import("./components/ChangeAccount"));
// auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Logout = React.lazy(() => import("./pages/auth/Logout"));
// const ForgetPassword = React.lazy(() =>
//   import("./pages/account/ForgetPassword")
// );
// const Register = React.lazy(() => import("./pages/account/Register"));
// const ConfirmAccount = React.lazy(() => import("./pages/account/Confirm"));




// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  
  <Route
    {...rest}
    render={(props) => {
      const isAuthTokenValid = isUserAuthenticated();
      if (!isAuthTokenValid) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (!hasAccess(roles, get(loggedInUser, "roles", []))) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/all_application" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

const routes = [
  // auth and account
  { path: "/login", name: "Login", component: Login, route: Route },
  { path: "/logout", name: "Logout", component: Logout, route: Route },

  // other pages
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    route: PrivateRoute,
    roles: ["admin","manager"],
  },
  {
    path: "/all_application",
    name: "AllApplication",
    component: AllApplication,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],   
  },
  {
    path: "/success_application",
    name: "Success_Application",
    component: Success_Application,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],   
  },
  {
    path: "/new_application",
    name: "NewApplication",
    component: NewApplication,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/rejected_application",
    name: "RejectedApplication",
    component: RejectedApplication,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/manager_to_user",
    name: "Manager_to_User",
    component: Manager_to_User,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/in_proccess",
    name: "InProccess",
    component: InProccess,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
   {
    path: "/view",
    name: "View",
    component: View,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/importance",
    name: "Importance",
    component: Importance,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/create_application",
    name: "CreateApplication",
    component: CreateApplication,
    route: PrivateRoute,
    roles: ["user"],  
  },
  {
    path: "/edit",
    name: "EditPage",
    component: EditPage,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/edit_application",
    name: "EditApplication",
    component: EditApplication,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/change_account",
    name: "ChangeAccount",
    component: ChangeAccount,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/add_goal",
    name: "AddGoal",
    component: AddGoal,
    route: PrivateRoute,
    roles: ["admin","manager"],  
  },
  {
    path: "/add_device",
    name: "AddDevice",
    component: AddDevice,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/add_manufacture",
    name: "AddManufacture",
    component: AddManufacture,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/add_subject",
    name: "AddSubject",
    component: AddSubject,
    route: PrivateRoute,
    roles: ["admin","manager", "user"],  
  },
  {
    path: "/add_stuff",
    name: "AddStuff",
    component: AddStuff,
    route: PrivateRoute,
    roles: ["user"],  
  },
  {
    path: "/subject_type",
    name: "SubjectType",
    component: SubjectType,
    route: PrivateRoute,
    roles: ["user", "admin", "manager"],  
  },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
    roles: ["admin","manager","user"],  
  },
];

export { routes, PrivateRoute };
