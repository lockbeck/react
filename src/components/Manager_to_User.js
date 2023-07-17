import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table, DatePicker } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Badge, Row, Col } from "reactstrap";
import { hasAccess } from "../helpers/authUtils";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Manager_to_User = ({
  history,
  getItemsList,
  items,
  isFetched,
  total,
  user,
}) => {
  const append = [ "staff", "telecommunication", "device", "certificate", "license",];
  const include = [];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  useEffect(() => {
    getItemsList({ ...pagination, include, append, status: 3, ...filter });
  }, [pagination, filter]);

  const path = "api/application";

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
      title: "Ariza holati",
      dataIndex: "status",
      render: () => <Badge color="info">manager_to_user</Badge>,
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
      title: "Aloqa uchun",
      dataIndex: "phone",
      //render: (item) => get(item, "phone", "-"),
      key: "phone",
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space size="middle">
            <Link to={{ pathname: "/view", state: id }}>
              <Button shape="circle" warning icon={<EyeOutlined />} />
            </Link>
            {hasAccess(["user"], get(user, "roles", [])) && 
            <Link to={{ pathname: "/edit", state: id }}>
              <Button shape="circle" warning icon={<EditOutlined />} />
            </Link>}
          </Space>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="application-content">
        <Row>
          <Col md={8}>
            <p className="title-name">Manager_to_User</p>
            <span className="title-badge-count">{total}</span>
          </Col>
          <Col md={4}>
            <Space direction="vertical" size={12} className="float-right">
              <RangePicker onChange={onRangeChange} format={dateFormat} placeholder={["...dan", "...gacha"]} defaultValue={[moment(get(filter, "from", ""), "DD/MM/yyyy"), moment(get(filter, "to",""), "DD/MM/yyyy")]}/>
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
      from="",
      to=""
    }) => {
      const storeName = "item-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/application",
          config: {
            params: {
              page: current,
              include: include.join(','),
              append: append.join(','),
              "filter[status]": status,
              from:moment(from).format("yyyy-MM-DD"),
              to:moment(to).format("yyyy-MM-DD")
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
)(withRouter(Manager_to_User));
