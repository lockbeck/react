import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import NotificationDropdown from "./dropdowns/NotificationDropdown";
import ProfileDropdown from "./dropdowns/ProfileDropdown";
import CalendarDropdown from "./dropdowns/CalendarDropdown";
import logoSm from "../assets/images/logo-dark.png";
import logo from "../assets/images/logo-dark.png";
import profilePic from "../assets/images/userpic.png";
import "../assets/scss/topbar/topbar.css";
import GiftDropdown from "./dropdowns/GiftDropdown";
import CallDropdown from "./dropdowns/CallDropdown";
import CompasDropdown from "./dropdowns/CompasDropdown";

const Notifications = [
  {
    id: 1,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "primary",
  },
  {
    id: 2,
    text: "New user registered.",
    subText: "5 min ago",
    icon: "mdi mdi-account-plus",
    bgColor: "info",
  },
  {
    id: 3,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "success",
  },
  {
    id: 4,
    text: "Caleb Flakelar commented on Admin",
    subText: "2 days ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "danger",
  },
  {
    id: 5,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "primary",
  },
  {
    id: 6,
    text: "New user registered.",
    subText: "5 min ago",
    icon: "mdi mdi-account-plus",
    bgColor: "info",
  },
  {
    id: 7,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "success",
  },
  {
    id: 8,
    text: "Caleb Flakelar commented on Admin",
    subText: "2 days ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "danger",
  },
];

const ProfileMenus = [
  {
    label: "My Account",
    icon: "fe-user",
    redirectTo: "/",
  },
  {
    label: "Settings",
    icon: "fe-settings",
    redirectTo: "/",
  },
  {
    label: "Lock Screen",
    icon: "fe-lock",
    redirectTo: "/",
  },
  {
    label: "Logout",
    icon: "fe-log-out",
    redirectTo: "/logout",
    hasDivider: true,
  },
];

const Topbar = ({user}) => {

    return (
      <React.Fragment>
        <div className="navbar-custom ">
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="search-content">
              <form className="app-search">
                <div className="app-search-box">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        <i className=" fa fa-search text-dark"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </li>

            {/* <li>
              <NotificationDropdown notifications={Notifications} />
            </li>

            <li>
              <GiftDropdown />
            </li>

            <li>
              <CompasDropdown />
            </li>

            <li>
              <CallDropdown />
            </li>

            <li>
              <CalendarDropdown />
            </li> */}

            <li>
              <ProfileDropdown
                 profilePic={profilePic}
                menuItems={ProfileMenus}
                username={user.name}
              />
            </li>

            {/* <li className="dropdown notification-list">
              <button className="btn btn-link nav-link right-bar-toggle waves-effect waves-light" onClick={this.props.rightSidebarToggle}>
                <i className="fe-settings noti-icon"></i>
              </button>
            </li> */}
          </ul>

          <div className="logo-box">
            <Link to="/" className="logo text-center">
              <span className="logo-lg">
                <img src={logo} alt="" height="60" />
              </span>
              <span className="logo-sm">
                <img src={logoSm} alt="" height="60" />
              </span>
            </Link>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button
                className="button-menu-mobile waves-effect waves-light"
                // onClick={this.props.menuToggle}
              >
                <i className="fa fa-bars text-dark"></i>
              </button>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }

  const mapStateToProps = (state) => {
    return {
      items: get(state, "PageReducer.data.item-list.result.data", []),
      item: get(state, "PageReducer.data.get-one-item.result", {}),
      isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
      isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
      total: get(state, "PageReducer.data.item-list.result.total", 0),
      user: get(state, "Auth.user",{})
    };
  };



export default connect(
  mapStateToProps,
)(withRouter(Topbar));
