import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/createapplication/createapplication.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { Tabs, notification } from "antd";
import Device from "./Device";
import Telecomunication from "./Telecomunication";
import TextEditor from "./TextEditor";
import FileUpload from "./fileUpload/FileUpload";
import { withTranslation } from "react-i18next";
import Technique from "./Technique";
import FileUpload2 from "./fileUpload/FileUpload2";
import FileUpload3 from "./fileUpload/FileUpload3";

const CreateApplication = ({ getImportance, getPurpose, getSubject, getStuff, 
  stuffs, subjects,purposes, importance, user, ...props }) => {
  useEffect(() => {
    getImportance();
    getPurpose();
    getStuff();
    // getSubject();
  }, []);

  const path = "api/application";

  const [application, setApplication] = useState({
    name: "",
    staffs: [],
    purpose_id: "",
    error_or_broken: "",
    devices: [],
    techniques: [],
    telecommunications: [],
    provide_cyber_security: "",
    threats_to_information_security: "",
    consequences_of_an_incident: "",
    organizational_and_technical_measures_to_ensure_security: "",
    importance_id: null,
    documents: [],
    subject_id: null,
  });

  const [api, contextHolder] = notification.useNotification();
  const [warn, warnText] = notification.useNotification();

  const { t, i18n } = props;

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
        warnNotification();

        console.log(error);
      });
  };


   
  return (
    <React.Fragment>
      <div className="add-application-content">
        {contextHolder}
        {warnText}
        <h3 className="title-name p-2">{t("add_new_application")}</h3>

        <Form className="p-2">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="name">{t("mai_name")}</Label>
                <Input
                  required={true}
                  id="name"
                  name="name"
                  placeholder={t("write_name")}
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
            <Col md={6}>
            <FormGroup>
                <Label for="subject">{t("mai_subject")}</Label>
                <Input
                  // required={true}
                  id="subject"
                  name="subject"
                  type="select"
                  // disabled
                  // defaultValue = {get(subjects, "subject.name","")}
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      subject_id: get($e, "target.value", ""),
                    })
                  }
                >
                  {/* {subjects.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))} */}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6} className="mt-2">
              <FormGroup>
              <Label for="stuff">{t("stuff")}</Label>
              <Input
                  required={true}
                  id="stuff"
                  name="stuff"
                  type="select"
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      staffs: [get($e, "target.value", "")],
                    })
                  }
                >
                  {stuffs.map((stuff, i) => (
                    <option key={i} value={stuff.id}>
                      {stuff.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6} className="mt-2">
              <FormGroup>
              <Label for="purpose">{t("scope_and_purpose")}</Label>
              <Input
                  required={true}
                  id="purpose"
                  name="purpose"
                  type="select"
                  className="form-select test-select"

                  onChange={($e) =>
                    setApplication({
                      ...application,
                      purpose_id: get($e, "target.value", ""),
                    })
                  }
                >
                 {purposes.map((goal, i) => (
                    <option
                      key={i}
                      value={goal.id} 
                      className="myOption" >
                      {goal.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label for="mai_importance">{t("mai_importance")}</Label>
                <Input
                  id="mai_importance"
                  name="mai_importance"
                  type="select"
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      importance_id: get($e, "target.value", ""),
                    })
                  }
                >
                  {importance.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                
                <FileUpload3
            
                  label={t("importance_file")}
                  save={(params) =>
                    setApplication({
                      ...application,
                      documents: params.map(({id}) => id),
                    })
                    
                  }
                />
                
              </FormGroup>
            </Col>
            <Col md={6} className="mt-2">
              <FormGroup>
                <Device
                  sendDeviceID={(params = []) =>
                    setApplication({
                      ...application,
                      devices: params.map(({id}) => id),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mt-2">
              <FormGroup>
                <Technique
                  sendDeviceID={(params=[]) =>
                    setApplication({
                      ...application,
                      techniques: params.map(({id}) => id),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mt-2">
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
                label: t("error_or_broken"),
                children: <TextEditor saveText={saveBroken} />,
              },
              {
                key: "2",
                label: t("provide_cyber_security"),
                children: <TextEditor saveText={saveSecurity} />,
              },
              {
                key: "3",
                label: t("consequences_of_an_incident"),
                children: <TextEditor saveText={saveIncident} />,
              },
              {
                key: "4",
                label: t("organizational_and_technical_measures_to_ensure_security"),
                children: <TextEditor saveText={saveOrganizational} />,
              },
              {
                key: "5",
                label: t("threats_to_information_security"),
                children: <TextEditor saveText={saveThreads} />,
              },
            ]}
            onChange={onChange}
            className="mt-5"
          />
        </Form>

        <Button className="mt-3" color="primary" onClick={submitData}>
          {t("send_application")}
        </Button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    importance: get(state, "PageReducer.data.muhim.result.data", []),
    purposes: get(state, "PageReducer.data.purpose-list.result.data", []),
    stuffs: get(state, "PageReducer.data.stuff-list.result.data", []),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
    user: get(state, "Auth.user", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getImportance: () => {
      const storeName = "muhim";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "api/importance",
          storeName,
        },
      });
    },

    getPurpose: () => {
      const storeName = "purpose-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "api/purpose",
          storeName,
        },
      });
    },

    getStuff: () => {
      const storeName = "stuff-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "api/staff",
          storeName,
        },
      });
    },

  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateApplication))
);
