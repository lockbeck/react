import React, { Component } from "react";
import { connect } from "react-redux";
import {  Pie } from 'react-chartjs-2';


class PieChart extends Component {

      
  
  render() {

     const options = {
        legend: {
          display: true,
          position: "right",
        },
      };

      const data = {
  labels: [`Ko'rilayotgan`, `Inkor qilingan`, `Reestrga kiritilgan`],
  datasets: [
    {
      label: '# of Votes',
      data: [13, 30, 57],
      backgroundColor: [
        'rgba(247, 101, 163, 1)',
        'rgba(161, 85, 185, 1)',
        'rgba(22, 191, 214, 1)',
      ],
    },
  ],
};
    return (
      <React.Fragment>
            <Pie data={data} options={options}/>
      </React.Fragment>
    );
  }
}

export default connect()(PieChart);
