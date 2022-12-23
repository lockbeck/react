import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

class View extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="">
            <Row >
                  <Col >aaa</Col>
            </Row>
         </div>
      </React.Fragment>
    );
  }
}

export default connect()(View);
