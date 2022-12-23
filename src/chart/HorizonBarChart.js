import React, { Component } from "react";
import { connect } from "react-redux";
import { HorizontalBar } from 'react-chartjs-2';

class HorizonBarChart extends Component {

  
  
  render() {
     
    const dataHorBar = {
      labels: ['Nov', 'Oct', 'Sep', 'Aug', 'Jul'],
      datasets: [
        {
          label: 'Ariza',
          backgroundColor: '#165DFF',
          hoverBackgroundColor: 'rgba(36,107,206,0.3)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [120, 59, 80, 81, 56]
        },
        {
          label: 'Sertifikat',
          backgroundColor: '#0FC6C2',
          hoverBackgroundColor: 'rgba(0,204,153,0.3)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56]
        },
         {
          label: 'Litsenziya',
          backgroundColor: '#F7BA1E',
          hoverBackgroundColor: 'rgba(228,208,10, 0.3)',
          hoverBorderColor: 'rgba(0,0,0,1)',
          data: [65, 59, 80, 81, 56]
        }
      ]
    };
    return (
      <React.Fragment>

          <HorizontalBar data={dataHorBar} width={400} height={250}/>
        
      </React.Fragment>
    );
  }
}

export default connect()(HorizonBarChart);
