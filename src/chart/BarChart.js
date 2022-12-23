import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {

  
  
  render() {
      const options = {
        legend: {
          display: true,
          position: "bottom"
        },
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        scales: {
    xAxes: [{ stacked: true }],
    yAxes: [{ stacked: true }]
  },
      };
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
  labels,
  datasets: [
    {
      label: 'Qabul qilingan arizalar',
      data:[12,23,45,76,34,56],
      backgroundColor: '#165BAA',
    },
    {
      label: 'Sertifikati mavjud arizalar',
      data: [43,45,64,12,33,55],
      backgroundColor: '#A155B9',
    },
  ],
};
    return (
      <React.Fragment>
<Bar options={options} data={data} height={120}/>
        
      </React.Fragment>
    );
  }
}

export default connect()(BarChart);
