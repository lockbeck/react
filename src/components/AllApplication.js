import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import "../assets/scss/allapplication/allapplication.css";
import { withRouter, Link } from 'react-router-dom';
import {get} from "lodash";
import ApiActions from "../redux/pages/actions";
import PagesApi from "../pages/dashboards/PagesApi";
import {Button, Modal, Space, Table} from "antd";
import { CloseOutlined, EyeOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Badge,Row,Col } from "reactstrap";
import ModalData from "./view/ModalData";

const AllApplication = ({
                            history,
                            getItemsList,
                            getSingleItem,
                            items,
                            item,
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
        getItemsList({...pagination, include, append});
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

    const showModal = (id) => {
      getSingleItem({id})
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    console.log(items);

    items = items.map((item, index) => ({
        ...item,
        index: index + (15 * (pagination.current - 1)) + 1,
        created_at: moment(get(item, 'created_at')).format('DD-MM-yyyy'),
        update_at:  moment(get(item, 'update_at')).format('DD-MM-yyyy'),
        status: get(item, 'status')===0 ? <Badge color="danger">rejected</Badge>: get(item, 'status')===1 ? <Badge color="warning">waiting</Badge> :  get(item, 'status')===2 ? <Badge color="primary">proccess</Badge> :  <Badge color="success">success</Badge>,
    }));

    const columns = [
        {
          title: "№",
          dataIndex: "index",
          key: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
            title: "Device Id",
            dataIndex: "device_id",
            key: "device_id",
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
          key: "status",
        },
        {
            title: "Updated Date",
            dataIndex: "update_at",
            key: "update_at",
          },
        {
            title: "Created Date",
            dataIndex: 'created_at',
            key: "created_at",
          },
        {
          title: "action",
          dataIndex: 'id',
          key: "action",
          render: (id) => {
            return (
              <Space size="middle">
                {/* <Button
                  onClick={()=>showModal(id)}
                  shape="circle"
                  warning
                  icon={<EditOutlined />}
                />
                <Button
                  // onClick={()=>showModal(id)}
                  shape="circle"
                  warning
                  icon={<CheckOutlined style={{color: "#00b300"}} />}
                />
                <Button
                  shape="circle"
                  warning
                  icon={<CloseOutlined style={{color: "#e63900"}}/>}
                /> */}

                  <Link to={{pathname:"/view", state: id}}>
                      <Button
                        shape="circle"
                        warning
                        icon={<EyeOutlined />}
                      />
                  </Link>
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
                        <p className="title-name">Barcha arizalar</p>
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
        item: get(state, 'PageReducer.data.get-one-item.result', {}),
        isFetched: get(state, 'PageReducer.data.item-list.isFetched', false),
        isFetchedItem: get(state, 'PageReducer.data.get-one-item.isFetched', false),
        total: get(state, 'PageReducer.data.item-list.result.total', 0),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getItemsList: ({current = 1, pageSize = 15, include = [], append = []}) => {
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
                        },
                    },
                    storeName,
                },
            });
        },

        getSingleItem: ({id, include = [], append = []}) => {
          const storeName = 'get-one-item';
          dispatch({
              type: ApiActions.GET_ONE.REQUEST,
              payload: {
                  url: `/api/application/${id}`,
                  config: {
                      params: {
                          include: include.join(','),
                          append: append.join(','),
                      },
                  },
                  storeName,
              },
          });
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllApplication));
