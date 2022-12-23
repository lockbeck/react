import React, { Component } from "react";
import { connect } from "react-redux";
import { Pie } from '@ant-design/plots';


class PieChartAnt extends Component {


  render() {

      const data = [
    {
      type: 'nimadir',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
   
    return (
      <React.Fragment>
            <Pie {...config}/>
      </React.Fragment>
    );
  }
}

export default connect()(PieChartAnt);
