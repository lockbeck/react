import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";

const DeviceData =() => {

    return (
      <React.Fragment>
        <div className="">
            <Row>
                <Col md={3}>
                        <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                               RAM/HDD
                            </CardTitle>
                            <CardText>
                              Data
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>


                <Col md={3}>
                        <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                             CPU
                            </CardTitle>
                            <CardText>
                               Data.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>


                <Col md={3}>
                        <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                OS
                            </CardTitle>
                            <CardText>
                             data area
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>


                <Col md={3}>
                        <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                Server Case
                            </CardTitle>
                            <CardText>
                              Data Area
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
         </div>
      </React.Fragment>
    );
  }

export default connect()(DeviceData);
