import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table } from "antd";
import { EyeOutlined, DeleteOutlined,ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const ChangeAccount = ({
  history,
  getItemsList,
  getRoles,
  roles,
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
    getRoles();
    getItemsList({ ...pagination });
  }, [pagination]);

  const path = "api/profile";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: null,
  });

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
        if (res.status === 204) {
          getItemsList({ ...pagination });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          getItemsList({ ...pagination });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////  modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    create(formData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(roles);


  // modal confirmation
  const [modal, contextHolder] = Modal.useModal();

  console.log(items);
 
  const dataProfile = [
    {
      id: get(items, "id", null),
      name: get(items, "name" ,""),
      email: get(items, "email", ""),
      phone: get(items, "phone", null),
      date: moment(get(items, "created_at", ""), "DD/MM/yyyy").toDate(),
      role: get(items, "roles[0].name", "")
    }
  ]

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Foydalanuvchi nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pochta",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Subject",
    //   dataIndex: "subject",
    //   key: "subject",
    // },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Roli",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Qo'shilgan vaqti",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space size="middle">
            <Button
              shape="circle"
              onClick={() => {
                Modal.confirm({
                  title: `O'chirishni xohlaysizmi`,
                  icon: <ExclamationCircleOutlined />,
                  //content: 'Bla bla ...',
                  okText: 'OK',
                  cancelText: 'Cancel',
                  onOk: () => {
                    remove(id);
                  },
                });
              }}
              icon={<DeleteOutlined style={{ color: "#f24b3f" }} />}
            ></Button>
             <Button shape="circle" warning icon={<EditOutlined />} />
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
            <p className="title-name">Profil sozlamalari</p>
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
          dataSource={dataProfile}
          pagination={{ ...pagination, total }}
          loading={!isFetched}
          onChange={({ current }) => {
            setPagination({ ...pagination, current });
          }}
          scroll={{ x: "auto" }}
        />

        <Modal
          title="Foydalanuvchi uchun  login va parol yaratish:"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-data">
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">Foydalanuvchi Ismi:</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="arizachi nomini kiriting..."
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="email">Pochta:</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="email..."
                      type="email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="password">Parol:</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="parol..."
                      type="password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="role">Foydalanuvchi roli:</Label>
                    <Input
                      id="role"
                      name="role"
                      type="select"
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      {roles.map((rol, i) => (
                        <option key={i} value={rol.id}>
                          {rol.name}
                        </option>
                      ))}
                    </Input>
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
  console.log(state);
  return {
    items: get(state, "PageReducer.data.item-list.result.data", []),
    roles: get(state, "PageReducer.data.roles.result", []),
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
          url: "/api/profile",
          config: {
            params: {
              page: current,
            },
          },
          storeName,
        },
      });
    },

    getRoles: () => {
      const storeName = "roles";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/roles",
          storeName,
        },
      });
    },


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangeAccount));
