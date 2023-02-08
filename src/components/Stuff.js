import React, { useState } from "react";
import { connect } from "react-redux";
import { constant, get } from "lodash";
import "../assets/scss/device/device.css";
import { Input, Label } from "reactstrap";
import { Modal } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import PagesApi from "../pages/dashboards/PagesApi";

const Stuff = ({ save = () => {}, ...props }) => {
  const path = "api/staff";
  const [emp, setEmp] = useState({});
  const [stuff, setStuff] = useState({
    name: "",
    phone: null,
    statue: "",
    definition: "",
  });

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
        <Label for="name">Xodim</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <p className="device-span">{emp.name}</p>
            {/* <span
              className="device-cancel"
              // onClick={() => {
              //   remove(emp.id);
              // }}
            >
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
          <Label for="name" className="mt-3">
            Ismi
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
            Telefon
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
            Ustavi
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
            definition
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

export default connect()(Stuff);
