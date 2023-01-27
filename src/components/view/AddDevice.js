import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Toast,
  ToastBody,
} from "reactstrap";
import "../../assets/scss/addapplication/addapplication.css";
import PagesApi from "../../pages/dashboards/PagesApi";
import { get } from "lodash";

class AddDevice extends Component {
  path = "api/device";

  constructor(props) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      device_id: "",
      ram: "",
      hdd: "",
      ssd: "",
      cpu: "",
      architecture: null,
      power: "",
      os: "",
      version: "",
      case: "",
      type: "",
      slot: "",
      data: {},
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
    this.setState((state) => {
      state.toast = {
        ...state.toast,
        isOpen: true,
        message: "Muvaffaqiyatli qo`shildi",
        class: "success",
        icon: "fe-check",
      };
      return state;
    });
  };

  error = () => {
    this.setState((state) => {
      state.toast = {
        ...state.toast,
        isOpen: true,
        message: "Xatolik yuz berdi",
        class: "danger",
        icon: "fe-x",
      };
      return state;
    });
  };

  handleValidSubmit = (event) => {
    const formData = new FormData(event.target);

    let data = [];
    formData.forEach((value, key) => (data[key] = value));

    this.create(data);
    console.log(data);
    setTimeout(this.toggleToast, 2000);
    event.preventDefault();
  };

  create = (params = {}) => {
    PagesApi.Create(this.path, params)
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          this.props.updateDeviceID(get(res, "data.id", ""));
          this.success();
        }
      })
      .catch((error) => {
        this.error();
      });
  };

  toggleToast = () =>
    this.setState({
      toast: {
        message: "",
        class: "",
        isOpen: false,
        icon: "",
      },
    });

  render() {
    return (
      <React.Fragment>
        <div className="add-application-content">
          <Toast
            className={
              "position-absolute box-shadow border-" + this.state.toast.class
            }
            style={{ top: "83px", zIndex: "3", right: "25px" }}
            isOpen={this.state.toast.isOpen}
          >
            <ToastBody className={"text-white bg-" + this.state.toast.class}>
              <i className={this.state.toast.icon}></i>{" "}
              {this.state.toast.message}
            </ToastBody>
          </Toast>
          <h3 className="title-name">Qurilma qo'shish</h3>
          <Form onSubmit={this.handleValidSubmit}>
            <Row>
              <Col sm={12}>
                <FormGroup>
                  <Label for="ram">RAM</Label>
                  <Input
                    id="ram"
                    name="ram"
                    placeholder="ram"
                    type="text"
                    defaultValue={this.state.ram}
                    //   required
                  />
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="hdd">HDD</Label>
                  <Input
                    id="hdd"
                    name="hdd"
                    placeholder="hdd"
                    type="text"
                    defaultValue={this.state.hdd}
                  />
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="ssd">SSD</Label>
                  <Input
                    id="ssd"
                    name="ssd"
                    placeholder="ssd"
                    type="text"
                    defaultValue={this.state.ssd}
                  />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup>
                  <Label for="cpu">CPU</Label>
                  <Input
                    id="cpu"
                    name="cpu"
                    type="text"
                    defaultValue={this.state.cpu}
                  />
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="architecture">Architecture</Label>
                  <Input
                    id="architecture"
                    name="architecture"
                    type="text"
                    defaultValue={this.state.architecture}
                  />
                </FormGroup>
              </Col>

              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="power">Power</Label>
                  <Input
                    id="power"
                    name="power"
                    placeholder="power"
                    type="text"
                    defaultValue={this.state.power}
                  />
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="os">OS</Label>
                  <Input
                    id="os"
                    name="os"
                    type="select"
                    defaultValue={this.state.os}
                  >
                    <option>Linux</option>
                    <option>Windows</option>
                    <option>MacOS</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="version">Version</Label>
                  <Input
                    id="version"
                    name="version"
                    type="number"
                    defaultValue={this.state.version}
                  />
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="case">CASE</Label>
                  <Input
                    id="case"
                    name="case"
                    type="text"
                    defaultValue={this.state.case}
                  />
                </FormGroup>
              </Col>
              <Col sm={4} className="mt-2">
                <FormGroup>
                  <Label for="slot">SLOT</Label>
                  <Input
                    id="slot"
                    name="slot"
                    type="number"
                    defaultValue={this.state.slot}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mt-3">
              <Button color="success">Qurilmani qo'shish</Button>
            </FormGroup>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(AddDevice);
