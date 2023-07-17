import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/edit/edit.css";
import { withRouter } from "react-router-dom";
import { get, isEmpty } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Col, Form, FormGroup, Input, Label, Row, Button, Badge,} from "reactstrap";
import { DeleteOutlined } from "@ant-design/icons";
import { Tabs, notification } from "antd";
import Stuff from "./Stuff";
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

const EditApplication = ({ getSingleItem, item, user, ...props }) => {
  const id = props.location.state;

  const append = [
    "staff",
    "telecommunication",
    "device",
    "technique",
    "license",
    "certificate",
    "document",
  ];
  const include = ["user", "importance", "subject", "comment"];

  const path = "api/application";

  const { t, i18n } = props;

  const [application, setApplication] = useState({
    name: "",
    staffs: [],
    scope_and_purpose: "",
    error_or_broken: item.error_or_broken,
    devices: [],
    techniques: [],
    licenses: [],
    certificates: [],
    telecommunications: [],
    provide_cyber_security: "",
    threats_to_information_security: "",
    consequences_of_an_incident: "",
    organizational_and_technical_measures_to_ensure_security: "",
    importance_id: null,
    documents: [],
    subject_id: null,
  });

  useEffect(() => {
    getSingleItem({ id, include, append });
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

  const onChangeScope = (key) => {
    setApplication((applic) => ({
      ...applic,
      scope_and_purpose: key,
    }));
  };
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

  const removeStaff = (id) => {
    PagesApi.Delete("api/staff", id)
      .then((res) => {
        if (res.status === 200) {
          setApplication({ ...application, staffs: [], staff: [] });
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

  const removeFile = (id) => {
    PagesApi.Delete("api/file", id)
      .then((res) => {
        if (res.status === 200) {
          setApplication({ ...application, certificates: [], certificate: [] });
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
                <Label for="name">Nomi</Label>
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
                <Label for="subject">Subyekt</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="subyekt nomi..."
                  type="text"
                  defaultValue={get(application, "subject.name", "")}
                  onChange={($e) =>
                    setApplication({
                      ...application,
                      subject: get($e, "target.value", ""),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "certificate", [])) && (
                    <Col md={12}>
                      <Label className="d-block">MAI sertifikati:</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "certificate", []).map(
                          (itm, i) => (
                            <span key={i}>{itm.title}</span>
                          )
                          // get(itm, "name", "")
                        )}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeFile(get(application, "certificates[0]", ""))
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "certificate", [])) && (
                    <Col md={12}>
                      <FileUpload
                        label={"MAI sertifikati"}
                        save={(params) =>
                          setApplication({
                            ...application,
                            certificates: params.map(({ id }) => id),
                          })
                        }
                      />
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col md={6} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "license", [])) && (
                    <Col md={12}>
                      <Label className="d-block">MAI litsenziyasi:</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "license", []).map(
                          (itm, i) => (
                            <span key={i}>{itm.title}</span>
                          )
                          // get(itm, "name", "")
                        )}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeFile(get(application, "licenses[0]", ""))
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "license", [])) && (
                    <Col md={12}>
                      <FileUpload
                        label={"MAI litsenziyasi"}
                        save={(params) =>
                          setApplication({
                            ...application,
                            licenses: params.map(({ id }) => id),
                          })
                        }
                      />
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "staff", [])) && (
                    <Col md={12}>
                      <Label className="d-block">Xodim:</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "staff", []).map((itm) =>
                          get(itm, "name", "")
                        )}
                      </div>
                      <div
                        className="delete-button pt-1 pr-1"
                        onClick={() =>
                          removeStaff(get(application, "staffs[0]", ""))
                        }
                      >
                        <DeleteOutlined />
                      </div>
                    </Col>
                  )}

                  {isEmpty(get(application, "staff", [])) && (
                    <Col md={12}>
                      <Stuff
                        save={(params) =>
                          setApplication({
                            ...application,
                            staffs: [get(params, "id", "")],
                            staff: [
                              {
                                name: get(params, "name", ""),
                                id: get(params, "id", ""),
                              },
                            ],
                          })
                        }
                      />
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "device", [])) && (
                    <Col md={12}>
                      <Label className="d-block">Device:</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "device", []).map(
                          (itm, i) => (
                            <span key={i}>{itm.name}</span>
                          )
                          // get(itm, "name", "")
                        )}
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
                      <Device
                        sendDeviceID={(params) =>
                          setApplication({
                            ...application,
                            devices: [get(params, "id", "")],
                            device: [
                              {
                                name: get(params, "name", ""),
                                id: get(params, "id", ""),
                              },
                            ],
                          })
                        }
                      />
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col md={4} className="mt-2">
              <FormGroup>
                <Row>
                  {!isEmpty(get(application, "telecommunication", [])) && (
                    <Col md={12}>
                      <Label className="d-block">Telecomunication:</Label>
                      <div className="excist-data pl-2 pt-1">
                        {get(application, "telecommunication", []).map((itm) =>
                          get(itm, "provider", "")
                        )}
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
                      <Telecomunication
                        sendTelId={(params) =>
                          setApplication({
                            ...application,
                            telecommunications: [get(params, "id", "")],
                            telecommunication: [
                              {
                                name: get(params, "provider", ""),
                                id: get(params, "id", ""),
                              },
                            ],
                          })
                        }
                      />
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
                label: `MAI obyektining maqsadi`,
                children: (
                  <ReactQuill
                    theme="snow"
                    className="text-editor"
                    value={get(application, "scope_and_purpose")}
                    onChange={onChangeScope}
                    disable
                  />
                ),
              },
              {
                key: "2",
                label: `Xatolik yoki ishdan chiqqan taqdirda`,
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
                key: "3",
                label: `Kiberxavfsizlikni ta’minlash`,
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
                key: "4",
                label: `Insident yuz berishi oqibatlari`,
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
                key: "5",
                label: `Xavfsizlikni ta’minlash tashkiliy va texnik choralari`,
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
                key: "6",
                label: `Axborot xavfsizligiga tahdidlar`,
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
        ) : (
          <div></div>
        )}
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
  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(EditApplication))
);
