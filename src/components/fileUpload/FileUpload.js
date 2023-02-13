import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, Label } from "reactstrap";
import { get } from "lodash";
import moment from "moment";
import { Modal } from "antd";
import { DatePicker, Space } from "antd";
import PagesApi from "../../pages/dashboards/PagesApi";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const FileUpload = ({ label, save = () => {}, ...props }) => {


  const path = "api/file";

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
          save(res.data);
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
        <Input
          id="certificates"
          name="certificates"
          type="button"
          defaultValue="Faylni Yuklang"
          onClick={showModal}
        />

        <Modal
          title="Faylni yuklang"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Bekor qilish"
          okText="Saqlash"
          okType="primary"
        >
          <Label for="name" className="mt-3">
            Fayl:
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

          <Label for="date" className="mt-3 d-block">
            Amal qilish muddati:
          </Label>
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={onRangeChange}
              format={dateFormat}
            />
          </Space>
          <Label for="name" className="mt-3 d-block">
            Tarif:
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

export default connect()(FileUpload);
