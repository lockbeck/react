import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import { get } from "lodash";
import moment from "moment";
import ApiActions from "../../redux/pages/actions";
import line from "../../assets/images/line.svg";
import line2 from "../../assets/images/line2.svg";
import line3 from "../../assets/images/line3.svg";
import line4 from "../../assets/images/line4.svg";
import line5 from "../../assets/images/line5.svg";
import "../../assets/scss/dashboard/index.css";
import BarChart from "../../chart/BarChart";
import PieChart from "../../chart/PieChart";
// import HorizonBarChart from "../../chart/HorizonBarChart";
// import TopSubChart from "../../chart/TopSubChart";
// import TopMAI from "../../chart/TopMAI";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { hasAccess } from "../../helpers/authUtils";
const dateFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

const DefaultDashboard = ({
  history,
  getData,
  item,
  isFetched,
  total,
  user,
}) => {
  //bar-chart-data
  const [labels, setLabels] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [datasets, setDatasets] = useState([]);

  // date-range
  const [filter, setFilter] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    endDate: new Date(),
  });

  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFilter({
        startDate: moment(dateStrings[0], "DD/MM/yyyy").toDate(),
        endDate: moment(dateStrings[1], "DD/MM/yyyy").toDate(),
      });
      console.log(dateStrings[0], dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  useEffect(() => {
    getData({
      startDate: moment(get(filter, "startDate")).format("DD-MM-yyyy"),
      endDate: moment(get(filter, "endDate")).format("DD-MM-yyyy"),
    });
  }, [filter]);

  useEffect(() => {
    let status = [];
    get(item, "status", []).forEach((element) => {
      status[get(element, "status")] = get(element, "total");
    });

    setStatusData(status);

    const certificate = get(item, "certificate", []);
    const allInMont = get(item, "allInMont", []);
    
    const allInMontLabels = allInMont.map(
      ({ year, month }) => `${month} ${year}`
    );
    const certificateLabels = certificate.map(
      ({ year, month }) => `${month} ${year}`
    );
    const label =
      get(allInMontLabels, "length", 0) > get(certificateLabels, "length", 0)
        ? allInMontLabels
        : certificateLabels;
    setLabels(label);

    let allInMontData = {};
    allInMont.forEach(({ year, month, total }) => {
      allInMontData[`${month} ${year}`] = total;
    });

    let certificateData = {};
    certificate.forEach(({ year, month, total }) => {
      certificateData[`${month} ${year}`] = total;
    });

    const allInMontDataset = [];
    const certificateDataset = [];
    label.forEach((val) => {
      allInMontDataset.push(allInMontData[val] | 0);
      certificateDataset.push(certificateData[val] | 0);
    });

    setDatasets([
      {
        label: "Sertifikati mavjud arizalar",
        backgroundColor: "#A155B9",
        data: certificateDataset,
        barThickness: 50,
      },
      {
        label: "Barcha arizalar",
        backgroundColor: "#165BAA",
        data: allInMontDataset,
        barThickness: 50,
      },
    ]);
  }, [item]);

 
  return (
    <React.Fragment>
      <div className="">
        <Row>
          <Col>
            <div className="page-title-box">
              {hasAccess(['admin', 'manager'], get(user, 'roles', [])) && <Row>
                <Col lg={7}>
                  <h4 className="page-title">{user.name}</h4>
                </Col>
                <Col lg={5} className="mt-lg-3 mt-md-0"></Col>
              </Row>}
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="statistics">
            <Card className="card-statistics">
              <CardBody className="card-body-tab">
                <div className="icon-div1">
                  <i className="fa fa-users fa-2x text-info"></i>
                </div>
                <h4>Arizalar</h4>
                <p>Barcha arizalar</p>
                <i className="fa fa-arrow-up text-dark mr-1"></i>
                <span>{item.applications}</span>
                <img src={line} alt="" />
              </CardBody>
            </Card>
          </Col>
          <Col className="statistics">
            <Card className="card-statistics">
              <CardBody className="card-body-tab">
                <div className="icon-div2">
                  <i className="fa fa-users fa-2x text-primary"></i>
                </div>
                <h4>Jarayondagi</h4>
                <p>Ko'rilayotgan arizalar</p>
                <i className="fa fa-arrow-up text-dark mr-1"></i>
                <span>{statusData[2]}</span>
                <img src={line2} alt="" />
              </CardBody>
            </Card>
          </Col>

          <Col className="statistics">
            <Card className="card-statistics">
              <CardBody className="card-body-tab">
                <div className="icon-div3">
                  <i className="fa fa-user-plus fa-2x text-success"></i>
                </div>
                <h4>Qabul qilingan</h4>
                <p>Qabul qilingan arizalar</p>
                <i className="fa fa-arrow-up text-dark mr-1"></i>
                <span>{statusData[3]}</span>
                <img src={line3} alt="" />
              </CardBody>
            </Card>
          </Col>
          <Col className="statistics">
            <Card className="card-statistics">
              <CardBody className="card-body-tab">
                <div className="icon-div4">
                  <i className="fa fa-users fa-2x text-warning"></i>
                </div>

                
                {hasAccess(['admin', 'manager'], get(user, 'roles', [])) && <h4>Ko'rilmagan</h4>}
                <p>Ko'rilmagan arizalar</p>
                <i className="fa fa-arrow-down text-dark mr-1"></i>
                <span>{statusData[1]}</span>
                <img src={line4} alt="" />
              </CardBody>
            </Card>
          </Col>
          <Col className="statistics">
            <Card className="card-statistics">
              <CardBody className="card-body-tab">
                <div className="icon-div5">
                  <i className="fa fa-user-times fa-2x text-danger"></i>
                </div>
                <h4>Inkor qilingan</h4>
                <p>Inkor qilingan arizalar</p>
                <i className="fa fa-arrow-up text-dark mr-1"></i>
                <span>{statusData[0]}</span>
                <img src={line5} alt="" />
              </CardBody>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="chart-area">
              <div className="p-3">
                <Row className="d-flex justify-content-between">
                  <Col lg={6}>
                    <h4 className="text-muted">Barcha arizalar</h4>
                  </Col>
                  <Col lg={2}>
                    {/* <Input id="timeSelect" type="select" className="p-1">
                      <option value="">oy</option>
                      <option value="">3 oy</option>
                      <option value="">6 oy</option>
                      <option value="">1 yil</option>
                    </Input> */}
                  </Col>
                  <Col lg={4}>
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        onChange={onRangeChange}
                        defaultValue={[
                          dayjs(
                            moment(get(filter, "startDate")).format(
                              "DD-MM-yyyy"
                            ),
                            dateFormat
                          ),
                          dayjs(
                            moment(get(filter, "endDate")).format("DD-MM-yyyy"),
                            dateFormat
                          ),
                        ]}
                        format={dateFormat}
                      />
                    </Space>
                  </Col>
                </Row>
                <BarChart labels={labels} datasets={datasets} />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="chart-area">
              <CardBody>
                <h2>{item.applications}</h2>
                <h5>Kelib tushgan arizalar</h5>
                <hr />
                <PieChart data={statusData}/>
              </CardBody>
            </Card>
          </Col>

          {/* <Col lg={4}>
            <Card className="horizontal-charts">
              <CardBody>
                <h4>Sertifikat va litsenziyalar bo'yicha</h4>
                <HorizonBarChart />
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="horizontal-charts">
              <CardBody>
                <h4>Top Subyektlar</h4>
                <TopSubChart />
              </CardBody>
            </Card>
          </Col> */}

          {/* <Col lg={4}>
            <Card className="horizontal-charts">
              <CardBody>
                <h4>TopMAI</h4>
                <TopMAI />
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    items: get(state, "PageReducer.data.item-list.result.data", []),
    item: get(state, "PageReducer.data.get-dashboard-item.result", {}),
    isFetched: get(state, "PageReducer.data.item-list.isFetched", false),
    isFetchedItem: get(
      state,
      "PageReducer.data.get-dashboard-item.isFetched",
      false
    ),
    total: get(state, "PageReducer.data.item-list.result.total", 0),
    user: get(state, "Auth.user", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: ({ startDate = "", endDate = "" }) => {
      const storeName = "get-dashboard-item";
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `/api/dash`,
          config: {
            params: {
              between: `${startDate},${endDate}`,
            },
          },
          storeName,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DefaultDashboard));
