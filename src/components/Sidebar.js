import React, { Component } from "react";
import { Link, NavLink, useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { get } from "lodash";
import "../assets/scss/sidebar/sidebar.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import MetisMenu from "metismenujs/dist/metismenujs";
import { useTranslation, withTranslation } from "react-i18next";
import {
  DashboardOutlined,
  FileExcelOutlined,
  FileSyncOutlined,
  FileAddOutlined,
  FileOutlined,
  FileExclamationOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
  FolderOpenOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  LaptopOutlined,
  ReconciliationOutlined,
  ClusterOutlined,
  BankOutlined,
  BranchesOutlined,
  ApartmentOutlined
} from "@ant-design/icons";
import { hasAccess } from "../helpers/authUtils";

const SideNavContent = ({ roles, ...props }) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const access = hasAccess(["admin", "manager", "user"], roles);
  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
          {hasAccess(["admin", "manager"], roles) && (
            <li>
              {pathname.search("/dashboard") === 0 ? (
                <NavLink
                  to="/dashboard"
                  aria-expanded="true"
                  className="bg-light"
                >
                  <DashboardOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name"> {t("dashboard")} </span>
                </NavLink>
              ) : (
                <NavLink to="/dashboard" aria-expanded="true">
                  <DashboardOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name"> {t("dashboard")} </span>
                </NavLink>
              )}
            </li>
          )}

          <li>
            <Link
              to="/"
              className="waves-effect has-dropdown"
              aria-expanded="true"
            >
              <FolderOpenOutlined
                style={{ fontSize: "25px", color: "#121211" }}
              />
              <span className="menu-name"> {t("applications")}</span>
              <DownOutlined
                style={{
                  fontSize: "10px",
                  color: "#121211",
                  marginLeft: "30px",
                }}
              />
            </Link>
            <ul className="nav-second-level" aria-expanded="false">
              <li>
                {pathname.search("/all_application") === 0 ? (
                  <NavLink
                    to="/all_application"
                    className="waves-effect bg-light side-nav-link-ref"
                    aria-expanded="true"
                  >
                    <FileOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name">
                      {" "}
                      {t("all_applications")}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/all_application"
                    className="waves-effect "
                    aria-expanded="true"
                  >
                    <FileOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name">
                      {" "}
                      {t("all_applications")}
                    </span>
                  </NavLink>
                )}
              </li>

              {hasAccess(["manager", "user"], roles) && (
                <li>
                  {pathname.search("/new_application") === 0 ? (
                    <NavLink
                      to="/new_application"
                      className="waves-effect  nav-link bg-light side-nav-link-ref"
                      aria-expanded="true"
                    >
                      <FileExclamationOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name">
                        {" "}
                        {t("new_applications")}{" "}
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/new_application"
                      className="waves-effect  nav-link"
                      aria-expanded="true"
                    >
                      <FileExclamationOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name">
                        {" "}
                        {t("new_applications")}{" "}
                      </span>
                    </NavLink>
                  )}
                </li>
              )}
              <li>
                {pathname.search("/in_proccess") === 0 ? (
                  <NavLink
                    to="/in_proccess"
                    className="waves-effect bg-light side-nav-link-ref"
                    aria-expanded="true"
                  >
                    <FileSyncOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name"> {t("inproccess")} </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/in_proccess"
                    className="waves-effect bg-link"
                    aria-expanded="true"
                  >
                    <FileSyncOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name"> {t("inproccess")} </span>
                  </NavLink>
                )}
              </li>
              <li>
                {pathname.search("/rejected_application") === 0 ? (
                  <NavLink
                    to="/rejected_application"
                    aria-expanded="true"
                    className="bg-light side-nav-link-ref"
                  >
                    <FileExcelOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name">
                      {" "}
                      {t("rejected_applications")}{" "}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink to="/rejected_application" aria-expanded="true">
                    <FileExcelOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name">
                      {" "}
                      {t("rejected_applications")}{" "}
                    </span>
                  </NavLink>
                )}
              </li>
              {hasAccess(["user", "manager"], roles) && (
                <li>
                  {pathname.search("/manager_to_user") === 0 ? (
                    <NavLink
                      to="/manager_to_user"
                      className="waves-effect bg-light side-nav-link-ref"
                      aria-expanded="true"
                    >
                      <FileAddOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name">
                        {t("manager_to_user")}
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/manager_to_user"
                      className="waves-effect"
                      aria-expanded="true"
                    >
                      <FileAddOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name">
                        {t("manager_to_user")}
                      </span>
                    </NavLink>
                  )}
                </li>
              )}

              <li>
                {pathname.search("/success_application") === 0 ? (
                  <NavLink
                    to="/success_application"
                    className="waves-effect bg-light side-nav-link-ref"
                    aria-expanded="true"
                  >
                    <FileDoneOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name">
                      {t("accepted_applications")}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/success_application"
                    className="waves-effect "
                    aria-expanded="true"
                  >
                    <FileDoneOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="sub-menu-name">
                      {t("accepted_applications")}
                    </span>
                  </NavLink>
                )}
              </li>
            </ul>
          </li>

          {hasAccess(["user"], roles) && (
            <li>
              {pathname.search("/add_stuff") === 0 ? (
                <NavLink
                  to="/add_stuff"
                  className="waves-effect bg-light"
                  aria-expanded="true"
                >
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name">{t("add_stuff")}</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/add_stuff"
                  className="waves-effect"
                  aria-expanded="true"
                >
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name">{t("add_stuff")}</span>
                </NavLink>
              )}
            </li>
          )}

          {hasAccess(["user"], roles) && (
            <li>
              {pathname.search("/create_application") === 0 ? (
                <NavLink
                  to="/create_application"
                  className="waves-effect bg-light"
                  aria-expanded="true"
                >
                  <FileAddOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name">{t("add_application")}</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/create_application"
                  className="waves-effect"
                  aria-expanded="true"
                >
                  <FileAddOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name">{t("add_application")}</span>
                </NavLink>
              )}
            </li>
          )}

          {hasAccess(["admin", "manager"], roles) && (
            <li>
              {pathname.search("/users") === 0 ? (
                <NavLink
                  to="/users"
                  className="waves-effect bg-light"
                  aria-expanded="true"
                >
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name">{t("users")}</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/users"
                  className="waves-effect"
                  aria-expanded="true"
                >
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "#121211" }}
                  />
                  <span className="menu-name">{t("users")}</span>
                </NavLink>
              )}
            </li>
          )}

          {hasAccess(["admin", "manager"], roles) && (
            <li>
              <Link
                to="/"
                className="waves-effect has-dropdown"
                aria-expanded="true"
              >
                <MenuUnfoldOutlined
                  style={{ fontSize: "25px", color: "#121211" }}
                />
                <span className="menu-name"> {t("directory")}</span>
                <DownOutlined
                  style={{
                    fontSize: "10px",
                    color: "#121211",
                    marginLeft: "30px",
                  }}
                />
              </Link>
              <ul className="nav-second-level" aria-expanded="false">
                {/* device */}
                <li>
                  {pathname.search("/add_device") === 0 ? (
                    <NavLink
                      to="/add_device"
                      className="waves-effect bg-light side-nav-link-ref"
                      aria-expanded="true"
                    >
                      <LaptopOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("devices")}</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/add_device"
                      className="waves-effect "
                      aria-expanded="true"
                    >
                      <LaptopOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("devices")}</span>
                    </NavLink>
                  )}
                </li>

                {/* manafacturer */}
                <li>
                  {pathname.search("/add_manufacture") === 0 ? (
                    <NavLink
                      to="/add_manufacture"
                      className="waves-effect bg-light side-nav-link-ref"
                      aria-expanded="true"
                    >
                      <ReconciliationOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("manufacture")}</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/add_manufacture"
                      className="waves-effect "
                      aria-expanded="true"
                    >
                      <ReconciliationOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("manufacture")}</span>
                    </NavLink>
                  )}
                </li>

                {/* goal of mai */}
                <li>
                  {pathname.search("/add_goal") === 0 ? (
                    <NavLink
                      to="/add_goal"
                      className="waves-effect bg-light side-nav-link-ref"
                      aria-expanded="true"
                    >
                      <ClusterOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("goal_mai")}</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/add_goal"
                      className="waves-effect "
                      aria-expanded="true"
                    >
                      <ClusterOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("goal_mai")}</span>
                    </NavLink>
                  )}
                </li>

                {/* importance */}
                <li>
                  {pathname.search("/importance") === 0 ? (
                    <NavLink
                      to="/importance"
                      className="waves-effect bg-light side-nav-link-ref"
                      aria-expanded="true"
                    >
                      <ExclamationCircleOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("importance")}</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/importance"
                      className="waves-effect "
                      aria-expanded="true"
                    >
                      <ExclamationCircleOutlined
                        style={{ fontSize: "15px", color: "#121211" }}
                      />
                      <span className="sub-menu-name"> {t("importance")}</span>
                    </NavLink>
                  )}
                </li>


                {/* subject */}

                <li>
                  <Link
                    to="/"
                    className="waves-effect has-dropdown"
                    aria-expanded="true"
                  >
                    <BranchesOutlined
                      style={{ fontSize: "15px", color: "#121211" }}
                    />
                    <span className="menu-name-base"> {t("subject_base")}</span>
                    <DownOutlined
                      style={{
                        fontSize: "10px",
                        color: "#121211",
                        marginLeft: "30px",
                      }}
                    />
                  </Link>
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      {pathname.search("/add_subject") === 0 ? (
                        <NavLink
                          to="/add_subject"
                          className="waves-effect bg-light side-nav-link-ref"
                          aria-expanded="true"
                        >
                          <BankOutlined
                            style={{ fontSize: "15px", color: "#121211" }}
                          />
                          <span className="sub-menu-name mt-1">
                            {" "}
                            {t("subject")}
                          </span>
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/add_subject"
                          className="waves-effect "
                          aria-expanded="true"
                        >
                          <BankOutlined
                            style={{ fontSize: "15px", color: "#121211" }}
                          />
                          <span className="sub-menu-name mt-1">
                            {" "}
                            {t("subject")}
                          </span>
                        </NavLink>
                      )}
                    </li>

                    <li>
                      {pathname.search("/subject_type") === 0 ? (
                        <NavLink
                          to="/subject_type"
                          className="waves-effect bg-light side-nav-link-ref"
                          aria-expanded="true"
                        >
                          <ApartmentOutlined
                            style={{ fontSize: "15px", color: "#121211" }}
                          />
                          <span className="sub-menu-name mt-1">
                            {" "}
                            {t("subject_type")}
                          </span>
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/subject_type"
                          className="waves-effect "
                          aria-expanded="true"
                        >
                          <ApartmentOutlined
                            style={{ fontSize: "15px", color: "#121211" }}
                          />
                          <span className="sub-menu-name mt-1">
                            {" "}
                            {t("subject_type")}
                          </span>
                        </NavLink>
                      )}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          )}
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
    const { t, i18n } = this.props;
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

export default withTranslation("translation")(
  connect(mapStateToProps)(withRouter(Sidebar))
);
