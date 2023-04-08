import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { get } from "lodash";
import "../assets/scss/sidebar/sidebar.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import MetisMenu from "metismenujs/dist/metismenujs";
import {
  DashboardOutlined,
  FileExcelOutlined,
  FileSyncOutlined,
  FileAddOutlined,
  FileOutlined,
  FileExclamationOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { hasAccess } from "../helpers/authUtils";

const SideNavContent = ({ roles, ...props }) => {
  const access = hasAccess(["admin", "manager", "user"], roles);
  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
          {/* <li className="menu-title">Navigation</li> */}
          {hasAccess(["admin", "manager"], roles) && (
            <li>
              <NavLink to="/dashboard" aria-expanded="true">
                <DashboardOutlined
                  style={{ fontSize: "25px", color: "#121211" }}
                />
                <span className="menu-name"> Dashboard </span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/all_application"
              className="waves-effect "
              aria-expanded="true"
            >
              <FileOutlined style={{ fontSize: "25px", color: "#121211" }} />
              <span className="menu-name"> Barcha Arizalar</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/success_application"
              className="waves-effect "
              aria-expanded="true"
            >
              <FileDoneOutlined
                style={{ fontSize: "25px", color: "#121211" }}
              />
              <span className="menu-name">Qabul qilingan</span>
            </NavLink>
          </li>
          {hasAccess(["manager", "user"], roles) && (
            <li>
              <NavLink
                to="/new_application"
                className="waves-effect  nav-link"
                aria-expanded="true"
              >
                <FileExclamationOutlined
                  style={{ fontSize: "25px", color: "#121211" }}
                />
                <span className="menu-name"> Yangi Arizalar </span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/in_proccess"
              className="waves-effect"
              aria-expanded="true"
            >
              <FileSyncOutlined
                style={{ fontSize: "25px", color: "#121211" }}
              />
              <span className="menu-name"> Jarayondagi </span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/rejected_application" aria-expanded="true">
              <FileExcelOutlined
                style={{ fontSize: "25px", color: "#121211" }}
              />
              <span className="menu-name"> Inkor qilingan </span>
            </NavLink>
          </li>

          {hasAccess(["user"], roles) && (
            <li>
              <NavLink
                to="/create_application"
                className="waves-effect"
                aria-expanded="true"
              >
                <FileAddOutlined
                  style={{ fontSize: "25px", color: "#121211" }}
                />
                <span className="menu-name"> Ariza qo'shish</span>
              </NavLink>
            </li>
          )}

          {hasAccess(["admin"], roles) && (
            <li>
              <NavLink
                to="/users"
                className="waves-effect"
                aria-expanded="true"
              >
                <UsergroupAddOutlined
                  style={{ fontSize: "25px", color: "#121211" }}
                />
                <span className="menu-name">Foydalanuvchilar</span>
              </NavLink>
            </li>
          )}

          {/* {hasAccess(["admin"], roles) && (
            <li>
              <NavLink
                to="/importance"
                className="waves-effect"
                aria-expanded="true"
              >
                <ExclamationCircleOutlined
                  style={{ fontSize: "25px", color: "#121211" }}
                />
                <span className="menu-name">Muhimlilik</span>
              </NavLink>
            </li>
          )} */}
        </ul>
      </div>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

class Sidebar extends Component {
  roles = get(this.props, "user.roles", []);
  constructor(props) {
    super(props);
    this.handleOtherClick = this.handleOtherClick.bind(this);
    this.initMenu = this.initMenu.bind(this);
  }

  /**
   * Bind event
   */
  componentWillMount = () => {
    document.addEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   *
   */
  componentDidMount = () => {
    this.initMenu();
  };

  /**
   * Component did update
   */
  componentDidUpdate = (prevProps) => {
    if (this.props.isCondensed !== prevProps.isCondensed) {
      if (prevProps.isCondensed) {
        document.body.classList.remove("sidebar-enable");
        document.body.classList.remove("enlarged");
      } else {
        document.body.classList.add("sidebar-enable");
        const isSmallScreen = window.innerWidth < 768;
        if (!isSmallScreen) {
          document.body.classList.add("enlarged");
        }
      }

      this.initMenu();
    }
  };

  /**
   * Bind event
   */
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Handle the click anywhere in doc
   */
  handleOtherClick = (e) => {
    if (this.menuNodeRef.contains(e.target)) return;
    // else hide the menubar
    document.body.classList.remove("sidebar-enable");
  };

  /**
   * Init the menu
   */
  initMenu = () => {
    // render menu
    new MetisMenu("#side-menu");
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (this.props.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("in");
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.add("active");
          var childAnchor = parent3.querySelector(".has-dropdown");
          if (childAnchor) childAnchor.classList.add("active");
        }

        const parent4 = parent3.parentElement;
        if (parent4) parent4.classList.add("in");
        const parent5 = parent4.parentElement;
        if (parent5) parent5.classList.add("active");
      }
    }
  };

  render() {
    const isCondensed = this.props.isCondensed || false;
    const roles = get(this.props, "user.roles", []);
    return (
      <React.Fragment>
        <div
          className="left-side-menu"
          ref={(node) => (this.menuNodeRef = node)}
        >
          {!isCondensed && (
            <PerfectScrollbar>
              <SideNavContent roles={this.roles} />
            </PerfectScrollbar>
          )}
          {isCondensed && <SideNavContent />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: get(state, "Auth.user", {}),
  };
};

export default connect(mapStateToProps)(withRouter(Sidebar));
