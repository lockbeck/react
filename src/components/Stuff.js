import React, { useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import "../assets/scss/device/device.css";
import { Input, Label } from "reactstrap";
import { Modal } from "antd";
import PagesApi from "../pages/dashboards/PagesApi";
import { withTranslation } from "react-i18next";

const Stuff = ({ save = () => {}, ...props }) => {
  const path = "api/staff";
  const [emp, setEmp] = useState({});
  const [stuff, setStuff] = useState({
    name: "",
    phone: null,
    statue: "",
    definition: "",
  });

  const { t, i18n } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    create(stuff);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const remove = (id) => {
    PagesApi.Delete(path, id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const create = (params = {}) => {
    PagesApi.Create(path, params)
      .then((res) => {
        if (res.status === 201) {
          save(res.data);
          setEmp(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="name">{t("stuff")}</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <p className="device-span">{emp.name}</p>
          </div>
        </div>

        <Modal
          title={t("add_stuff")}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText={t("cancel")}
          okText={t("add")}
          okType="primary"
        >
          <Label for="name" className="mt-3">
            {t("name")}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) =>
              setStuff({ ...stuff, name: get(e, "target.value", "") })
            }
          />
          <Label for="phone" className="mt-3">
            {t("phone")}
          </Label>
          <Input
            id="phone"
            name="phone"
            required
            type="number"
            onChange={(e) =>
              setStuff({ ...stuff, phone: get(e, "target.value", null) })
            }
          />
          <Label for="name" className="mt-3">
            {t("statute")}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) =>
              setStuff({ ...stuff, statue: get(e, "target.value", "") })
            }
          />
          <Label for="name" className="mt-3">
            {t("definition")}
          </Label>
          <Input
            id="name"
            name="name"
            type="textarea"
            onChange={(e) =>
              setStuff({ ...stuff, definition: get(e, "target.value", "") })
            }
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default withTranslation("translation")(
  connect()(Stuff)
);
