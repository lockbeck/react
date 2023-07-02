import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import { Button, Col, Row, Label, Input, Badge, FormGroup } from "reactstrap";
import { Tabs, notification } from "antd";
import moment from "moment";
import ApiActions from "../../redux/pages/actions";
import "../../assets/scss/view/view.css";
import { Modal } from "antd";
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

  const append = [];
  const include = ["certificate", "license"];

  const [reason, setReason] = useState("");
  const [important, setImportant] = useState("");

  useEffect(() => {
    getImportance();
    getSingleItem({ id, include, append });
  }, [id]);


  const success = (id) => {
    PagesApi.Put(id, "success",{important})
      .then((res) => {
        getSingleItem({ id, include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reject = (id) => {
    PagesApi.Put(id, "reject", { reason })
      .then((res) => {
        getSingleItem({ id, include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rester = (id) => {
    PagesApi.Put(id, "register")
      .then((res) => {
        getSingleItem({ id, include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(importance);

  const items = [
    {
      key: "1",
      label: <b>Foydalaniladigan qurilma</b>,
      children: (
        <Row>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Qurilma Nomi:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item, "device[0].name", "mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Ishlab chiqaruvchi:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item, "device[0].manufacturer", "mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Model:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item, "device[0].model", "mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Version:</h5>
              </Col>
              <i>
                <Col md={12}>
                  {get(item, "device[0].version", "mavjud emas")}
                </Col>
              </i>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Document:</h5>
              </Col>
              <Col md={12}>
                <a href={get(item, "device[0].document[0].file", 0)} download>
                  Faylni Yuklash
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },

    {
      key: "2",
      label: <b>MAI obyektining maqsadi</b>,
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: get(item, "scope_and_purpose", ""),
          }}
        ></div>
      ),
    },
    {
      key: "3",
      label: <b>Telekommunikatsiya tarmog’i</b>,
      children: (
        <Row>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Provider:</h5>
              </Col>
              <Col md={12}>
                {get(item, "telecommunication[0].provider", "mavjud emas")}
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Contract:</h5>
              </Col>
              <Col md={12}>
                {get(item, "telecommunication[0].contract", "mavjud emas")}
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Document:</h5>
              </Col>
              <Col md={12}>
                <a
                  href={get(item, "telecommunication[0].document[0].file", "0")}
                  download
                >
                  Faylni Yuklash
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      key: "4",
      label: <b>Kiberxavfsizlikni ta’minlash</b>,
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: get(item, "provide_cyber_security", ""),
          }}
        ></div>
      ),
    },
    {
      key: "5",
      label: <b>Axborot xavfsizligiga tahdidlar</b>,
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: get(item, "threats_to_information_security", ""),
          }}
        ></div>
      ),
    },
    {
      key: "6",
      label: <b>Insident yuz berishi oqibatlari</b>,
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: get(item, "consequences_of_an_incident", ""),
          }}
        ></div>
      ),
    },
    {
      key: "7",
      label: (
        <b>
          Xavfsizlikni ta’minlash <br /> tashkiliy va texnik choralari
        </b>
      ),
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: get(
              item,
              "organizational_and_technical_measures_to_ensure_security",
              ""
            ),
          }}
        ></div>
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
          {get(item, "status") === 0
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
                    onClick={()=>{
                      success(id)
                    }}
                  >
                    Tasdiqlash
                  </Button>
                </div>
              )
            : get(item, "status") === 1
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
                      rester(id);
                    }}
                  >
                    Tasdiqlash
                  </Button>
                </div>
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
            {get(item, "status") === 0 ? (
              <Badge color="danger">inkor qilingan</Badge>
            ) : get(item, "status") === 1 ? (
              <Badge color="warning">kutilmoqda</Badge>
            ) : get(item, "status") === 2 ? (
              <Badge color="primary">jarayonda</Badge>
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
                <h5>To'liq nomi</h5>
                {item.name}
              </Col>
              <Col md={12} className="mt-2">
                <h5>Subyekt nomi</h5>
                {get(item, "subject", "mavjud emas")}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                <h5>Boshqaruvchi</h5>
                {get(item, "staff[0].name")}
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
                <h5>Sertifikat</h5>
                {item.certificate_id === null ? (
                  "Mavjud emas"
                ) : (
                  <a href={get(item, "certificate.file", "")} download>
                    Mavjud:{" "}
                  </a>
                )}
                <i>
                  {get(item, "certificate.from")} -{" "}
                  {get(item, "certificate.to")}
                </i>
              </Col>
              <Col md={12} className="mt-2">
                <h5>Litsenziya</h5>
                {item.license_id === null ? (
                  "Mavjud emas"
                ) : (
                  <a href={get(item, "license.file", "")} download>
                    Mavjud:{" "}
                  </a>
                )}
                <i>
                  {get(item, "license.from")} - {get(item, "license.to")}
                </i>
              </Col>
            </Row>
          </Col>
        </Row>

        {get(item, "status") === 0 ? (
          <div className="application-data">
            <h4 className="rejected-cause-title">Inkor qilinish sababi</h4>
            <p className="mt-2">{item.reason}</p>
          </div>
        ) : (
          <div></div>
        )}

        <Row className="application-data">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Row>
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
              // append: append.join(","),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(View));
