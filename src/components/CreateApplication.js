import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/createapplication/createapplication.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import moment from "moment";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { Tabs, notification } from "antd";
import Stuff from "./Stuff";
import Device from "./Device";
import Telecomunication from "./Telecomunication";
import TextEditor from "./TextEditor";
import FileUpload from "./fileUpload/FileUpload";

const CreateApplication = () => {
  useEffect(() => {}, []);

  const path = "api/application";

  const [application, setApplication] = useState({
    name: "",
    subject: "",
    subject_type: "",
    subject_definition: "",
    subject_document: null,
    staffs: [],
    scope_and_purpose: "",
    error_or_broken: "",
    devices: [],
    license_id: null,
    certificate_id: null,
    telecommunications: [],
    provide_cyber_security: "",
    threats_to_information_security: "",
    consequences_of_an_incident: "",
    organizational_and_technical_measures_to_ensure_security: "",
  });

  const [api, contextHolder] = notification.useNotification();
  const[warn, warnText] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Arizangiz qo'shildi",
      style: {
        backgroundColor: "#6af7a5",
      },
      duration: 2,
    });
  };

  const warnNotification = () => {
    warn.open({
      message: "Noto'g'ri ma`lumot kiritilgan!",
      style: {
        backgroundColor: "#f5a595",
      },
      duration: 2,
    });
  };

  useEffect(() => {
    console.log(application);
  }, [application]);

  const onChange = (key) => {
    console.log(key);
  };

  const saveTelecomunication = (params) => {
    setApplication({
      ...application,
      telecommunications: [get(params, "id", "")],
    });
  };

  const savePurpose = (params) => {
    setApplication((applic) => ({ ...applic, scope_and_purpose: params }));
  };
  const saveBroken = (params) => {
    setApplication((applic) => ({ ...applic, error_or_broken: params }));
  };

  const saveIncident = (params) => {
    setApplication((applic) => ({
      ...applic,
      consequences_of_an_incident: params,
    }));
  };

  const saveOrganizational = (params) => {
    setApplication((applic) => ({
      ...applic,
      organizational_and_technical_measures_to_ensure_security: params,
    }));
  };

  const saveThreads = (params) => {
    setApplication((applic) => ({
      ...applic,
      threats_to_information_security: params,
    }));
  };
  const saveSecurity = (params) => {
    setApplication((applic) => ({ ...applic, provide_cyber_security: params }));
  };

  const submitData = () => {
    create(application);
  };

  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          openNotification();
          console.log("Data Created!!!");
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          warnNotification();
        } 
        else {
          console.log(error);
        }
      });
  };

  ///modal
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
        {contextHolder}
        {warnText}
        <h3 className="title-name p-2">Yangi ariza qo'shish</h3>

        <Form className="p-2">
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="name">Nomi</Label>
                <Input
                required={true}
                  id="name"
                  name="name"
                  placeholder="name..."
                  type="text"
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      name: get($e, "target.value", ""),
                    })
                  }
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
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      subject: get($e, "target.value", ""),
                    })
                  }
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
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      subject_type: get($e, "target.value", ""),
                    })
                  }
                >
                  <option></option>
                  <option>mulkchilik</option>
                  <option>ijara shartnoma</option>
                  <option>boshqa</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              {application.subject_type === "ijara shartnoma" ? (
                <FormGroup>
                  <FileUpload
                    label={"Ijara shartnoma"}
                    save={(file) =>
                      setApplication({
                        ...application,
                        subject_document: get(file, "id", ""),
                        subject_definition: get(file, "definition", ""),
                      })
                    }
                  />
                </FormGroup>
              ) : (
                <div></div>
              )}
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <FileUpload
                  label={"MAI sertifikati"}
                  save={(file) =>
                    setApplication({
                      ...application,
                      certificate_id: get(file, "id", ""),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <FileUpload
                  label={"MAI litsenziyasi"}
                  save={(file) =>
                    setApplication({
                      ...application,
                      license_id: get(file, "id", ""),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <Stuff
                  save={(params) =>
                    setApplication({
                      ...application,
                      staffs: [get(params, "id", "")],
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <Device
                  sendDeviceID={(params) =>
                    setApplication({
                      ...application,
                      devices: [get(params, "id", "")],
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <Telecomunication sendTelId={saveTelecomunication} />
              </FormGroup>
            </Col>
          </Row>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: `MAI obyektining maqsadi`,
                children: <TextEditor saveText={savePurpose} />,
              },
              {
                key: "2",
                label: `Xatolik yoki ishdan chiqqan taqdirda`,
                children: <TextEditor saveText={saveBroken} />,
              },
              {
                key: "3",
                label: `Kiberxavfsizlikni ta’minlash`,
                children: <TextEditor saveText={saveSecurity} />,
              },
              {
                key: "4",
                label: `Insident yuz berishi oqibatlari`,
                children: <TextEditor saveText={saveIncident} />,
              },
              {
                key: "5",
                label: `Xavfsizlikni ta’minlash tashkiliy va texnik choralari`,
                children: <TextEditor saveText={saveOrganizational} />,
              },
              {
                key: "6",
                label: `Axborot xavfsizligiga tahdidlar`,
                children: <TextEditor saveText={saveThreads} />,
              },
            ]}
            onChange={onChange}
            className="mt-5"
          />
        </Form>

        <Button className="mt-3" color="primary" onClick={submitData}>
          Arizani qo'shish
        </Button>
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
