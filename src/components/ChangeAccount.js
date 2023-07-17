import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table } from "antd";
import {DeleteOutlined,ExclamationCircleOutlined, EditOutlined, KeyOutlined } from "@ant-design/icons";
import moment from "moment";
import {withTranslation} from "react-i18next"
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
  ...props
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const {t, i18n} = props

  useEffect(() => {
    getRoles();
    getItemsList({ ...pagination });
  }, [pagination]);

  const path = "api/profile";
  const path_p = "api/profile/change-password";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: null,
  });

  const [editData, setEditData] = useState({
    name: "",
    email: ""
  })

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  })

  const update = (params = {}) => {
    PagesApi.Update_p(path, params)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update_p = (params = {}) => {
    PagesApi.Update_p(path_p, params)
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const showModal3 = () => {
    setIsModalOpen3(true);
  };
  const handleOk = () => {
    create(formData);
    setIsModalOpen(false);
  };

  const handleOk2 = () => {
    update(editData);
    setIsModalOpen(false);
  };

  const handleOk3 = () => {
    update_p(password);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
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
      title: t("role"),
      dataIndex: "role",
      key: "role",
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
                  cancelText: t("cancel"),
                  onOk: () => {
                    remove(id);
                  },
                });
              }}
              icon={<DeleteOutlined style={{ color: "#f24b3f" }} />}
            ></Button>
             <Button shape="circle" warning icon={<EditOutlined />} onClick={showModal2} />
             <Button shape="circle" warning icon={<KeyOutlined />} onClick={showModal3} />
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
            <p className="title-name">{t("profile_setting")}</p>
          </Col>
          <Col md={1}>
            <Button className="add-btn bg-success" onClick={showModal}>
              {t("new")}
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
                {/* Modal for add new */}
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
                    <Label for="name">{t("user_name")}</Label>
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
              </Row>
            </Form>
          </div>
        </Modal>

        {/* Modal for Edit */}
        <Modal
        title={t("profile_setting")}
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <Row className="p-2">
          <Col lg={12} className="pb-2">
            <Label>{t("name")}</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={t("write_name")}
              defaultValue={get(items, "name", "")}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </Col>
          <Col lg={12} className="pb-2">
            <Label>{t("email")}:</Label>
            <Input
              type="text"
              id="email"
              name="email"
              defaultValue={get(items,"email","")}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          </Col>
        </Row>
      </Modal>

      {/* Modal for Change password */}

      <Modal
        title={t("change_password")}
        open={isModalOpen3}
        onOk={handleOk3}
        onCancel={handleCancel3}
      >
        <Row className="p-2">
          <Col lg={12} className="pb-2">
            <Label>{t("old_password")}</Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setPassword({ ...password, oldPassword: e.target.value })
              }
            />
          </Col>
          <Col lg={12} className="pb-2">
            <Label>{t("new_password")}:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
          </Col>
        </Row>
      </Modal>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: get(state, "PageReducer.data.profile-list.result.data", []),
    roles: get(state, "PageReducer.data.roles.result", []),
    item: get(state, "PageReducer.data.get-one-item.result", {}),
    isFetched: get(state, "PageReducer.data.profile-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.profile-list.result.total", 0),
  };
};

const mapDispatchToProps = (dispatch) => {

  return {

    getItemsList: ({ current = 1, pageSize = 10 }) => {
      const storeName = "profile-list";
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

export default withTranslation('translation')(connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangeAccount)));
