import React, { Component } from "react";
import { connect } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";

class TopSubChart extends Component {
  render() {
    const options = {
      legend: {
        display: true,
        position: "top",
      },
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
        },
      },
      responsive: true,
    };
    const labels = [
      "Default MCHJ",
      "Second MCHJ",
      "Top AK",
      "Top2 YATT",
      "Vazirlik",
    ];
    const data = {
      labels,
      datasets: [
        {
          label: "MAI soni bo’yicha",
          data: [8, 6, 4, 2, 1],
          backgroundColor: "#3290ED",
        },
      ],
    };
    return (
      <React.Fragment>
        <HorizontalBar data={data} options={options} width={400} height={200} />
      </React.Fragment>
    );
  }
}

export default connect()(TopSubChart);
