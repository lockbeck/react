import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/createapplication/createapplication.css";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import moment from "moment";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { Modal, Tabs } from "antd"
import Stuff from "./Stuff";
import Device from "./Device";
import Telecomunication from "./Telecomunication";
const CreateApplication = ({
  history,
  getItemsList,
  getSingleItem,
  items,
  item,
  isFetched,
  total,
}) => {


  useEffect(() => {}, []);

  const path = "";

  const [subjectType, setSubjectType] = useState("");

  const onChange = (key) => {
    console.log(key);
  };

  const tabItems = [
    {
      key: '1',
      label: `MAI obyektining maqsadi`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `Xatolik yoki ishdan chiqqan taqdirda`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Kiberxavfsizlikni ta’minlash`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: '4',
      label: `Insident yuz berishi oqibatlari`,
      children: `data area`
    },
    {
      key: '5',
      label: `Xavfsizlikni ta’minlash tashkiliy va texnik choralari`,
      children: `data area5`
    },
    {
      key: '6',
      label: `Axborot xavfsizligiga tahdidlar`,
      children: `data area6`
    }
  ];


  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
        }
      })
      .catch((error) => {
        this.error();
      });
  };

  ////  modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className="add-application-content">
        <h3 className="title-name">Yangi ariza qo'shish</h3>

        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Nomi</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="name..."
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="subject">Subyekt</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="subyekt nomi..."
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="subject_type">Subyekt turi</Label>
                <Input
                  id="subject_type"
                  name="subject_type"
                  type="select"
                  onChange={(e) => setSubjectType(`${e.target.value}`)}
                >
                  <option></option>
                  <option>mulkchilik</option>
                  <option>ijara shartnoma</option>
                  <option>boshqa</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              {subjectType === "ijara shartnoma" ? (
                <FormGroup>
                  <Label for="subject">Ijara Shartnoma</Label>
                  <Input id="subject_file" name="subject_file" type="button" defaultValue="Faylni Yuklang"/>
                </FormGroup>
              ) : (
                <div></div>
              )}
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="subject_type">MAI sertifikati</Label>
                <Input
                  id="certificates"
                  name="certificates"
                  type="button"
                  defaultValue="Faylni Yuklang"
                  onClick={showModal}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
            <FormGroup>
                <Label for="subject_type">MAI litsenziyasi</Label>
                <Input
                  id="certificates"
                  name="certificates"
                  type="button"
                  defaultValue="Faylni Yuklang"
                  onClick={showModal}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Stuff/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Device/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Telecomunication/>
              </FormGroup>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
          <Button color="success">Arizani qo'shish</Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    items: get(state, "PageReducer.data.item-list.result.data", []),
    item: get(state, "PageReducer.data.get-one-item.result", {}),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateApplication));
