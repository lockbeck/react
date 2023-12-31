import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/edit/edit.css";
import { withRouter } from "react-router-dom";
import { get, isEmpty } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  Badge,
} from "reactstrap";
import { DeleteOutlined } from "@ant-design/icons";
import { Tabs, notification } from "antd";
import Device from "./Device";
import Telecomunication from "./Telecomunication";
import FileUpload from "./fileUpload/FileUpload";
import ReactQuill from "react-quill";
import { withTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import Technique from "./Technique";

const EditPage = ({
  getSingleItem,
  getImportance,
  getPurpose,
  getStuff,
  stuffs,
  purposes,
  importanceK,
  item,
  user,
  ...props
}) => {
  const id = props.location.state;

  const append = [
    "staff",
    "telecommunication",
    "device",
    "technique",
    "license",
    "certificate",
    "Document",
  ];
  const include = ["user", "importance", "subject", "purpose"];

  const path = "api/application";

  const { t, i18n } = props;

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
    subject_id: get(user, "subject.id", ""),
  });

  useEffect(() => {
    getSingleItem({ id, include, append });
    getImportance();
    getStuff();
    getPurpose();
  }, [id]);

  useEffect(() => {
    setApplication({ ...application, ...item });
  }, [item]);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Arizangiz o'zgartirildi",
      style: {
        backgroundColor: "#6af7a5",
      },
      duration: 2,
    });
  };

  useEffect(() => {
    console.log(application);
  }, [application]);

  const onChangeErr = (key) => {
    setApplication((applic) => ({
      ...applic,
      error_or_broken: key,
    }));
  };
  const onChangeProvide = (key) => {
    setApplication((applic) => ({
      ...applic,
      provide_cyber_security: key,
    }));
  };
  const onChangeThreads = (key) => {
    setApplication((applic) => ({
      ...applic,
      threats_to_information_security: key,
    }));
  };

  const onChangeConsequences = (key) => {
    setApplication((applic) => ({
      ...applic,
      consequences_of_an_incident: key,
    }));
  };
  const onChangeOrganizational = (key) => {
    setApplication((applic) => ({
      ...applic,
      organizational_and_technical_measures_to_ensure_security: key,
    }));
  };

  const saveTelecomunication = (params) => {
    setApplication({
      ...application,
      telecommunications: [get(params, "id", "")],
    });
  };

  const submitData = () => {
    update(application, item.id);
  };

  const update = (params = {}, id) => {
    PagesApi.Update(path, id, params)
      .then((res) => {
        if (res.status === 200) {
          openNotification();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeDevice = (id) => {
    PagesApi.Delete("api/device", id)
      .then((res) => {
        if (res.status === 200) {
          setApplication({ ...application, devices: [], device: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeTechnique = (id) => {
    PagesApi.Delete("api/device", id)
      .then((res) => {
        if (res.status === 200) {
          setApplication({ ...application, techniques: [], technique: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFile = (id) => {
    PagesApi.Delete("api/file", id)
      .then((res) => {
        if (res.status === 200) {
          setApplication({ ...application, documents: [], document: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeTele = (id) => {
    PagesApi.Delete("api/telecommunication", id)
      .then((res) => {
        if (res.status === 200) {
          setApplication({
            ...application,
            telecommunications: [],
            telecommunication: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(item);
  console.log(application);

  return (
    <React.Fragment>
      <div className="add-application-content">
        {contextHolder}
        <h3 className="title-name p-2 m-2 d-inline-block">
          {t("edit_application")}
        </h3>
        <div className="application-status-bade d-inline-block float-right">
          {get(item, "status") === 1 ? (
            <Badge color="danger">{t("rejected")}</Badge>
          ) : get(item, "status") === 0 ? (
            <Badge color="warning">{t("waiting")}</Badge>
          ) : get(item, "status") === 2 ? (
            <Badge color="primary">{t("manager_to_admin")}</Badge>
          ) : get(item, "status") === 3 ? (
            <Badge color="info">{t("manager_to_user")}</Badge>
          ) : get(item, "status") === 4 ? (
            <Badge color="secondary">{t("admin_to_manager")}</Badge>
          ) : (
            <Badge color="success">{t("success")}</Badge>
          )}
        </div>
        {get(item, "status") === 1 ? (
          <div className="rejected-definition">
            <h5 className="d-inline-block mr-3">{t("rejection_def")}:</h5>
            {item.reason}
          </div>
        ) : (
          <div></div>
        )}

        <Form className="p-2">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="name">{t("mai_name")}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="name..."
                  type="text"
                  defaultValue={get(application, "name", "")}
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
                  required={true}
                  id="subject"
                  name="subject"
                  type="text"
                  disabled
                  defaultValue={get(application, "subject.name", "")}
                />
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
                  <option value={get(application, "staffs[0]", "")}>
                    {get(application, "staff[0].name", "")}
                  </option>
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
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      purpose_id: get($e, "target.value", ""),
                    })
                  }
                >
                  <option value={get(application, "purpose_id", "")}>
                    {get(application, "purpose.name", "")}
                  </option>
                  {purposes.map((goal, i) => (
                    <option key={i} value={goal.id}>
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
                  defaultValue={get(application, "importance.name", "")}
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      importance_id: get($e, "target.value", ""),
                    })
                  }
                >
                  <option value={get(application, "importance_id", "")}>
                    {get(application, "importance.name", "")}
                  </option>
                  {importanceK.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "document", [])) && (
                    <Col md={12}>
                      <Label className="d-block">{t("importance_file")}</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "document[0].title", "")}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeFile(get(application, "documents[0]", ""))
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "document", [])) && (
                    <Col md={12}>
                      <FormGroup>
                        <FileUpload
                          label={t("importance_file")}
                          save={(params) =>
                            setApplication({
                              ...application,
                              licenses: params.map(({ id }) => id),
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>

            {/* device */}
            <Col md={6} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "device", [])) && (
                    <Col md={12}>
                      <Label className="d-block">{t("hardware")}:</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "device", []).map((itm, i) => (
                          <span key={i}>{itm.name}</span>
                        ))}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeDevice(get(application, "devices[0]", ""))
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "device", [])) && (
                    <Col md={12}>
                      <FormGroup>
                        <Device
                          sendDeviceID={(params = []) =>
                            setApplication({
                              ...application,
                              devices: params.map(({ id }) => id),
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>

            {/*technique */}
            <Col md={6} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "technique", [])) && (
                    <Col md={12}>
                      <Label className="d-block">{t("software")}</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "technique", []).map((itm, i) => (
                          <span key={i}>{itm.name}</span>
                        ))}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeTechnique(get(application, "techniques[0]", ""))
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "technique", [])) && (
                    <Col md={12}>
                      <FormGroup>
                        <Technique
                          sendDeviceID={(params = []) =>
                            setApplication({
                              ...application,
                              techniques: params.map(({ id }) => id),
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "telecommunication", [])) && (
                    <Col md={12}>
                      <Label className="d-block">{t("used_network")}</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "telecommunication[0].name")}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeTele(
                            get(application, "telecommunications[0]", "")
                          )
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "telecommunication", [])) && (
                    <Col md={12}>
                      <FormGroup>
                        <Telecomunication sendTelId={saveTelecomunication} />
                      </FormGroup>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: t("error_or_broken"),
                children: (
                  <ReactQuill
                    theme="snow"
                    className="text-editor"
                    value={get(application, "error_or_broken")}
                    onChange={onChangeErr}
                  />
                ),
              },
              {
                key: "2",
                label: t("provide_cyber_security"),
                children: (
                  <ReactQuill
                    theme="snow"
                    className="text-editor"
                    value={get(application, "provide_cyber_security")}
                    onChange={onChangeProvide}
                  />
                ),
              },
              {
                key: "3",
                label: t("consequences_of_an_incident"),
                children: (
                  <ReactQuill
                    theme="snow"
                    className="text-editor"
                    value={get(application, "consequences_of_an_incident")}
                    onChange={onChangeConsequences}
                  />
                ),
              },
              {
                key: "4",
                label: t(
                  "organizational_and_technical_measures_to_ensure_security"
                ),
                children: (
                  <ReactQuill
                    theme="snow"
                    className="text-editor"
                    value={get(
                      application,
                      "organizational_and_technical_measures_to_ensure_security",
                      ""
                    )}
                    onChange={onChangeOrganizational}
                  />
                ),
              },
              {
                key: "5",
                label: t("threats_to_information_security"),
                children: (
                  <ReactQuill
                    theme="snow"
                    className="text-editor"
                    value={get(
                      application,
                      "threats_to_information_security",
                      ""
                    )}
                    onChange={onChangeThreads}
                  />
                ),
              },
            ]}
            className="mt-5"
          />
        </Form>
        {get(item, "status") === 1 ? (
          <Button className="mt-5" color="warning" onClick={submitData}>
            Qayta yuborish
          </Button>
        ) : get(item, "status") === 0 ? (
          <Button className="mt-5" color="primary" onClick={submitData}>
            O'zgartirish
          </Button>
        ) : get(item, "status") === 3 ? (
          <Button className="mt-5" color="primary" onClick={submitData}>
            Qayta yuborish
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: get(state, "PageReducer.data.item-list.result.data", []),
    item: get(state, "PageReducer.data.get-one-item.result", {}),
    importanceK: get(state, "PageReducer.data.muhim.result.data", []),
    purposes: get(state, "PageReducer.data.purpose-list.result.data", []),
    stuffs: get(state, "PageReducer.data.stuff-list.result.data", []),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getImportance: () => {
      const storeName = "muhim";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/importance",
          storeName,
        },
      });
    },

    getSingleItem: ({ id, include = [], append = [] }) => {
      const storeName = "get-one-item";
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `/api/application/${id}`,
          config: {
            params: {
              include: include.join(","),
              append: append.join(","),
            },
          },
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
  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPage))
);
