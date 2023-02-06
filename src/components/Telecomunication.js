import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, Label} from "reactstrap";
import "../assets/scss/device/device.css";
import { Modal } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import FileUpload from './fileUpload/FileUpload';

const Telecomunication = () => {
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

 const saveTelecomunication = (params) =>{

 }

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="subject">Foydalaniladigan tarmoq</Label>
        <div className="device-name-area">
          <div className="device-name">
            <span className="device-span">Name</span>
            <span className="device-cancel">
              <CloseOutlined style={{ fontSize: "10px", color: "#08c" }} />
            </span>
          </div>
          <div className="device-add" onClick={showModal}>
            <PlusOutlined />
          </div>
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
          <Label for="name" className="mt-3">
            Provayder nomi
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="contact" className="mt-3">
            Ishlab chiqaruvchi
          </Label>
          <Input
            id="contact"
            name="contact"
            required
            type="number"
            className="mb-2"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
         <FileUpload label={"Hujjat"} save={saveTelecomunication}/>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default connect()(Telecomunication);
