import React, { Component } from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { get } from "lodash";

class PieChart extends Component {
  render() {
    console.log(this.props);
    const options = {
      legend: {
        display: true,
        position: "right",
      },
    };

    const data = {
      labels: [
        `Inkor qilingan`,
        `Yangi arizalar`,
        "Ko'rilayotgan arizalar",
        `Reestrga kiritilgan`,
      ],
      datasets: [
        {
          label: "# of Votes",
          data: get(this.props, "data"),
          backgroundColor: [
            "rgba(247, 101, 163, 1)",
            "rgba(161, 85, 185, 1)",
            "rgba(22, 191, 214, 1)",
            "#0745b0",
          ],
        },
      ],
    };
    return (
      <React.Fragment>
        <Pie data={data} options={options} />
      </React.Fragment>
    );
  }
}

export default connect()(PieChart);
