import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, Label, Row, Col } from "reactstrap";
import "../assets/scss/device/device.css";
import { Modal, Checkbox } from "antd";
import { withTranslation } from "react-i18next";
import FileUpload from "./fileUpload/FileUpload";
import PagesApi from "../pages/dashboards/PagesApi";
import { get } from "lodash";
import FileUpload2 from "./fileUpload/FileUpload2";

const Telecomunication = ({ sendTelId = () => {}, ...props }) => {
  const { t, i18n } = props;
  const path = "api/telecommunication";

  const [telecomunication, setTelecomunication] = useState({});

  const [data, setData] = useState({
    name: "",
    network_topology: "",
    contract: null,
    connect_net: false,
    connect_nat: false,
    points_connect_net: null,
    provider_count: null,
  });

  const saveTelecomunication = (params) => {
    setData({ ...data, contract: get(params[0], "id", "") });
  };

  const saveNetworkTopology = (params) => {
    setData({ ...data, network_topology: get(params[0], "id", "") });
  };

  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          sendTelId(res.data);
          setTelecomunication(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    create(data);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="subject">{t("used_network")}</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <span className="device-span pt-2">{telecomunication.name}</span>
          </div>
        </div>

        <Modal
          title={t("add_network")}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText={t("cancel")}
          okText={t("add")}
          okType="primary"
        >
          <Row>
            <Col className="mt-2" lg={12}>
              <Label for="name" className="mt-1">
                {t("network_name")}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Col>
            <Col className="mt-2" lg={12}>
              <FileUpload
                label={t("network_topology")}
                save={saveNetworkTopology}
              />
            </Col>
           
            {/* <Col className="mt-4 mb-3" lg={6}>
              <Label for="count" className="mr-5">
                {t("isConnectOnetNet")}:
              </Label>
              <Input
                id="name"
                name="name"
                type="checkbox"
                onChange={(e) =>
                  setData({ ...data, connect_nat: e.target.checked })
                }
              />
            </Col>
            <Col className="mt-4 mb-3" lg={6}>
              <Label for="count" className="mr-5">
                {t("isConnectNetwork")}:
              </Label>
              <Input
                id="name"
                name="name"
                type="checkbox"
                onChange={(e) =>
                  setData({ ...data, connect_net: e.target.checked })
                }
              />
            </Col> */}
          {/* {data.connect_net === true ? */}
          {/* {data.connect_net === true ? ( */}
          <Col className="mt-2" lg={12}>
                <Label for="name" className="mt-1">
                  {t("name_provide")}
                </Label>
                {/* <Input
                  id="name"
                  name="name"
                  type="number"
                  min = "0"
                  step="1"
                  onChange={(e) =>
                    setData({ ...data, provider_count: e.target.value })
                  }
                /> */}
                <Input
                  required={true}
                  id="stuff"
                  name="stuff"
                  type="select"
                  // onChange={($e) =>
                  //   setApplication({
                  //     ...application,
                  //     staffs: [get($e, "target.value", "")],
                  //   })
                  // }
                >
                   <option key='1' value="UZtelekom">
                      UZtelekom
                    </option>
                  {/* {stuffs.map((stuff, i) => (
                   
                  ))} */}
                </Input>
                
              </Col>
              <Col className="mt-2" lg={12}>
                <Label for="count" className="mt-1">
                  {t("count_node")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="number"
                  min = "0"
                  step="1"
                  onChange={(e) =>
                    setData({ ...data, points_connect_net: e.target.value })
                  }
                />
              </Col>
           
          
            {/* ) : (
              <div></div>
            )} */}

            <Col className="mt-2" lg={12}>
                <FileUpload2 label={t("contract")} save={saveTelecomunication} />
              </Col>
            {/* {data.connect_net === true ? (
             
            ) : (
              <div></div>
            )} */}
          </Row>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default withTranslation("translation")(connect()(Telecomunication));
