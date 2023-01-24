import React, { Component } from "react";
import { connect } from "react-redux";
import {  Col,  Form, FormGroup, Input, Label, Row } from "reactstrap";


class ModalData extends Component {

  render() {
    return (
      <React.Fragment>
         <div className="modal-data">
                      <Form>
                        <Row>
                        <Col sm={12}>
                        <FormGroup>
                                  <Label for="name">
                                      Name
                                  </Label>
                                      <Input
                                      id="name"
                                      name="name"
                                      placeholder="name"
                                      type="text"
                                      required
                                    />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                        <FormGroup>
                                  <Label for="definition">
                                    Definition
                                  </Label>
                                  <Input
                                    id="definition"
                                    name="definition"
                                    placeholder="definition"
                                    type="text"
                                  />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                        <FormGroup>
                                  <Label for="telecommunication_network">
                                    Telecommunication_network
                                  </Label>
                                  <Input
                                    id="telecommunication_network"
                                    name="telecommunication_network"
                                    placeholder="telecommunication network"
                                    type="text"
                                  />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                        <FormGroup>
                                  <Label for="provide_cyber_security">
                                        Provide_cyber_security
                                  </Label>
                                  <Input
                                    id="provide_cyber_security"
                                    name="provide_cyber_security"
                                    placeholder="provide cyber security"
                                    type="text"
                                  />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                              <FormGroup>
                                    <Label for="deivice_id">
                                      Device Id
                                    </Label>
                                    <Input
                                      id="deivice_id"
                                      name="deivice_id"
                                      type="select"
                                    >
                                      <option>
                                        1
                                      </option>
                                      <option>
                                        2
                                      </option>
                                    </Input>
                                </FormGroup>
                        </Col>
                        <Col sm={12}>
                              <FormGroup>
                                    <Label for="error_or_broken">
                                      Error or Broken
                                    </Label>
                                    <Input
                                      id="error_or_broken"
                                      name="error_or_broken"
                                      type="select"
                                    >
                                      <option>
                                        error
                                      </option>
                                      <option>
                                        broken
                                      </option>
                                    </Input>
                                </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <FormGroup>
                                    <Label for="certificates">
                                        Certificates
                                    </Label>
                                    <Input
                                      id="certificates"
                                      name="certificates"
                                      type="file"
                                    />
                                </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <FormGroup>
                                    <Label for="licenses">
                                        Licenses
                                    </Label>
                                    <Input
                                      id="licenses"
                                      name="licenses"
                                      type="file"
                                    />
                                </FormGroup>
                        </Col>
                        </Row>
                </Form>
            </div>
      </React.Fragment>
    );
  }
}

export default connect()(ModalData);
