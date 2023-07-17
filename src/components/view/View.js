import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { Button, Col, Row, Label, Input, Badge, FormGroup } from "reactstrap";
import { Tabs, notification, Checkbox, Tooltip } from "antd";
import moment from "moment";
import { config } from "../../utils/config";
import ApiActions from "../../redux/pages/actions";
import "../../assets/scss/view/view.css";
import { Modal } from "antd";
import { withTranslation } from "react-i18next";
import PagesApi from "../../pages/dashboards/PagesApi";
import { hasAccess } from "../../helpers/authUtils";

const View = ({
  getSingleItem,
  getImportance,
  importance,
  item,
  user,
  ...props
}) => {
  const id = props.location.state;
  const onChange = (key) => {};

  const append = [
    "staff",
    "telecommunication",
    "device",
    "technique",
    "license",
    "certificate",
    "Document",
  ];
  const include = ["user", "importance", "subject"];
  const { t, i18n } = props;

  const [reason, setReason] = useState("");
  const [important, setImportant] = useState("");

  const [commentData, setCommentData] = useState({
    column_1: "",
    column_2: "",
    column_3: "",
    column_4: "",
    column_5: "",
    column_6: "",
    column_7: "",
    column_8: "",
    column_9: "",
    column_10: "",
    column_11: "",
    column_12: "",
    status: 1,
  });
  console.log(commentData);
  useEffect(() => {
    getImportance();
    getSingleItem({ id, include, append });
  }, [id]);

  //checkbox function
  const [showTextarea1, setShowTextarea1] = useState(false);
  const handleCheckboxChange1 = (e) => {
    setShowTextarea1(e.target.checked);
  };
  const [showTextarea2, setShowTextarea2] = useState(false);
  const handleCheckboxChange2 = (e) => {
    setShowTextarea2(e.target.checked);
  };
  const [showTextarea3, setShowTextarea3] = useState(false);
  const handleCheckboxChange3 = (e) => {
    setShowTextarea3(e.target.checked);
  };
  const [showTextarea4, setShowTextarea4] = useState(false);
  const handleCheckboxChange4 = (e) => {
    setShowTextarea4(e.target.checked);
  };
  const [showTextarea5, setShowTextarea5] = useState(false);
  const handleCheckboxChange5 = (e) => {
    setShowTextarea5(e.target.checked);
  };
  const [showTextarea6, setShowTextarea6] = useState(false);
  const handleCheckboxChange6 = (e) => {
    setShowTextarea6(e.target.checked);
  };
  const [showTextarea7, setShowTextarea7] = useState(false);
  const handleCheckboxChange7 = (e) => {
    setShowTextarea7(e.target.checked);
  };
  const [showTextarea8, setShowTextarea8] = useState(false);
  const handleCheckboxChange8 = (e) => {
    setShowTextarea8(e.target.checked);
  };
  const [showTextarea9, setShowTextarea9] = useState(false);
  const handleCheckboxChange9 = (e) => {
    setShowTextarea9(e.target.checked);
  };
  const [showTextarea10, setShowTextarea10] = useState(false);
  const handleCheckboxChange10 = (e) => {
    setShowTextarea10(e.target.checked);
  };
  const [showTextarea11, setShowTextarea11] = useState(false);
  const handleCheckboxChange11 = (e) => {
    setShowTextarea11(e.target.checked);
  };
  const [showTextarea12, setShowTextarea12] = useState(false);
  const handleCheckboxChange12 = (e) => {
    setShowTextarea12(e.target.checked);
  };

  const success = (id) => {
    PagesApi.Get(id, "success")
      .then((res) => {
        getSingleItem({ id, include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reject = (id) => {
    PagesApi.Get(id, "reject")
      .then((res) => {
        getSingleItem({ id, include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const comment = (id) => {
    PagesApi.Comment(id, commentData)
      .then((res) => {
        getSingleItem({ id, include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(item);

  const items = [
    {
      key: "1",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 6) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>{t("hardware")}</b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 6),
              "description",
              ""
            )}
          >
            <b className="comment-added">{t("hardware")}</b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>{t("hardware_name")}:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item, "device[0].name", "mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>{t("manafucture")}:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item, "device[0].manufacturer", "mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>{t("hardware_type")}:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item, "device[0].model", "mavjud emas")}</i>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>{t("hardware_certificate")}:</h5>
              </Col>
              <Col md={12}>
                <a
                  href={`${config.API_URL}${get(
                    item,
                    "device[0].document[0].path",
                    ""
                  )}`}
                  target="_blank"
                >
                  {t("view_file")}
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="mt-2">
            {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
              (get(item, "status") === 4 ||
              get(user, "roles[0].name") === "manager" ? (
                <Checkbox onChange={handleCheckboxChange6}>
                  Izoh qo'shish
                </Checkbox>
              ) : (
                <div></div>
              ))}
            {showTextarea6 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_6: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },

    {
      key: "2",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 8) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>{t("software")}</b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 8),
              "description",
              ""
            )}
          >
            <b className="comment-added">{t("software")}</b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={10}>
            <Row>
              <Col md={4}>
                <Row>
                  <Col md={12}>
                    <h5> {t("software_name")}:</h5>
                  </Col>
                  <Col md={12}>
                    <i>{get(item, "technique[0].name", "mavjud emas")}</i>
                  </Col>
                </Row>
              </Col>

              <Col md={4}>
                <Row>
                  <Col md={12}>
                    <h5>{t("manafucture")}:</h5>
                  </Col>
                  <Col md={12}>
                    <i>
                      {get(item, "technique[0].manufacturer", "mavjud emas")}
                    </i>
                  </Col>
                </Row>
              </Col>

              <Col md={4}>
                <Row>
                  <Col md={12}>
                    <h5>{t("software_type")}:</h5>
                  </Col>
                  <Col md={12}>
                    <i>{get(item, "technique[0].model", "mavjud emas")}</i>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12}>
                    <h5>{t("software_certificate")}:</h5>
                  </Col>
                  <Col md={12}>
                    {!isEmpty(get(item, "technique[0].document", [])) && (
                      <a
                        href={`${config.API_URL}${get(
                          item,
                          "technique[0].document[0].path",
                          ""
                        )}`}
                        target="_blank"
                      >
                        {t("view_file")}
                      </a>
                    )}
                    {isEmpty(get(item, "technique[0].document", [])) &&(
                      <i>{t("file_doesnt_exict")}</i>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            {hasAccess(["manager", "admin"], get(user, "roles", [])) && (
              <Checkbox onChange={handleCheckboxChange8}>
                Izoh qo'shish:
              </Checkbox>
            )}
            {showTextarea8 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_8: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },
    {
      key: "3",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 7) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>Telekommunikatsiya tarmog’i</b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 7),
              "description",
              ""
            )}
          >
            <b className="comment-added">Telekommunikatsiya tarmog’i</b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={3}>
            <Row>
              <Col md={12}>
                <h5>Provider:</h5>
              </Col>
              <Col md={12}>
                {get(item, "telecommunication[0].provider", "mavjud emas")}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                <h5>Contract:</h5>
              </Col>
              <Col md={12}>
                {get(item, "telecommunication[0].contract", "mavjud emas")}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                <h5>Document:</h5>
              </Col>
              <Col md={12}>
                <a
                  href={get(item, "telecommunication[0].document[0].path", "0")}
                  download
                >
                  Faylni Yuklash
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
              (get(item, "status") === 4 ||
              get(user, "roles[0].name") === "manager" ? (
                <Checkbox onChange={handleCheckboxChange7}>
                  Izoh qo'shish
                </Checkbox>
              ) : (
                <div></div>
              ))}
            {showTextarea7 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_7: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },
    {
      key: "4",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 9) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>Kiberxavfsizlikni ta’minlash</b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 9),
              "description",
              ""
            )}
          >
            <b className="comment-added">Kiberxavfsizlikni ta’minlash</b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={10}>
            <div
              dangerouslySetInnerHTML={{
                __html: get(item, "provide_cyber_security", ""),
              }}
            ></div>
          </Col>
          <Col md={2}>
            {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
              (get(item, "status") === 4 ||
              get(user, "roles[0].name") === "manager" ? (
                <Checkbox onChange={handleCheckboxChange9}>
                  Izoh qo'shish
                </Checkbox>
              ) : (
                <div></div>
              ))}
            {showTextarea9 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_9: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },
    {
      key: "5",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 10) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>Axborot xavfsizligiga tahdidlar</b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 10),
              "description",
              ""
            )}
          >
            <b className="comment-added">Axborot xavfsizligiga tahdidlar</b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={10}>
            <div
              dangerouslySetInnerHTML={{
                __html: get(item, "threats_to_information_security", ""),
              }}
            ></div>
          </Col>
          <Col md={2}>
            {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
              (get(item, "status") === 4 ||
              get(user, "roles[0].name") === "manager" ? (
                <Checkbox onChange={handleCheckboxChange10}>
                  Izoh qo'shish
                </Checkbox>
              ) : (
                <div></div>
              ))}
            {showTextarea10 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_10: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },
    {
      key: "6",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 11) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>Insident yuz berishi oqibatlari</b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 11),
              "description",
              ""
            )}
          >
            <b className="comment-added">Insident yuz berishi oqibatlari</b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={10}>
            <div
              dangerouslySetInnerHTML={{
                __html: get(item, "consequences_of_an_incident", ""),
              }}
            ></div>
          </Col>
          <Col md={2}>
            {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
              (get(item, "status") === 4 ||
              get(user, "roles[0].name") === "manager" ? (
                <Checkbox onChange={handleCheckboxChange11}>
                  Izoh qo'shish
                </Checkbox>
              ) : (
                <div></div>
              ))}
            {showTextarea11 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_11: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },
    {
      key: "7",
      label:
        get(item, "comment", []).find((itm) => itm.column_id === 12) ===
          undefined || get(user, "roles[0].name") === "admin" ? (
          <b>
            Xavfsizlikni ta’minlash <br /> tashkiliy va texnik choralari
          </b>
        ) : (
          <Tooltip
            placement="topLeft"
            title={get(
              get(item, "comment", []).find((item) => item.column_id === 12),
              "description",
              ""
            )}
          >
            <b className="comment-added">
              {" "}
              Xavfsizlikni ta’minlash <br /> tashkiliy va texnik choralari
            </b>
          </Tooltip>
        ),
      children: (
        <Row>
          <Col md={10}>
            <div
              dangerouslySetInnerHTML={{
                __html: get(
                  item,
                  "organizational_and_technical_measures_to_ensure_security",
                  ""
                ),
              }}
            ></div>
          </Col>
          <Col md={2}>
            {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
              (get(item, "status") === 4 ||
              get(user, "roles[0].name") === "manager" ? (
                <Checkbox onChange={handleCheckboxChange12}>
                  Izoh qo'shish
                </Checkbox>
              ) : (
                <div></div>
              ))}
            {showTextarea12 && (
              <Input
                type="textarea"
                onChange={($e) =>
                  setCommentData({
                    ...commentData,
                    column_12: get($e, "target.value", ""),
                  })
                }
              />
            )}
          </Col>
        </Row>
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Qayta yuborildi",
      duration: 2,
      color: "success",
    });
  };

  ////  modal
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalSuccess = () => {
    setIsModalOpen1(true);
  };

  const handleOkSuccess = () => {
    success(id);
    setIsModalOpen1(false);
  };

  const handleOk = () => {
    reject(id);
    setIsModalOpen(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className="">
        <div>
          {get(item, "status") === 1
            ? hasAccess(["user"], get(user, "roles", [])) && <div></div>
            : get(item, "status") === 2
            ? hasAccess(["admin"], get(user, "roles", [])) && (
                <div>
                  <Button
                    color="danger"
                    className="float-right  mt-4 mb-2"
                    onClick={showModal}
                  >
                    Inkor qilish
                  </Button>
                  <Button
                    color="success"
                    className="float-right mr-2 mt-4 mb-2"
                    onClick={() => {
                      success(id);
                    }}
                  >
                    Tasdiqlash
                  </Button>
                </div>
              )
            : get(item, "status") === 0
            ? hasAccess(["manager"], get(user, "roles", [])) && (
                <div>
                  <Button
                    color="danger"
                    className="float-right  mt-4 mb-2"
                    onClick={showModal}
                  >
                    Inkor qilish
                  </Button>
                  <Button
                    color="success"
                    className="float-right mr-2 mt-4 mb-2"
                    onClick={() => {
                      success(id);
                    }}
                  >
                    Tasdiqlash
                  </Button>
                </div>
              )
            : get(item, "status") === 3
            ? hasAccess(["user"], get(user, "roles", [])) && (
                <Link to={{ pathname: "/edit", state: id }}>
                  <Button className="mt-3 mb-2 float-right" color="info">
                    Qayta yuborish
                  </Button>
                </Link>
              )
            : ""}
        </div>

        <Modal
          title="Arizani tasdiqlash!"
          open={isModalOpen1}
          onOk={handleOkSuccess}
          onCancel={handleCancel1}
          cancelText="Bekor qilish"
          okText="Xa, Tasdiqlash"
          okType="success"
        >
          <FormGroup>
            <Label for="definition" className="mt-3">
              Muhimlilik
            </Label>
            <Input
              id="definition"
              name="definition"
              placeholder="please fill a content..."
              type="select"
              onChange={(evt) => {
                setImportant(evt.target.value);
              }}
            >
              {importance.map((imp, i) => (
                <option key={i} defaultValue={""} value={imp.id}>
                  {imp.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Modal>

        <Modal
          title="Arizani inkor qilish!"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Bekor qilish"
          okText="Xa, Inkor qilish"
          okType="danger"
        >
          <Row>
            <Col md={6}>
              <h4>Ariza Id:</h4>
            </Col>
            <Col md={6}>{item.id}</Col>

            <Col md={6}>
              <h4>Nomi:</h4>
            </Col>
            <Col md={6}>{item.name}</Col>

            <Col md={6}>
              <h4>Ariza yuboruvchi:</h4>
            </Col>
            <Col md={6}> {get(item, "staff[0].name")}</Col>
          </Row>

          <Label for="definition" className="mt-3">
            Qo'shimcha ma'lumot:
          </Label>
          <Input
            id="definition"
            name="definition"
            placeholder="please fill a content..."
            type="textarea"
            onChange={(evt) => {
              setReason(evt.target.value);
            }}
          />
        </Modal>

        <Row className="application-data">
          <div className="application-status-bade">
            {get(item, "status") === 1 ? (
              <Badge color="danger">inkor qilingan</Badge>
            ) : get(item, "status") === 0 ? (
              <Badge color="warning">kutilmoqda</Badge>
            ) : get(item, "status") === 2 ? (
              <Badge color="primary">manager_to_admin</Badge>
            ) : get(item, "status") === 3 ? (
              <Badge color="info">manager_to_user</Badge>
            ) : get(item, "status") === 4 ? (
              <Badge color="secondary">admin_to_manager</Badge>
            ) : (
              <Badge color="success">qabul qilingan</Badge>
            )}
          </div>
          <Col md={3} className="mt-4">
            <h3>{item.name}</h3>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                {get(item, "comment", []).find((itm) => itm.column_id === 1) ===
                  undefined || get(user, "roles[0].name") === "admin" ? (
                  <h4>
                    To'liq nomi{" "}
                    {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
                      (get(item, "status") === 4 ||
                      get(user, "roles[0].name") === "manager" ? (
                        <Checkbox onChange={handleCheckboxChange1} />
                      ) : (
                        <div></div>
                      ))}
                  </h4>
                ) : (
                  <Tooltip
                    placement="topLeft"
                    title={get(
                      get(item, "comment", []).find(
                        (item) => item.column_id === 1
                      ),
                      "description",
                      ""
                    )}
                  >
                    <h4 className="comment-added">
                      To'liq nomi{" "}
                      {hasAccess(
                        ["manager", "admin"],
                        get(user, "roles", [])
                      ) &&
                        (get(item, "status") === 4 ||
                        get(user, "roles[0].name") === "manager" ? (
                          <Checkbox onChange={handleCheckboxChange1} />
                        ) : (
                          <div></div>
                        ))}
                    </h4>
                  </Tooltip>
                )}
                {item.name}
                {showTextarea1 && (
                  <Input
                    type="textarea"
                    onChange={($e) =>
                      setCommentData({
                        ...commentData,
                        column_1: get($e, "target.value", ""),
                      })
                    }
                  />
                )}
              </Col>
              <Col md={12} className="mt-2">
                {get(item, "comment", []).find((itm) => itm.column_id === 2) ===
                  undefined || get(user, "roles[0].name") === "admin" ? (
                  <h4>
                    Subyekt nomi{" "}
                    {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
                      (get(item, "status") === 4 ||
                      get(user, "roles[0].name") === "manager" ? (
                        <Checkbox onChange={handleCheckboxChange2} />
                      ) : (
                        <div></div>
                      ))}
                  </h4>
                ) : (
                  <Tooltip
                    placement="topLeft"
                    title={get(
                      get(item, "comment", []).find(
                        (item) => item.column_id === 2
                      ),
                      "description",
                      ""
                    )}
                  >
                    <h4 className="comment-added">
                      Subyekt nomi{" "}
                      {hasAccess(
                        ["manager", "admin"],
                        get(user, "roles", [])
                      ) &&
                        (get(item, "status") === 4 ||
                        get(user, "roles[0].name") === "manager" ? (
                          <Checkbox onChange={handleCheckboxChange2} />
                        ) : (
                          <div></div>
                        ))}
                    </h4>
                  </Tooltip>
                )}
                {get(item, "subject.name", "mavjud emas")}
                {showTextarea2 && (
                  <Input
                    type="textarea"
                    onChange={($e) =>
                      setCommentData({
                        ...commentData,
                        column_2: get($e, "target.value", ""),
                      })
                    }
                  />
                )}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                {get(item, "comment", []).find((itm) => itm.column_id === 3) ===
                  undefined || get(user, "roles[0].name") === "admin" ? (
                  <h5>
                    Boshqaruvchi{" "}
                    {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
                      (get(item, "status") === 4 ||
                      get(user, "roles[0].name") === "manager" ? (
                        <Checkbox onChange={handleCheckboxChange3} />
                      ) : (
                        <div></div>
                      ))}
                  </h5>
                ) : (
                  <Tooltip
                    placement="topLeft"
                    title={get(
                      get(item, "comment", []).find(
                        (item) => item.column_id === 3
                      ),
                      "description",
                      ""
                    )}
                  >
                    <h4 className="comment-added">
                      Boshqaruvchi{" "}
                      {hasAccess(
                        ["manager", "admin"],
                        get(user, "roles", [])
                      ) &&
                        (get(item, "status") === 4 ||
                        get(user, "roles[0].name") === "manager" ? (
                          <Checkbox onChange={handleCheckboxChange3} />
                        ) : (
                          <div></div>
                        ))}
                    </h4>
                  </Tooltip>
                )}
                {get(item, "staff[0].name", "")}
                {showTextarea3 && (
                  <Input
                    type="textarea"
                    onChange={($e) =>
                      setCommentData({
                        ...commentData,
                        column_3: get($e, "target.value", ""),
                      })
                    }
                  />
                )}
              </Col>
              <Col md={12} className="mt-2">
                <h5>Ariza topshirilgan vaqt</h5>
                {moment(item.created_at).format("DD-MM-yyyy")}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                {get(item, "comment", []).find((itm) => itm.column_id === 4) ===
                  undefined || get(user, "roles[0].name") === "admin" ? (
                  <h5>
                    Sertifikat{" "}
                    {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
                      (get(item, "status") === 4 ||
                      get(user, "roles[0].name") === "manager" ? (
                        <Checkbox onChange={handleCheckboxChange4} />
                      ) : (
                        <div></div>
                      ))}
                  </h5>
                ) : (
                  <Tooltip
                    placement="topLeft"
                    title={get(
                      get(item, "comment", []).find(
                        (item) => item.column_id === 4
                      ),
                      "description",
                      ""
                    )}
                  >
                    <h5 className="comment-added">
                      Sertifikat{" "}
                      {hasAccess(
                        ["manager", "admin"],
                        get(user, "roles", [])
                      ) &&
                        (get(item, "status") === 4 ||
                        get(user, "roles[0].name") === "manager" ? (
                          <Checkbox onChange={handleCheckboxChange4} />
                        ) : (
                          <div></div>
                        ))}
                    </h5>
                  </Tooltip>
                )}
                {item.certificates === null ? (
                  "Mavjud emas"
                ) : (
                  <a href={get(item, "certificate[0].path", "")} download>
                    Mavjud:{" "}
                  </a>
                )}
                <i>
                  {get(item, "certificate[0].from")} -{" "}
                  {get(item, "certificate[0].to")}
                </i>
                {showTextarea4 && (
                  <Input
                    type="textarea"
                    onChange={($e) =>
                      setCommentData({
                        ...commentData,
                        column_4: get($e, "target.value", ""),
                      })
                    }
                  />
                )}
              </Col>
              <Col md={12} className="mt-2">
                {get(item, "comment", []).find((itm) => itm.column_id === 5) ===
                  undefined || get(user, "roles[0].name") === "admin" ? (
                  <h5>
                    Litsenziya{" "}
                    {hasAccess(["manager", "admin"], get(user, "roles", [])) &&
                      (get(item, "status") === 4 ||
                      get(user, "roles[0].name") === "manager" ? (
                        <Checkbox onChange={handleCheckboxChange5} />
                      ) : (
                        <div></div>
                      ))}
                  </h5>
                ) : (
                  <Tooltip
                    placement="topLeft"
                    title={get(
                      get(item, "comment", []).find(
                        (item) => item.column_id === 5
                      ),
                      "description",
                      ""
                    )}
                  >
                    <h5 className="comment-added">
                      Litsenziya{" "}
                      {hasAccess(
                        ["manager", "admin"],
                        get(user, "roles", [])
                      ) &&
                        (get(item, "status") === 4 ||
                        get(user, "roles[0].name") === "manager" ? (
                          <Checkbox onChange={handleCheckboxChange5} />
                        ) : (
                          <div></div>
                        ))}
                    </h5>
                  </Tooltip>
                )}
                {item.licenses === null ? (
                  "Mavjud emas"
                ) : (
                  <a href={get(item, "license[0].path", "")} download>
                    Mavjud:{" "}
                  </a>
                )}
                <i>
                  {get(item, "license[0].from")} - {get(item, "license[0].to")}
                </i>
                {showTextarea5 && (
                  <Input
                    type="textarea"
                    onChange={($e) =>
                      setCommentData({
                        ...commentData,
                        column_5: get($e, "target.value", ""),
                      })
                    }
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="application-data">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Row>

        <div>
          {showTextarea1 ||
          showTextarea2 ||
          showTextarea3 ||
          showTextarea4 ||
          showTextarea5 ||
          showTextarea6 ||
          showTextarea7 ||
          showTextarea8 ||
          showTextarea9 ||
          showTextarea10 ||
          showTextarea11 ||
          showTextarea12 === true ? (
            <Button
              color="warning"
              className="float-right mr-2 mt-4 mb-2"
              onClick={() => {
                comment(id);
              }}
            >
              Izoh yuborish
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    item: get(state, "PageReducer.data.get-one-item.result", {}),
    importance: get(state, "PageReducer.data.muhim.result.data", []),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
    user: get(state, "Auth.user", {}),
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
  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(View))
);
