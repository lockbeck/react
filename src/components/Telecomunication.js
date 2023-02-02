import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Modal } from "antd";

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

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="subject">Foydalaniladigan tarmoq</Label>
        <Input
          id="subject_file"
          name="subject_file"
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
            // onChange={(evt) => {
            //   setDefinition(evt.target.value);
            // }}
          />
          <Label for="name" className="mt-3">
            Tarmoq sertifikati
          </Label>
          <Input
            id="name"
            name="name"
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

export default connect()(Telecomunication);
