import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table } from "antd";
import { EyeOutlined, DeleteOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const Users = ({
  history,
  getItemsList,
  getRoles,
  getSubject,
  subjects,
  roles,
  items,
  item,
  isFetched,
  total,
  ...props
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const include = ["subject"];

  useEffect(() => {
    getRoles();
    getSubject({include});
    getItemsList({ ...pagination, include });
  }, [pagination]);

  const path = "api/users";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    subject_id: null,
    role: null,
  });

  const { t, i18n } = props

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
          getItemsList({ ...pagination, include });
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
          setFormData({
            ...formData,
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            subject_id: null,
            role: null,
          });
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

  console.log(items);


  // modal confirmation
  const [modal, contextHolder] = Modal.useModal();
 

  items = items.map((item, index) => ({
    ...item,
    index: index + 10 * (pagination.current - 1) + 1,
    created_at: moment(get(item, "created_at")).format("DD-MM-yyyy"),
    update_at: moment(get(item, "update_at")).format("DD-MM-yyyy"),
    subject: get(item, "subject.name", "")
  }));

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "id",
    },
    {
      title: t("user_name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: t("add_time"),
      dataIndex: "created_at",
      key: "created_at",
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
                  title: t("want_delete"),
                  icon: <ExclamationCircleOutlined />,
                  //content: 'Bla bla ...',
                  okText: 'OK',
                  cancelText: t('cancel'),
                  onOk: () => {
                    remove(id);
                  },
                });
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
            <p className="title-name">{t("users")}</p>
          </Col>
          <Col md={1}>
            <Button className="add-btn bg-success" onClick={showModal}>
             {t("new")}
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
                    <Label for="name">{t("user_name")}:</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t("write_name")}
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
                    <Label for="email">{t("email")}:</Label>
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
                    <Label for="password">{t("parol")}:</Label>
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
                    <Label for="password_confirmation">{t("parol_confirmation")}:</Label>
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="parol..."
                      type="password"
                      onChange={(e) =>
                        setFormData({ ...formData, password_confirmation: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="role">{t("user_role")}:</Label>
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
                <Col sm={12}>
                  <FormGroup>
                    <Label for="subject">{t("subject_base")}:</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="select"
                      onChange={(e) =>
                        setFormData({ ...formData, subject_id: e.target.value })
                      }
                    >
                      {subjects.map((sub, i) => (
                        <option key={i} value={sub.id}>
                          {sub.name}
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
    subjects: get(state, "PageReducer.data.subject-list.result.data", []),
    roles: get(state, "PageReducer.data.roles.result", []),
    item: get(state, "PageReducer.data.get-one-item.result", {}),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
  };
};

const mapDispatchToProps = (dispatch) => {

  return {

    getItemsList: ({ current = 1, pageSize = 10, include = [] }) => {
      const storeName = "item-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/users",
          config: {
            params: {
              page: current,
              include: include.join(","),
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

    getSubject: ({ current = 1, pageSize = 10, }) => {
      const storeName = "subject-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/subject",
          config: {
            params: {
              page: current,
            },
          },
          storeName,
        },
      });
    },

  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Users))
);
