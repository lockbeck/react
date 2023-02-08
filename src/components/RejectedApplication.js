import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from 'react-router-dom';
import {get} from "lodash";
import ApiActions from "../redux/pages/actions"
import PagesApi from "../pages/dashboards/PagesApi";
import {Button, Modal, Space, Table} from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Badge,Row,Col } from "reactstrap";

const RejectedApplication = ({
                            history,
                            getItemsList,
                            items,
                            isFetched,
                            total,
                        }) => {

    const append = ['certificates', ];
    const include = ['device', 'user'];
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 15,
    })

    useEffect(() => {
        getItemsList({...pagination, include, append, status: 0});
    }, [pagination]);

    const path = "api/application"



    const update = (params = {}, id) => {
        PagesApi.Update(path, id, params).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    const remove = (id) => {
        PagesApi.Delete(path, id).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

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
        index: index + (15 * (pagination.current - 1)) + 1,
        staff: get(item,"staff",[]).map((stuf)=>(get(stuf,"name"))),
        phone:get(item,"staff",[]).map((stuf)=>(get(stuf,"phone"))),
    }));
  
    const columns = [
        {
          title: "№",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Boshqaruvchi",
          dataIndex:"staff",
         // render: (item) => get(item, "name", "-"),
          key: "staff",
        },
        {
          title: "Status",
          dataIndex: "status",
          render: () => <Badge color="danger">rejected</Badge>,
          key: "status",
        },
        {
            title: "Updated Date",
            dataIndex: "update_at",
            render: (date) => moment(date).format('DD-MM-yyyy'),
            key: "update_at",
          },
        {
            title: "Created Date",
            dataIndex: 'created_at',
            render: (date) => moment(date).format('DD-MM-yyyy'),
            key: "created_at",
          },
          {
            title: "Contact",
            dataIndex: "phone",
            //render: (item) => get(item, "phone", "-"),
            key: "phone",
          },
        {
          title: "action",
          dataIndex: 'id',
          key: "action",
          render: (id) => {
            return (
              <Space size="middle">
                <Link to={{pathname:"/view", state: id}}>
                      <Button
                        shape="circle"
                        warning
                        icon={<EyeOutlined />}
                      />
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
                <Row>
                    <Col md={11}>
                        <p className="title-name">Inkor qilingan arizalar</p>
                        <span className="title-badge-count">{total}</span>
                  </Col>
                    {/* <Col md={1}>
                        <Button className="add-btn bg-success" onClick={showModal}>Add New</Button>
                    </Col> */}
                </Row>
                
                    <Table
                        columns={columns}
                        dataSource={items}
                        pagination={{...pagination, total}}
                        loading={!isFetched}
                        onChange={({current}) => {setPagination({...pagination, current})}}
                        scroll={{ x: "auto" }}
            />

                <Modal title="Edit Page" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <h1>Modal</h1>
                </Modal>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        items: get(state, 'PageReducer.data.item-list.result.data', []),
        item: get(state, 'PageReducer.data.get-one-item.result.data', {}),
        isFetched: get(state, 'PageReducer.data.item-list.isFetched', false),
        isFetchedItem: get(state, 'PageReducer.data.get-one-item.isFetched', false),
        total: get(state, 'PageReducer.data.item-list.result.total', 0),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getItemsList: ({current = 1, pageSize = 15, include = [], append = [], status}) => {
            const storeName = 'item-list';
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/api/application',
                    config: {
                        params: {
                            page: current,
                            // include: include.join(','),
                            // append: append.join(','),
                            'filter[status]': status,
                        },
                    },
                    storeName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RejectedApplication));
