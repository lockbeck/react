import React, { Component } from "react";
import { connect } from "react-redux";
import data from "./data/data.json";
import { Column } from '@ant-design/plots';

class BarChartAnt extends Component {

  
  
  render() {
 const config = {
    data,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: {
      position: 'middle',
    },
      legend: {
          display: true,
          position: "bottom"
        },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    
    colorField: 'type',
    color:({type})=>{
      if(type==="Sertifikat majvud arizalar"){
        return '#A155B9';
      }
      return '#165BAA';
    },
    connectedArea: {
      style: (oldStyle, element) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        };
      },
    },
  };

    return (
      <React.Fragment>
          <Column {...config} />
      </React.Fragment>
    );
  }
}

export default connect()(BarChartAnt);
