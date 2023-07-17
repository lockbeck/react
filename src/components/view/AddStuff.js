import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../assets/scss/allapplication/allapplication.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import {config} from "../../utils/config";
import ApiActions from "../../redux/pages/actions";
import PagesApi from "../../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import FileUpload from "../fileUpload/FileUpload";

const AddStuff = ({
  history,
  getItemsList,
  getSingleItem,
  items,
  isFetched,
  total,
  stuff,
  ...props
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  useEffect(() => {
    getItemsList({ ...pagination });
  }, [pagination]);

  const path = "api/staff";

  const baseUrl = config.API_URL

  const [formData, setFormData] = useState({
    name: "",
    phone: null,
    statue: "",
    definition: "",
    file_1: "",
    file_2: "",
    file_3: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    phone: null,
    statue: "",
    definition: "",
    file_1: "",
    file_2: "",
    file_3: "",
  });

  useEffect(() => {
    setEditData({ ...editData, ...stuff });
  }, [stuff]);

  
  const { t, i18n } = props;

  const update = (params = {}, id) => {
    PagesApi.Update(path, id, params)
      .then((res) => {
        if (res.status === 200) {
          getItemsList({ ...pagination });
        }
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

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const showModal = () => {
    setIsModalOpen1(true);
  };
  const showModalEdit = (id) => {
    getSingleItem({id});
   setIsModalOpen2(true);
 };
 const showModalView = (id) => {
  getSingleItem({id});
 setIsModalOpen3(true);
};
  const handleOk = () => {
    create(formData);
    setIsModalOpen1(false);
  };
  const handleOkEdit = () => {
    update(editData, get(stuff, "id" ,""))
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
  };
  const handleCancelEdit = () => {
    setIsModalOpen2(false);
  };
  const handleCancelView = () => {
    setIsModalOpen3(false);
  };

  // modal confirmation
  const [modal, contextHolder] = Modal.useModal();

  items = items.map((item, index) => ({
    ...item,
    index: index + 15 * (pagination.current - 1) + 1,
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
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("statue"),
      dataIndex: "statue",
      key: "statue",
    },
    {
      title: t("definition"),
      dataIndex: "definition",
      key: "definition",
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space size="middle">
            <Button shape="circle" warning icon={<EditOutlined />} onClick={()=> showModalEdit(id)}/>
            <Button shape="circle" warning icon={<EyeOutlined />} onClick={()=> showModalView(id)}/>
            <Button
              shape="circle"
              onClick={() => {
                Modal.confirm({
                  title: t("want_delete"),
                  icon: <ExclamationCircleOutlined />,
                  //content: 'Bla bla ...',
                  okText: "OK",
                  cancelText: t("cancel"),
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
            <p className="title-name">{t("add_stuff")}</p>
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

                  {/* Create Modal */}
        <Modal
          title="Yangi qo'shish:"
          open={isModalOpen1}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-data">
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("user_fullname")}:</Label>
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
                    <Label for="name">{t("phone")}:</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="statue">{t("statue")}:</Label>
                    <Input
                      id="statue"
                      name="statue"
                      placeholder={t("")}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, statue: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <FileUpload
                      label={t("recruitment_order")}
                      save={(params) =>
                        setFormData({
                          ...formData,
                          file_1: get(params[0], "path", ""),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <FileUpload
                      label={t("information_about_education")}
                      save={(params) =>
                        setFormData({
                          ...formData,
                          file_2: get(params[0], "path", ""),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <FileUpload
                      label={t("certificate")}
                      save={(params) =>
                        setFormData({
                          ...formData,
                          file_3: get(params[0], "path", ""),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="definition">{t("definition")}:</Label>
                    <Input
                      id="definition"
                      name="definition"
                      placeholder={t("")}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, definition: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>

                      {/* Edit Modal */}
        <Modal
          title="O'zgartirish:"
          open={isModalOpen2}
          onOk={handleOkEdit}
          onCancel={handleCancelEdit}
        >
          <div className="modal-data">
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("user_fullname")}:</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t("write_name")}
                      type="text"
                      defaultValue={get(stuff, "name", "")}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("phone")}:</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      defaultValue={get(stuff, "phone", "")}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="statue">{t("statue")}:</Label>
                    <Input
                      id="statue"
                      name="statue"
                      placeholder={t("")}
                      type="text"
                      defaultValue={get(stuff, "statue","")}
                      onChange={(e) =>
                        setEditData({ ...editData, statue: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <FileUpload
                      label={t("recruitment_order")}
                      save={(params) =>
                        setEditData({
                          ...editData,
                          file_1: get(params[0], "path", ""),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <FileUpload
                      label={t("information_about_education")}
                      save={(params) =>
                        setEditData({
                          ...editData,
                          file_2: get(params[0], "path", ""),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <FileUpload
                      label={t("certificate")}
                      save={(params) =>
                        setEditData({
                          ...editData,
                          file_3: get(params[0], "path", ""),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="definition">{t("definition")}:</Label>
                    <Input
                      id="definition"
                      name="definition"
                      placeholder={t("")}
                      type="text"
                      defaultValue={get(stuff, "definition", "")}
                      onChange={(e) =>
                        setEditData({ ...editData, definition: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>


        {/* Show Modal */}
        <Modal
          title="ko'rish"
          open={isModalOpen3}
          onCancel={handleCancelView}
        >
          <div className="modal-data">
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("user_fullname")}:</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t("write_name")}
                      type="text"
                      defaultValue={get(stuff, "name", "")}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("phone")}:</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      defaultValue={get(stuff, "phone", "")}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="statue">{t("statue")}:</Label>
                    <Input
                      id="statue"
                      name="statue"
                      placeholder={t("")}
                      type="text"
                      defaultValue={get(stuff, "statue","")}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                  <Label for="recruitment_order" className="mr-3">{t("recruitment_order")}:</Label>
                    <a href={`${config.API_URL}${get(stuff, "file_1","")}`} target="_blank">Faylni ko'rish</a>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                  <Label for="information_about_education" className="mr-3">{t("information_about_education")}:</Label>
                    <a href={`${config.API_URL}${get(stuff, "file_2","")}`} target="_blank">Faylni ko'rish</a>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                  <Label for="certificate" className="mr-3">{t("certificate")}:</Label>
                    <a href={`${config.API_URL}${get(stuff, "file_3","")}`} target="_blank">Faylni ko'rish</a>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="definition">{t("definition")}:</Label>
                    <Input
                      id="definition"
                      name="definition"
                      placeholder={t("")}
                      type="text"
                      defaultValue={get(stuff, "definition", "")}
                      disabled
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
  console.log(state);
  return {
    items: get(state, "PageReducer.data.item-list.result.data", []),
    stuff: get(state, "PageReducer.data.get-one-staff.result", {}),
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
          url: "/api/staff",
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
      const storeName = "get-one-staff";
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `/api/staff/${id}/`,
          config: {
            params: {},
          },
          storeName,
        },
      });
    },
  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(AddStuff))
);
