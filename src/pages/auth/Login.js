import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import {
  FormGroup,
  Button,
  Alert,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

import { loginUser } from "../../redux/actions";
import { isUserAuthenticated } from "../../helpers/authUtils";
import Loader from "../../components/Loader";
import logo from "../../assets/images/logo-dark.png";
import "../../assets/scss/login/login.css";

class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      username: "test",
      password: "test",
    };
  }

  componentDidMount() {
    this._isMounted = true;

    document.body.classList.add("authentication-bg");
    document.body.classList.add("authentication-bg-pattern");
  }

  componentWillUnmount() {
    this._isMounted = false;

    document.body.classList.remove("authentication-bg");
    document.body.classList.remove("authentication-bg-pattern");
  }

  /**
   * Handles the submit
   */
  handleValidSubmit = (event, values) => {
    this.props.loginUser(values.username, values.password, this.props.history);
  };

  /**
   * Redirect to root
   */
  renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const isAuthTokenValid = isUserAuthenticated();
    return (
      <React.Fragment>
        {this.renderRedirectToRoot()}

        {(this._isMounted || !isAuthTokenValid) && (
          <div className="form-bg">
            <div className="form-border">
              {/* preloader */}
              {this.props.loading && <Loader />}

              <div className="text-center w-75 m-auto">
                <a href="/">
                  <span>
                    <img src={logo} alt="" />
                  </span>
                </a>
                <h1 className="mt-3">Sign In!</h1>
              </div>

              {this.props.error && (
                <Alert color="danger" isOpen={this.props.error ? true : false}>
                  <div>{this.props.error}</div>
                </Alert>
              )}

              <AvForm onValidSubmit={this.handleValidSubmit}>
                <AvField
                  name="username"
                  placeholder="username"
                  className="input-form"
                  value={this.state.username}
                  required
                />

                <AvGroup className="mb-3">
                  <AvInput
                    type="password"
                    name="password"
                    id="password"
                    className="input-form"
                    placeholder="password"
                    value={this.state.password}
                    required
                  />
                  <AvFeedback>This field is invalid</AvFeedback>
                </AvGroup>

                <FormGroup>
                  <Button className="btn-block">Kirish</Button>
                </FormGroup>
              </AvForm>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
