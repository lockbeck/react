import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from "react-router-dom";
import { filter, get } from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import { Button, Modal, Space, Table, DatePicker } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Badge, Row, Col } from "reactstrap";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const AllApplication = ({
  history,
  getItemsList,
  getSingleItem,
  items,
  item,
  isFetched,
  total,
}) => {
  const append = ["staff", "telecommunication", "device"];
  const include = ["certificate", "license"];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  const [filter, setFilter] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  useEffect(() => {
    getItemsList({ ...pagination, append, include, ...filter });
  }, [pagination, filter]);

  const path = "api/application";


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

  const showModal = (id) => {
    getSingleItem({ id });
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
    created_at: moment(get(item, "created_at")).format("DD-MM-yyyy"),
    update_at: moment(get(item, "update_at")).format("DD-MM-yyyy"),
    staff: get(item, "staff", []).map((stuf) => get(stuf, "name")),
    phone: get(item, "staff", []).map((stuf) => get(stuf, "phone")),
    status:
      get(item, "status") === 0 ? (
        <Badge color="danger">rejected</Badge>
      ) : get(item, "status") === 1 ? (
        <Badge color="warning">waiting</Badge>
      ) : get(item, "status") === 2 ? (
        <Badge color="primary">proccess</Badge>
      ) : (
        <Badge color="success">success</Badge>
      ),
  }));

  const columns = [
    {
      title: "T/r",
      dataIndex: "index",
      key: "id",
    },
    {
      title: "MAI nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Boshqaruvchi",
      dataIndex: "staff",
      // render: (stuf) => get(stuf, "name", "-"),
      key: "staff",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "O'zgartirilgan vaqt",
      dataIndex: "update_at",
      key: "update_at",
    },
    {
      title: "Kiritilgan vaqt",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Aloqa",
      dataIndex: "phone",
      // render: (item) => get(item, "phone", "-"),
      key: "phone",
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
          </Space>
        );
      },
    },
  ];
  console.log(filter);
  return (
    <React.Fragment>
      <div className="application-content">
        <Row className="mb-3">
          <Col md={8}>
            <p className="title-name">Barcha arizalar</p>
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
          <h1>modal</h1>
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
    getItemsList: ({
      current = 1,
      pageSize = 15,
      include = [],
      append = [],
      from= "",
      to= ""
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
              from:moment(from).format("yyyy-MM-DD"),
              to:moment(to).format("yyyy-MM-DD")
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AllApplication));
