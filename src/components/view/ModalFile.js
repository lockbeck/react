import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";


const ModalFile = () => {
  // date-range
  const [filter, setFilter] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    endDate: new Date(),
  });

  return (
    <React.Fragment>
      <div className="modal-data">
        <Label for="name" className="mt-3">
          Ismi
        </Label>
        <Input id="name" name="name" type="file" />
        <Label for="phone" className="mt-3">
          Amal qilish muddati
        </Label>
        <RangePicker
          onChange={onRangeChange}
          defaultValue={[
            dayjs(
              moment(get(filter, "startDate")).format("DD-MM-yyyy"),
              dateFormat
            ),
            dayjs(
              moment(get(filter, "endDate")).format("DD-MM-yyyy"),
              dateFormat
            ),
          ]}
          format={dateFormat}
        />
      </div>
    </React.Fragment>
  );
};

export default connect()(ModalFile);
