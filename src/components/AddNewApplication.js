import React, { Component } from "react";
import { connect } from "react-redux";

class AddNewApplication extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>Add New Application</h2>
      </React.Fragment>
    );
  }
}

export default connect()(AddNewApplication);
