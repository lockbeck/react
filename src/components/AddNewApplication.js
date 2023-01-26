import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Button,  Col,  Form, FormGroup, Input, Label, Row, Toast, ToastBody } from "reactstrap";
import "../assets/scss/addapplication/addapplication.css";
import PagesApi from '../pages/dashboards/PagesApi';


class AddNewApplication extends Component {

  path = "api/application";

  constructor(props) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      name: "",
      definition: "",
      certificates:"",
      licenses: "",
      device_id: null,
      error_or_broken: "",
      telecommunication_network:"",
      provide_cyber_security:"",
      data:{},
      toast: {
        message: "",
        class: "",
        isOpen: false,
        icon: "",
        deviceDefinition: "",
    },
    };
  }


  success = () => {
    this.setState(state => {
        state.toast = {
            ...state.toast,
            isOpen: true,
            message: 'Muvaffaqiyatli qo`shildi',
            class: 'success',
            icon: "fe-check",
        }
        return state;
    });
}

error = () => {
    this.setState(state => {
        state.toast = {
            ...state.toast,
            isOpen: true,
            message: 'Xatolik yuz berdi',
            class: 'danger',
            icon: 'fe-x',
        }
        return state;
    });
}


  handleValidSubmit = (event) => {
    const formData = new FormData(event.target);
    
    let data = {};
    formData.forEach((value, key) => data[key] = value);   

    this.create(data);
    setTimeout(this.toggleToast, 2000);
   event.preventDefault();
  };

   create = (params = {}) => {
      PagesApi.Create(this.path, params).then((res) => {
        if (res.status === 201) {
          this.success();
        }
      }).catch((error) => {
         this.error();
      })
  }


  toggleToast = () => this.setState({
    toast: {
        message: "",
        class: "",
        isOpen: false,
        icon: "",
    }
})

  render() {
    return (
      <React.Fragment>
          {/* <Button color="success" className="create-device-btn">Create Device</Button> */}
         <div className="add-application-content">
         <Toast className={"position-absolute box-shadow border-" + this.state.toast.class}
                           style={{top: "83px", zIndex: "3", right: "25px"}} isOpen={this.state.toast.isOpen}>
                        <ToastBody className={"text-white bg-" + this.state.toast.class}>
                            <i className={this.state.toast.icon}></i> {this.state.toast.message}
                        </ToastBody>
          </Toast>
            <p className="title-name">Yangi ariza qo'shish</p>
                      <Form onSubmit={this.handleValidSubmit}>
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
                                      defaultValue={this.state.name}
                                      required
                                    />
                            </FormGroup>
                        </Col>
                        <Col sm={4} className="mt-2">
                        <FormGroup>
                                  <Label for="telecommunication_network">
                                    Telecommunication_network
                                  </Label>
                                  <Input
                                    id="telecommunication_network"
                                    name="telecommunication_network"
                                    placeholder="telecommunication network"
                                    type="text"
                                    defaultValue={this.state.telecommunication_network}
                                  />
                            </FormGroup>
                        </Col>
                        <Col sm={4} className="mt-2">
                        <FormGroup>
                                  <Label for="provide_cyber_security">
                                        Provide_cyber_security
                                  </Label>
                                  <Input
                                    id="provide_cyber_security"
                                    name="provide_cyber_security"
                                    placeholder="provide cyber security"
                                    type="text"
                                    defaultValue={this.state.provide_cyber_security}
                                  />
                            </FormGroup>
                        </Col>
                        {/* <Col sm={6}>
                              <FormGroup>
                                    <Label for="deivice_id">
                                      Device Id
                                    </Label>
                                    <Input
                                      id="deivice_id"
                                      name="deivice_id"
                                      type="text"
                                      defaultValue={this.state.device_id}
                                    >
                                    </Input>
                                </FormGroup>
                        </Col> */}
                        <Col sm={4} className="mt-2">
                              <FormGroup>
                                    <Label for="error_or_broken">
                                      Error or Broken
                                    </Label>
                                    <Input
                                      id="error_or_broken"
                                      name="error_or_broken"
                                      type="select"
                                      defaultValue={this.state.error_or_broken}
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

                        <Col sm={12} className="mt-2">
                        <FormGroup>
                                  <Label for="definition">
                                    Definition
                                  </Label>
                                  <Input
                                    id="definition"
                                    name="definition"
                                    placeholder="definition"
                                    type="textarea"
                                    defaultValue={this.state.definition}
                                  />
                            </FormGroup>
                        </Col>
                        <Col sm={6} className="mt-2">
                            <FormGroup>
                                    <Label for="certificates">
                                        Certificates
                                    </Label>
                                    <Input
                                      id="certificates"
                                      name="certificates"
                                      type="file"
                                      defaultValue={this.state.certificates}
                                    />
                                </FormGroup>
                        </Col>
                        <Col sm={6} className="mt-2">
                            <FormGroup>
                                    <Label for="licenses">
                                        Licenses
                                    </Label>
                                    <Input
                                      id="licenses"
                                      name="licenses"
                                      type="file"
                                      defaultValue={this.state.licenses}
                                    />
                                </FormGroup>
                        </Col>
                        </Row>
                        <FormGroup className="mt-3">
                          <Button color="success">Arizani qo'shish</Button>
                        </FormGroup>
                </Form>
            </div>
      </React.Fragment>
    );
  }
}

export default connect()(AddNewApplication);
