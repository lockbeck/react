import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/scss/device/device.css";
import { Input, Label } from "reactstrap";
import { Modal } from "antd";
import PagesApi from "../pages/dashboards/PagesApi";
import ApiActions from "../redux/pages/actions";
import FileUpload from "./fileUpload/FileUpload";
import { withTranslation } from "react-i18next";
import { get } from "lodash";

const Device = ({ sendDeviceID = () => {}, getType, getManufacture, manufacturers, deviceType, ...props }) => {

  useEffect(() => {
    getType({ itm: "device" });
    getManufacture({ itm: "manufacture"})
  }, []);

  const path = "api/technique";
  const { t, i18n } = props;
  const [device, setDevice] = useState([]);

  const [data, setData] = useState({
    name: "",
    model: "",
    manufacturer: "",
    documents: [],
  });

  const saveDevice = (params) => {
    setData({ ...data, documents: params.map(({id}) => id) });
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
          sendDeviceID([...device, res.data]);
          setDevice([...device, res.data]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="device">{t("software")}</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
          <div className="device-span">{device.map((item, i)=>(<span key={i}>{item.name}{", "}</span>))}</div>
          </div>
        </div>
        <Modal
          title={t("add_software")}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText={t("cancel")}
          okText={t("add")}
          okType="primary"
        >
          <Label for="name" className="mt-1">
            {t("software_name")}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Label for="type" className="mt-3">
           {t("software_type")}
          </Label>
          <Input
            id="type"
            name="type"
            required
            type="select"
            onChange={(e) => setData({ ...data, model: e.target.value })}
          >
            {deviceType.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
          </Input>
          <Label for="manafucture" className="mt-3">
           {t("manafucture")}
          </Label>
          <Input
            id="manafucture"
            name="manafucture"
            required
            type="select"
            onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
          >
           {manufacturers.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
          </Input>
          <FileUpload label={t("software_certificate")} save={saveDevice} />
        </Modal>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    deviceType: get(state, "PageReducer.data.type-list.result", []),
    manufacturers: get(state, "PageReducer.data.manufacture-list.result", []),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(state, "PageReducer.data.get-one-item.isFetched", false),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getType: ({ itm}) => {
      const storeName = "type-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/item",
          config: {
            params: {
              "filter[type]": itm,
            },
          },
          storeName,
        },
      });
    },


    getManufacture: ({itm}) => {
      const storeName = "manufacture-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/api/item",
          config: {
            params: {
              "filter[type]": itm,
            },
          },
          storeName,
        },
      });
    },
  };
};

export default withTranslation("translation")(
  connect(mapStateToProps, mapDispatchToProps)(Device));
