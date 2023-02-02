import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Modal } from "antd";

const Device = () => {
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

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="device">Dasturiy apparat</Label>
        <Input
          id="device"
          name="device"
          type="button"
          onClick={showModal}
        />

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
            Dasturiy apparat nomi
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="phone" className="mt-3">
             Ishlab chiqaruvchi
          </Label>
          <Input
            id="phone"
            name="phone"
            required
            type="text"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="model" className="mt-3">
            Dasturiy apparat modeli
          </Label>
          <Input
            id="model"
            name="model"
            type="text"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="version" className="mt-3">
            Dasturiy apparat versiyasi
          </Label>
          <Input
            id="version"
            name="version"
            type="text"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="certificate" className="mt-3">
            Dasturiy apparat sertifikati
          </Label>
          <Input
            id="certificate"
            name="certificate"
            type="file"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default connect()(Device);
