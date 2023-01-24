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
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
} from "reactstrap";
import { Tabs } from "antd";
import moment from "moment";
import ApiActions from "../../redux/pages/actions";
import "../../assets/scss/view/view.css";
import { Modal } from "antd";
import PagesApi from "../../pages/dashboards/PagesApi";

const View = ({ getItemsList, getSingleItem, item, ...props }) => {
  const id = props.location.state;
  const onChange = (key) => {};

  const append = [];
  const include = ["device", "user"];

  useEffect(() => {
    getSingleItem({ id, include, append });
  }, [id]);

  const success = (id) => {
    PagesApi.Put(id, "success")
      .then((res) => {
        getItemsList({ include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reject = (id) => {
    PagesApi.Put(id, "reject")
      .then((res) => {
        getItemsList({ include, append });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const items = [
    {
      key: "1",
      label: `Texnik xarakteristika`,
      children: (
        <Row>
          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">RAM{" | "}HDD</CardTitle>
                <CardText>
                  {JSON.parse(get(item, "device.ram", "{}")).key}
                  {" | "}
                  {JSON.parse(get(item, "device.hdd", "{}")).key}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">CPU</CardTitle>
                <CardText>
                  {JSON.parse(get(item, "device.cpu", "{}")).key}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">OS</CardTitle>
                <CardText>
                  {JSON.parse(get(item, "device.os", "{}")).key}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Server Case</CardTitle>
                <CardText>
                  {JSON.parse(get(item, "device.case", "{}")).key}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ),
    },

    {
      key: "2",
      label: `Xatolik yoki ishdan chiqqan taqdirda`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Telekommunikatsiya tarmog’i`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: "4",
      label: `Kiberxavfsizlikni ta’minlash`,
      children: `Content of Tab Pane 4`,
    },
    {
      key: "5",
      label: `Axborot xavfsizligiga tahdidlar`,
      children: `Content of Tab Pane 5`,
    },
    {
      key: "6",
      label: `Insident yuz berishi
      oqibatlari`,
      children: `Content of Tab Pane 6`,
    },
    {
      key: "7",
      label: `Litsenziyalar`,
      children: `Content of Tab Pane 7`,
    },
    {
      key: "8",
      label: `Sertifikatlar`,
      children: `Content of Tab Pane 8`,
    },
  ];

  // const deviceOs = JSON.parse(get(item, 'device.os', '{}'));

  console.log(id);
  console.log(item);
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
      <div className="">
        {get(item, "status") === 0 ? (
          <Button
            color="warning"
            className="float-right  mt-4 mb-2"
            onClick={showModal}
          >
            Qayta yuborish
          </Button>
        ) : (
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
        )}
        {/* <Button
          color="danger"
          className="float-right  mt-4 mb-2"
          onClick={showModal}
        >
          Inkor qilish
        </Button>
        <Button color="success" className="float-right mr-2 mt-4 mb-2" onClick={() => { success(id)}}>
          Tasdiqlash
        </Button> */}

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
            <Col md={6}>{get(item, "user.name")}</Col>

            <Col md={6}>
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
            </Col>
          </Row>

          <Label for="definition" className="mt-3">
            Definition
          </Label>
          <Input
            id="definition"
            name="definition"
            placeholder="please fill a content..."
            type="textarea"
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
                {get(item, "user.subject")}
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Row>
              <Col md={12}>
                <h5>Boshqaruvchi</h5>
                {get(item, "user.name")}
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
                {item.certificates === null ? "Mavjud emas" : "Mavjud"}
              </Col>
              <Col md={12} className="mt-2">
                <h5>Subyekt topshirgan arizalar soni</h5>
              </Col>
            </Row>
          </Col>
        </Row>

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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getItemsList: ({
      current = 1,
      pageSize = 15,
      include = [],
      append = [],
    }) => {
      const storeName = "item-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/application",
          config: {
            params: {
              page: current,
              include: include.join(","),
              append: append.join(","),
            },
          },
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(View));
