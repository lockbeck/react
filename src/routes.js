import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { get } from 'lodash';

import { isUserAuthenticated, getLoggedInUser, hasAccess } from "./helpers/authUtils";

// lazy load all the views
const Dashboard = React.lazy(() => import("./pages/dashboards/Dashbord"));
const AllApplication = React.lazy(() => import("./components/AllApplication"));
const NewApplication = React.lazy(() => import("./components/NewApplication"));
const RejectedApplication = React.lazy(() => import("./components/RejectedApplication"));
const InProccess = React.lazy(() => import("./components/InProccess"));
const View = React.lazy(() => import("./components/view/View"));
const AddNewApplication = React.lazy(() => import("./components/AddNewApplication"));
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
        return <Redirect to={{ pathname: "/" }} />;
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
    roles: ["admin"],
  },
  {
    path: "/all_application",
    name: "AllApplication",
    component: AllApplication,
    route: PrivateRoute,
    roles: ["admin"],
  },
  {
    path: "/new_application",
    name: "NewApplication",
    component: NewApplication,
    route: PrivateRoute,
    roles: ["admin"],
  },
  {
    path: "/rejected_application",
    name: "RejectedApplication",
    component: RejectedApplication,
    route: PrivateRoute,
    roles: ["admin"],
  },
  {
    path: "/in_proccess",
    name: "InProccess",
    component: InProccess,
    route: PrivateRoute,
    roles: ["admin"],
  },
   {
    path: "/view",
    name: "View",
    component: View,
    route: PrivateRoute,
    roles: ["admin"],
  },
  {
    path: "/add_application",
    name: "AddNewApplication",
    component: AddNewApplication,
    route: PrivateRoute,
    roles: ["admin"],
  },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
    roles: ["admin"],
  },
];

export { routes, PrivateRoute };
