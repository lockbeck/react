import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, Label} from "reactstrap";
import "../assets/scss/device/device.css";
import { Modal } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import FileUpload from './fileUpload/FileUpload';
import { get } from "lodash";
import PagesApi from "../pages/dashboards/PagesApi";

const Telecomunication = ({ sendTelId = () => {}, ...props }) => {

  const path = "api/telecommunication";

  const[telecomunication, setTelecomunication] = useState({});

  const [data, setData] = useState({
    provider: "",
    contract: "",
    documents: [],
  });

  const saveTelecomunication = (params)=>{
    setData({...data, documents: [get(params, "id", "")]})
  };

  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          sendTelId(res.data)
          setTelecomunication(res.data)
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
    create(data)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="subject">Foydalaniladigan tarmoq</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <span className="device-span">{telecomunication.provider}</span>
            {/* <span className="device-cancel">
              <CloseOutlined style={{ fontSize: "10px", color: "#08c" }} />
            </span> */}
          </div>
          {/* <div className="device-add" onClick={showModal}>
            <PlusOutlined />
          </div> */}
        </div>

        <Modal
          title="Tarmoq qo'shish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Bekor qilish"
          okText="Qo'shish"
          okType="primary"
        >
          <Label for="provider" className="mt-3">
            Provayder nomi
          </Label>
          <Input
            id="provider"
            name="provider"
            type="text"
            onChange={(e) => setData({ ...data, provider: e.target.value })}
          />
          <Label for="contract" className="mt-3">
            Kontrakt
          </Label>
          <Input
            id="contract"
            name="contract"
            required
            type="text"
            className="mb-2"
            onChange={(e) => setData({ ...data, contract: e.target.value })}
          />
         <FileUpload label={"Hujjat"} save={saveTelecomunication}/>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default connect()(Telecomunication);
