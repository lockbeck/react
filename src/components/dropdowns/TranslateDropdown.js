import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import "../../assets/scss/profileDropdown.scss";
import uz_icon from "../../assets/images/uzbekistan.png";
import ru_icon from "../../assets/images/russia.png";
import en_icon from "../../assets/images/united-states.png";
import { withTranslation } from "react-i18next";

class TranslateDropdown extends Component {
  icons;
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
      current_icon: props.i18n.language,
    };
    // console.log(props.i18n);
    this.icons = {
      uz: uz_icon,
      ru: ru_icon,
      en: en_icon,
    };
  }

  /*:: toggleDropdown: () => void */
  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  changeLanguage(lng) {
    this.props.i18n.changeLanguage(lng);
    this.setState((state) => {
      state = {
        ...state,
        current_icon: lng,
      };
      return state;
    });
  }

  render() {
    const { t, i18n } = this.props;

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
          className="btn btn-link nav-link dropdown-toggle nav-user waves-effect waves-light mt-1"
          onClick={this.toggleDropdown}
          aria-expanded={this.state.dropdownOpen}
        >
            <img
              src={this.icons[this.state.current_icon]}
              alt=""
              className="language-topbar"
            />
            {/* <i className="mdi mdi-chevron-down"></i> */}
        </DropdownToggle>
        <DropdownMenu className="drop-menu px-3">
          <div
            className="row justify-content-center align-items-center"
            onClick={() => {
              this.changeLanguage("uz");
            }}
          >
            <img src={uz_icon} className="language_icon mr-1" alt="user" />
            {/* <span>UZB</span> */}
          </div>
          <div
            className="row justify-content-center align-items-center"
            onClick={() => {
              this.changeLanguage("ru");
            }}
          >
            <img src={ru_icon} className="language_icon mr-1" alt="user" />
            {/* <span>RUS</span> */}
          </div>
          <div
            className="row justify-content-center align-items-center"
            onClick={() => {
              this.changeLanguage("en");
            }}
          >
            <img src={en_icon} className="language_icon mr-1" alt="user" />
            {/* <span>ENG</span> */}
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withTranslation("translation")(TranslateDropdown);
