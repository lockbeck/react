import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, Label } from "reactstrap";
import { get } from "lodash";
import moment from "moment";
import { Modal } from "antd";
import { DatePicker, Space } from "antd";
import "../../assets/scss/device/device.css";
import PagesApi from "../../pages/dashboards/PagesApi";
import { withTranslation } from "react-i18next";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const FileUpload2 = ({ label, save = () => {}, ...props }) => {

  const { t, i18n } = props;

  const path = "api/file";

  const[file, setFile] = useState([]);

  const [filter, setFilter] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
    files: [],
    definition: "",
  });

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFilter({
        ...filter,
        from: moment(dateStrings[0], "DD/MM/yyyy").toDate(),
        to: moment(dateStrings[1], "DD/MM/yyyy").toDate(),
      });
    } else {
      console.log("Clear");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setFilter({
      ...filter,
      from: moment(filter.from).format("DD-MM-yyyy"),
      to: moment(filter.to).format("DD-MM-yyyy"),
    });
    onSubmit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = () => {
    const data = new FormData();
    data.append("definition", filter.definition);
    data.append("from", moment(filter.from).format("DD-MM-yyyy"));
    data.append("to", moment(filter.to).format("DD-MM-yyyy"));
    data.append("files", get(filter, "files[0]"));
    create(data);
  };

  const create = (params) => {
    PagesApi.Create(path, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          save([...file, res.data]);
          setFile([...file, res.data])
        }
      })
      .catch((error) => {
        console.log(get(error, "response"));
      });
  };

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="certificates">{label}</Label>
        <div className="device-name-area" onClick={showModal}>
          <div className="device-name">
            <div className="device-span">{file.map((item, i)=>(<span key={i}>{item.title}{" "}</span>))}</div>
          </div>
        </div>

        <Modal
          title={t("upload_file")}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText={t("cancel")}
          okText={t("save")}
          okType="primary"
        >
          <Label for="name" className="mt-3">
            {t("file")}:
          </Label>
          <Input
            id="file"
            name="file"
            type="file"
            multiple={true}
            className="mt-2"
            onChange={($e) =>
                setFilter({ ...filter, files: get($e, "target.files", []) })
            }
          />

          
          <Label for="name" className="mt-3 d-block">
            {t("definition")}:
          </Label>
          <Input
            id="definition"
            name="definition"
            type="textarea"
            className="mt-2"
            onChange={($e) =>
              setFilter({ ...filter, definition: get($e, "target.value", "") })
            }
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default withTranslation("translation")(
  connect()(FileUpload2)
);
