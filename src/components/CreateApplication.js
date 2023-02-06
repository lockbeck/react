import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/createapplication/createapplication.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import moment from "moment";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { Tabs } from "antd";
import Stuff from "./Stuff";
import Device from "./Device";
import Telecomunication from "./Telecomunication";
import TextEditor from "./TextEditor";
import FileUpload from "./fileUpload/FileUpload";

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
  const saveCertificate = (params)=>{

  };
  const saveLicense = (params)=>{
    
  };
  const saveRent = (params)=>{
    
  };

  const saveStuff = (params)=>{
    console.log(params);
  };


 

  const tabItems = [
    {
      key: "1",
      label: `MAI obyektining maqsadi`,
      children: <TextEditor/>
    },
    {
      key: "2",
      label: `Xatolik yoki ishdan chiqqan taqdirda`,
      children:<TextEditor/>
    },
    {
      key: "3",
      label: `Kiberxavfsizlikni ta’minlash`,
      children: <TextEditor/>
    },
    {
      key: "4",
      label: `Insident yuz berishi oqibatlari`,
      children: <TextEditor/>
    },
    {
      key: "5",
      label: `Xavfsizlikni ta’minlash tashkiliy va texnik choralari`,
      children: <TextEditor/>
    },
    {
      key: "6",
      label: `Axborot xavfsizligiga tahdidlar`,
      children: <TextEditor/>
    },
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
        <h3 className="title-name p-2">Yangi ariza qo'shish</h3>

        <Form className="p-2">
          <Row>
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={4} className="mt-2">
              {subjectType === "ijara shartnoma" ? (
                <FormGroup>
                   <FileUpload label={"Ijara shartnoma"} save={saveRent}/>
                </FormGroup>
              ) : (
                <div></div>
              )}
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
               <FileUpload label={"MAI sertifikati"} save={saveCertificate}/>
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
              <FileUpload label={"MAI litsenziyasi"} save={saveLicense}/>
              </FormGroup>
            </Col>
            <Col md={12} className="mt-2">
              <FormGroup>
                <Stuff save={saveStuff} />
              </FormGroup>
            </Col>
            <Col md={12} className="mt-2">
              <FormGroup>
                <Device />
              </FormGroup>
            </Col>
            <Col md={12} className="mt-2">
              <FormGroup>
                <Telecomunication />
              </FormGroup>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} className="mt-5"/>
          <Button className="mt-3" color="primary">Arizani qo'shish</Button>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateApplication));
