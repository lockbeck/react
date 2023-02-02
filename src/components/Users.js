import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const Users = ({
  history,
  getItemsList,
  getSingleItem,
  items,
  item,
  isFetched,
  total,
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getItemsList({ ...pagination });
  }, [pagination]);

  const path = "api/users";

  const update = (params = {}, id) => {
    PagesApi.Update(path, id, params)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const remove = (id) => {
    PagesApi.Delete(path, id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  console.log(items);

  items = items.map((item, index) => ({
    ...item,
    index: index + 10 * (pagination.current - 1) + 1,
    created_at: moment(get(item, "created_at")).format("DD-MM-yyyy"),
    update_at: moment(get(item, "update_at")).format("DD-MM-yyyy"),
  }));

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "action",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space size="middle">
            <Link to={{ pathname: "/view", state: id }}>
              <Button shape="circle" icon={<EyeOutlined />} />
            </Link>
            <Button
              shape="circle"
              onClick={() => {
                remove(id);
              }}
              icon={<DeleteOutlined style={{ color: "#f24b3f" }} />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="application-content">
        <Row>
          <Col md={11}>
            <p className="title-name">Foydalanuvchilar</p>
            <span className="title-badge-count">{total}</span>
          </Col>
          <Col md={1}>
            <Button className="add-btn bg-success" onClick={showModal}>
              Yangi
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={items}
          pagination={{ ...pagination, total }}
          loading={!isFetched}
          onChange={({ current }) => {
            setPagination({ ...pagination, current });
          }}
          scroll={{ x: "auto" }}
        />

        <Modal
          title="Edit Page"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-data">
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">Ism</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="arizachi nomini kiriting..."
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="email..."
                      type="email"
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="password">Parol</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="password..."
                      type="password"
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="password_confirmation">
                      Parolni tasdiqlang
                    </Label>
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="parolni tasdiqlang"
                      type="password"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
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
    getItemsList: ({ current = 1, pageSize = 10 }) => {
      const storeName = "item-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/users",
          config: {
            params: {
              page: current,
            },
          },
          storeName,
        },
      });
    },

    getSingleItem: ({ id }) => {
      const storeName = "get-one-item";
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `/api/users/${id}`,
          config: {
            params: {},
          },
          storeName,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));
