import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../assets/scss/allapplication/allapplication.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../../redux/pages/actions";
import PagesApi from "../../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table } from "antd";
import {DeleteOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const AddSubject = ({
  history,
  getItemsList,
  getSubjectType,
  subjectTypes,
  items,
  isFetched,
  total,
  item,
  ...props
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  const include = ["type"];

  useEffect(() => {
    getItemsList({ ...pagination, include});
    getSubjectType({...pagination});
  }, [pagination]);

  const path = "api/subject";

  const [formData, setFormData] = useState({
    name: "",
    address_legal:"",
    address_fact:"",
    subject_type_id: null
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
        if (res.status === 200) {
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
          getItemsList({ ...pagination, include });
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

console.log(subjectTypes);

  // modal confirmation
  const [modal, contextHolder] = Modal.useModal();
 

  items = items.map((item, index) => ({
    ...item,
    index: index + 15 * (pagination.current - 1) + 1,
    created_at: moment(get(item, "created_at")).format("DD-MM-yyyy"),
    update_at: moment(get(item, "update_at")).format("DD-MM-yyyy"),
    subject_type: get(item, "type.name", "")
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
        title: t("adress_legal"),
        dataIndex: "address_legal",
        key: "address_legal",
      },
      {
        title: t("adress_fact"),
        dataIndex: "address_fact",
        key: "address_fact",
      },
      {
        title: t("subject_type"),
        dataIndex: "subject_type",
        key: "subject_type",
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
            <p className="title-name">{t("subject")}</p>
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
          title="Yangi qo'shish:"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-data">
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("name")}:</Label>
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
                    <Label for="name">{t("adress_legal")}:</Label>
                    <Input
                      id="adress"
                      name="adress"
                      placeholder={t("adress")}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, address_legal: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("adress_fact")}:</Label>
                    <Input
                      id="adress"
                      name="adress"
                      placeholder={t("adress")}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, address_fact: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">{t("subject_type")}:</Label>
                    <Input
                      id="adress"
                      name="adress"
                      placeholder={t("subject_type")}
                      type="select"
                      onChange={(e) =>
                        setFormData({ ...formData, subject_type_id: e.target.value })
                      }
                      required
                    >
                      {subjectTypes.map((sub, i) => (
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
    subjectTypes: get(state, "PageReducer.data.subject-type-list.result.data", []),
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
          url: "/api/subject",
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

    getSubjectType: ({ current = 1, pageSize = 10, }) => {
      const storeName = "subject-type-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/subject-type",
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
  connect(mapStateToProps, mapDispatchToProps)(withRouter(AddSubject))
);
