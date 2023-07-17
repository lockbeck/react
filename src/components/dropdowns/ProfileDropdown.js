import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import "../../assets/scss/topbar/topbar.css";

class ProfileDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  /*:: toggleDropdown: () => void */
  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const profilePic = this.props.profilePic || null;

    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggleDropdown}
        className="notification-list"
      >
        <DropdownToggle
          data-toggle="dropdown"
          tag="button"
          id="profilpic"
          className="btn btn-link nav-link dropdown-toggle nav-user  waves-effect waves-light"
          onClick={this.toggleDropdown}
          aria-expanded={this.state.dropdownOpen}
        >
          <Row className="user-container">
            <Col lg={3} className="user-image-col">
            <img src={profilePic} alt="user" className="user-profile-picture"/>
            </Col>
            <Col lg={5}>
            <h6 className="logged-user">
            {this.props.username} <i className="mdi mdi-chevron-down"></i>{" "}
          </h6>
            </Col>
          </Row>
        </DropdownToggle>
        <DropdownMenu right className="topbar-dropdown-menu profile-dropdown">
          <div onClick={this.toggleDropdown}>
            {/* <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Welcome !</h6>
            </div> */}
            {this.props.menuItems.map((item, i) => {
              return (
                <React.Fragment key={i + "-profile-menu"}>
                  {item.hasDivider ? <DropdownItem divider /> : null}
                  <Link
                    to={item.redirectTo}
                    className="dropdown-item notify-item"
                  >
                    <i className={`${item.icon} mr-1`}></i>
                    <span>{item.label}</span>
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ProfileDropdown;
