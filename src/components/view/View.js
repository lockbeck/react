import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import {
  Button,
  Col,
  Row,
  Label,
  Input,
  Badge,
} from "reactstrap";
import { Tabs, notification } from "antd";
import moment from "moment";
import ApiActions from "../../redux/pages/actions";
import "../../assets/scss/view/view.css";
import { Modal } from "antd";
import PagesApi from "../../pages/dashboards/PagesApi";
import { hasAccess } from "../../helpers/authUtils";

const View = ({ getSingleItem, item, user, ...props }) => {
  const id = props.location.state;
  const onChange = (key) => {};

  const append = [];
  const include = ["device", "user"];

  const [reason, setReason] = useState("");

  useEffect(() => {
    getSingleItem({ id, include, append });
  }, [id]);

  const success = (id) => {
    PagesApi.Put(id, "success")
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

  console.log(item);

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
              <Col md={12}><i>{get(item,"device[0].name","mavjud emas")}</i></Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Ishlab chiqaruvchi:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item,"device[0].manufacturer","mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Model:</h5>
              </Col>
              <Col md={12}>
                <i>{get(item,"device[0].model","mavjud emas")}</i>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row>
              <Col md={12}>
                <h5>Version:</h5>
              </Col>
              <i><Col md={12}>{get(item,"device[0].version","mavjud emas")}</Col></i>
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
      label: <b>Xavfsizlikni ta’minlash <br/> tashkiliy va texnik choralari</b>,
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

  // const deviceOs = JSON.parse(get(item, 'device.os', '{}'));

  console.log(reason);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Qayta yuborildi",
      duration: 2,
      color: "success",
    });
  };

  ////  modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    reject(id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <React.Fragment>
      <div className="">
      
        <div>
        {get(item, "status") === 0 ? (
          hasAccess(['user'], get(user, 'roles', [])) &&
          <div></div>
        ) : get(item, "status") === 2 ? (
          hasAccess(['admin'], get(user, 'roles', [])) &&
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
        ):get(item, "status") === 1 ? (
          hasAccess(['manager'], get(user, 'roles', [])) &&
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
        ):("")}
        </div>
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

            {/* <Col md={6}>
              <h4>Sertifikat:</h4>
            </Col>
            <Col md={6}>
              {item.certificates === null ? "Mavjud emas" : item.certificates}
            </Col>
            <Col md={6}>
              <h4>Litsenziya:</h4>
            </Col>
            <Col md={6}>
              {item.licenses === null ? "Mavjud emas" : item.licenses}
            </Col> */}
          </Row>

          <Label for="definition" className="mt-3">
            Definition
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
              <Badge color="danger">rejected</Badge>
            ) : get(item, "status") === 1 ? (
              <Badge color="warning">waiting</Badge>
            ) : get(item, "status") === 2 ? (
              <Badge color="primary">proccess</Badge>
            ) : (
              <Badge color="success">success</Badge>
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
                    Mavjud
                  </a>
                )}
              </Col>
              <Col md={12} className="mt-2">
                <h5>Litsenziya</h5>
                {item.license_id === null ? (
                  "Mavjud emas"
                ) : (
                  <a href={get(item, "license.file", "")} download>
                    Mavjud
                  </a>
                )}
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
  return {
    item: get(state, "PageReducer.data.get-one-item.result", {}),
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
              // include: include.join(","),
              // append: append.join(","),
            },
          },
          storeName,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(View));
