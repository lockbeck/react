import React, { useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/device/device.css";
import { Input, Label } from "reactstrap";
import { Modal } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import PagesApi from "../pages/dashboards/PagesApi";
import FileUpload from "./fileUpload/FileUpload";
import { withTranslation } from "react-i18next";
import { get } from "lodash";

const Subject = ({ sendSubjectId = () => {}, ...props }) => {

  const { t, i18n } = props;
    
  const path = "api/subject";

  const [subject, setSubject] = useState({});

  const [data, setData] = useState({
    name: "",
    type: "",
    definition: "",
    documents: [],
  });

  const saveSubject = (params) => {
    setData({ ...data, documents: [get(params, "id", "")] });
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
          sendSubjectId(res.data);
          setSubject(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="subject">{t("mai_subject")}</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <span className="device-span">{subject.name}</span>
            {/* <span className="device-cancel">
              <CloseOutlined style={{ fontSize: "10px", color: "#08c" }} />
            </span> */}
          </div>
          {/* <div className="device-add" onClick={showModal}>
            <PlusOutlined />
          </div> */}
        </div>
        <Modal
          title={t("add_subject")}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Bekor qilish"
          okText="Qo'shish"
          okType="primary"
        >
          <Label for="name" className="mt-1">
            {t("subject_name")}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Label for="subject_type" className="mt-3">
            {t("subject_type")}
          </Label>
          <Input
            id="subject_type"
            name="subject_type"
            className="mb-2"
            required
            type="select"
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option></option>
            <option>mulkchilik</option>
            <option>ijara shartnoma</option>
            <option>boshqa</option>
          </Input>
          {data.type === "ijara shartnoma" ? (
            <FileUpload
              label={"Ijara Shartnoma"}
              save={saveSubject}
            />
          ) : (
            <div></div>
          )}
          <Label for="definition" className="mt-3">
            {t("definition")}
          </Label>
          <Input
            id="definition"
            name="definition"
            type="text"
            onChange={(e) => setData({ ...data, definition: e.target.value })}
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default withTranslation("translation")(
  connect()(Subject)
);
