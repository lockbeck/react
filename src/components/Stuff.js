import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Modal } from "antd";

const Stuff = () => {
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
        <Label for="name">Xodim</Label>
        <Input
          id="name"
          name="name"
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
            Ismi
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
            Telefon
          </Label>
          <Input
            id="phone"
            name="phone"
            required
            type="number"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="name" className="mt-3">
            Ustavi
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="name" className="mt-3">
            definition
          </Label>
          <Input
            id="name"
            name="name"
            type="textarea"
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default connect()(Stuff);
