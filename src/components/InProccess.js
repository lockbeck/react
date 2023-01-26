import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from 'react-router-dom';
import {get} from "lodash";
import ApiActions from "../redux/pages/actions"
import PagesApi from "../pages/dashboards/PagesApi";
import {Button, Modal, Space, Table, notification} from "antd";
import { CloseOutlined,CheckOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Badge,Row,Col } from "reactstrap";
import ModalData from "./view/ModalData";

const InProccess = ({
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
        getItemsList({...pagination, include, append, status: 2});
    }, [pagination]);



    const [api, contextHolder] = notification.useNotification();

    const [apiReject, contextHolderReject] = notification.useNotification();

    const openNotification = () => {
      api.open({
        message: `Sizning  arizangiz qabul qilindi`,
        duration: 2,
        style:{
          backgroundColor: "#6bed7a"
        }
      });
    };

    const openNotificationReject = () => {
      apiReject.open({
        message: `Sizning  arizangiz inkor qilindi`,
        duration: 2,
        style:{
          backgroundColor: "#f59590",
          color:"black"
        }
      });
    };



    const success = (id) => {
      PagesApi.Put(id, "success").then((res) => {
        getItemsList({...pagination, include, append, status: 2});
      }).catch((error) => {
          console.log(error);
      })
  }

  const reject = (id) => {
    PagesApi.Put(id, "reject").then((res) => {
      getItemsList({...pagination, include, append, status: 2});
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

    const inproccess={};
    

    items = items.map((item, index) => ({
        ...item,
        index: index + (15 * (pagination.current - 1)) + 1,
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
          dataIndex:"user",
          render: (item) => get(item, "name", "-"),
          key: "user",
        },
        {
          title: "Status",
          dataIndex: "status",
          render: () => <Badge color="primary">proccess</Badge>,
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
          // {
          //   title: "Contact",
          //   dataIndex: "user",
          //   render: (item) => get(item, "phone", "-"),
          //   key: "user",
          // },
        {
          title: "action",
          dataIndex: "id",
          key: "action",
          render: (id) => {
            return (
              <Space size="middle">

                   <Button
                  onClick={() => { success(id); openNotification();}}
                  shape="circle"
                  warning
                  icon={<CheckOutlined style={{color: "#00b300"}} />}
                />
                <Button
                   onClick={()=>{reject(id); openNotificationReject();}}
                  shape="circle"
                  warning
                  icon={<CloseOutlined style={{color: "#e63900"}}/>}
                />

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
                 {contextHolder}
                 {contextHolderReject}
                <Row>
                    <Col md={11}>
                        <p className="title-name">Jarayondagi arizalar</p>
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
                    <ModalData/>
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
                            include: include.join(','),
                            append: append.join(','),
                            'filter[status]': status,
                        },
                    },
                    storeName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InProccess));
