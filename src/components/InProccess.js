import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table, notification, DatePicker } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Badge, Row, Col } from "reactstrap";
import { hasAccess } from "../helpers/authUtils";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const InProccess = ({
  history,
  getItemsList,
  items,
  isFetched,
  total,
  user,
}) => {
  const append = ["certificates"];
  const include = ["device", "user"];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  useEffect(() => {
    getItemsList({ ...pagination, include, append, status: 2 });
  }, [pagination]);

  const [api, contextHolder] = notification.useNotification();

  const [apiReject, contextHolderReject] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: `Sizning  arizangiz qabul qilindi`,
      duration: 2,
      style: {
        backgroundColor: "#6bed7a",
      },
    });
  };

  const openNotificationReject = () => {
    apiReject.open({
      message: `Sizning  arizangiz inkor qilindi`,
      duration: 2,
      style: {
        backgroundColor: "#f59590",
        color: "black",
      },
    });
  };

  const [filter, setFilter] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFilter({
        ...filter,
        from: moment(dateStrings[0], "DD/MM/yyyy").toDate(),
        to: moment(dateStrings[1], "DD/MM/yyyy").toDate(),
      });
    } else {
      console.log("Clear");
    }
  };

  const success = (id) => {
    PagesApi.Put(id, "success")
      .then((res) => {
        getItemsList({ ...pagination, include, append, status: 2 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update = (params = {}, id) => {
    PagesApi.Put(id, "edit", params)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reject = (id) => {
    PagesApi.Put(id, "reject")
      .then((res) => {
        getItemsList({ ...pagination, include, append, status: 2 });
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  items = items.map((item, index) => ({
    ...item,
    index: index + 15 * (pagination.current - 1) + 1,
    staff: get(item, "staff", []).map((stuf) => get(stuf, "name")),
    phone: get(item, "staff", []).map((stuf) => get(stuf, "phone")),
  }));

  const columns = [
    {
      title: "T/r",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "MAI nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Boshqaruvchi",
      dataIndex: "staff",
      // render: (item) => get(item, "name", "-"),
      key: "staff",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: () => <Badge color="primary">proccess</Badge>,
      key: "status",
    },
    {
      title: "O'zgartirilgan vaqt",
      dataIndex: "update_at",
      render: (date) => moment(date).format("DD-MM-yyyy"),
      key: "update_at",
    },
    {
      title: "Kiritilgan vaqt",
      dataIndex: "created_at",
      render: (date) => moment(date).format("DD-MM-yyyy"),
      key: "created_at",
    },
    {
      title: "Aloqa",
      dataIndex: "phone",
      //render: (item) => get(item, "phone", "-"),
      key: "phone",
    },
    {
      title: "action",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space size="middle">
            {/* {hasAccess(["admin"], get(user, "roles", [])) && (
              <Button
                onClick={() => {
                  success(id);
                  openNotification();
                }}
                shape="circle"
                warning
                icon={<CheckOutlined style={{ color: "#00b300" }} />}
              />
            )}
            <Button
              onClick={() => {
                reject(id);
                openNotificationReject();
              }}
              shape="circle"
              warning
              icon={<CloseOutlined style={{ color: "#e63900" }} />}
            /> */}

            <Link to={{ pathname: "/view", state: id }}>
              <Button shape="circle" warning icon={<EyeOutlined />} />
            </Link>
            {/* <Button
              onClick={showModal}
              shape="circle"
              warning
              icon={<EditOutlined />}
            /> */}
          </Space>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="application-content">
        {contextHolder}
        {contextHolderReject}
        <Row className="mb-3">
          <Col md={8}>
            <p className="title-name">Jarayondagi arizalar</p>
            <span className="title-badge-count">{total}</span>
          </Col>
          <Col md={4}>
            <Space direction="vertical" size={12}>
              <RangePicker onChange={onRangeChange} format={dateFormat} />
            </Space>
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
          <h1>Modal</h1>
        </Modal>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    items: get(state, "PageReducer.data.item-list.result.data", []),
    item: get(state, "PageReducer.data.get-one-item.result.data", {}),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
    user: get(state, "Auth.user", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getItemsList: ({
      current = 1,
      pageSize = 15,
      include = [],
      append = [],
      status,
    }) => {
      const storeName = "item-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/application",
          config: {
            params: {
              page: current,
              // include: include.join(','),
              // append: append.join(','),
              "filter[status]": status,
            },
          },
          storeName,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InProccess));
