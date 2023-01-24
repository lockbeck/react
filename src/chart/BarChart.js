import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { get } from 'lodash';

class BarChart extends Component {
  render() {
    const options = {
      legend: {
        display: true,
        position: "bottom",
      },
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
        },
      },
      responsive: true,
      scales: {
        xAxes: [],
        yAxes: [],
      },
    };

    const data = {
      labels: get(this.props, 'labels', []),
      datasets: get(this.props, 'datasets', []),
      // datasets: [
      //   {
      //     label: "Barcha arizalar",
      //     data: [12, 23, 45, 76, 34, 56],
      //     backgroundColor: "#165BAA",
      //   },
      //   {
      //     label: "Sertifikati mavjud arizalar",
      //     data: [43, 45, 64, 12, 33],
      //     backgroundColor: "#A155B9",
      //   },
      // ],
    };
    console.log(data);
    return (
      <React.Fragment>
        <Bar options={options} data={data} height={120} />
      </React.Fragment>
    );
  }
}

export default connect()(BarChart);
