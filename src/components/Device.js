import React, { useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/device/device.css";
import { Input, Label } from "reactstrap";
import { Modal } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import PagesApi from "../pages/dashboards/PagesApi";
import FileUpload from './fileUpload/FileUpload';
import { get } from "lodash";

const Device = ({ sendDeviceID = () => {}, ...props }) => {

  const path = "api/device";

  const[device, setDevice] = useState({});

  const [data, setData] = useState({
    name: "",
    manufacturer: "",
    model: "",
    version: "",
    documents: [],
  });

  const saveDevice = (params)=>{
    setData({...data, documents: [get(params, "id", "")]})
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

  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          sendDeviceID(res.data)
          setDevice(res.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="device">Dasturiy apparat</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <span className="device-span">{device.name}</span>
            {/* <span className="device-cancel">
              <CloseOutlined style={{ fontSize: "10px", color: "#08c" }} />
            </span> */}
          </div>
          {/* <div className="device-add" onClick={showModal}>
            <PlusOutlined />
          </div> */}
        </div>
        <Modal
          title="Xodim qo'shish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Bekor qilish"
          okText="Qo'shish"
          okType="primary"
        >
          <Label for="name" className="mt-1">
            Dasturiy apparat nomi
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Label for="manafucture" className="mt-3">
            Ishlab chiqaruvchi
          </Label>
          <Input
            id="manafucture"
            name="manafucture"
            required
            type="text"
            onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
          />
          <Label for="model" className="mt-3">
            Dasturiy apparat modeli
          </Label>
          <Input
            id="model"
            name="model"
            type="text"
            onChange={(e) => setData({ ...data, model: e.target.value })}
          />
          <Label for="version" className="mt-3">
            Dasturiy apparat versiyasi
          </Label>
          <Input
            id="version"
            name="version"
            type="text"
            onChange={(e) => setData({ ...data, version: e.target.value })}
          />
           <FileUpload label={"Dasturiy apparat sertifikati"} save={saveDevice}/>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default connect()(Device);
