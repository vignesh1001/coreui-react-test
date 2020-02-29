import React from "react";
import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  Card,
  Row,
  Dropdown,
  Container,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table
} from "reactstrap";
import "chartjs-plugin-datalabels";
import "./BarChart.scss";
import { Bar, Chart } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  }
};

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageList: ['',83, 25, 26, 67, 86,''],
      chartLabels: ["","DIESEL", "DIESEL", "DIESEL", "REGULAR", "PREMINUM",""],
      minValueList: ['',4000, 5000, 11000, 4000, 40000,''],
      minPctList: [10,10, 10, 10, 10, 10,10],
      maxValueList: [0,38000, 47500, 104500, 38000, 38000,''],
      maxPctList: [90,90, 90, 90, 90, 90,90],
      tangueList: ['',33114, 12544, 28531, 28531, 28531,''],
      isWeekDDOpen: false,
      weekDDValue: "This Week"
    };
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getChartData() {
    const { percentageList, chartLabels } = this.state;
    const barBgColor = percentageList.map(pctVal =>
      pctVal < 10 || pctVal > 95 ? "#f00" : pctVal < 20 ? "#f0f009" : "#45a973"
    );
    return {
      labels: chartLabels,
      datasets: [
        {
          type: "bar",
          label: "1",
          data: percentageList,
          borderWidth: 1,
          backgroundColor: barBgColor,
          pointBorderWidth: 5,
          yAxisID: "y-axis-1",
          stack: "Stack 1",
          datalabels: {
            color: context =>
              context.dataset.data[context.dataIndex] < 20 ? "black" : "white",
            formatter: (value, context)=> context.chart.data.datasets[0].data[context.dataIndex] &&
              context.chart.data.datasets[0].data[context.dataIndex] + "%"
          }
        },
        {
          type: "bar",
          label: "2",
          ...this.getTangueValues(),
          borderWidth: [0,1,1,1,1,1,0],
          backgroundColor: "#FFF",
          pointBorderWidth: 5,
          yAxisID: "y-axis-1",
          stack: "Stack 1",
          datalabels: {
            color: "black",
            anchor: "start",
            formatter: (value, context)=>context.chart.data.datasets[1].labelData[context.dataIndex],
            font: { size: 12, style: "bold" },
            align: "end",
            anchor: "end",
            padding: { right: 30, top: 10 }
          }
        },
        {
          spanGaps: true,
          type: "line",
          fill: false,
          borderColor: "#c9606f",
          yAxisID: "y-axis-2",
          pointRadius: [0, 0, 0, 0, 0, 8, 0],
          datalabels: {
            color: context => (context.dataIndex === 0 ? "blue" : "black"),
            anchor: "start",
            offset: 0,
            formatter: function(value, context) {
              if (context.dataIndex === 0) {
                context.chart.chartArea.left = 50;
                context.chart.$datalabels._datasets[0][0]._el._yScale.left = 10;
              }
              return context.chart.data.datasets[2].labelData[
                context.dataIndex
              ];
            },
            font: { size: 10, style: "bold" },
            align: "right",
            padding: { right: 30 }
          },
          ...this.getMaxValues()
        },
        {
          spanGaps: false,
          type: "scatter",
          showLine: true,
          fill: false,
          borderColor: "#c9606f",
          yAxisID: "y-axis-3",
          pointRadius: [0, 0, 0, 0, 0, 8, 0],
          datalabels: {
            color: "black",
            anchor: "start",
            formatter: function(value, context) {
              return context.chart.data.datasets[3].labelData[
                context.dataIndex
              ];
            },
            font: { size: 10, style: "bold" },
            align: "right",
            padding: { right: 30 }
          },
          ...this.getMinValues()
        }
      ]
    };
  }
  
  getChartOptions() {
    return {
      layout: {
        padding: { top: 40, left: -3, right: 30, bottom: 0 }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: "#000",
              fontStyle: "bold",
              fontFamily: "Roboto",
              fontSize: 12
            },
            gridLines: { display: false },
            categoryPercentage: 0.5,
            barPercentage: 1.2,
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true,
            id: "y-axis-1",
            ticks: {
              max: 100,
              stepSize: 20,
              beginAtZero: true,
              callback: (label, index, labels) => label + "%"
            },
            gridLines: { display: false }
          },
          {
            ticks: { max: 100, min: 0, stepSize: 1, beginAtZero: true },
            display: false,
            id: "y-axis-2"
          },
          {
            ticks: { max: 100, min: 0, stepSize: 1, beginAtZero: true },
            display: false,
            id: "y-axis-3"
          },
          {
            stacked: true,
            ticks: {
              max: 200,
              stepSize: 20,
              beginAtZero: true,
              callback: (label, index, labels) => ''
            },
            display: false,
            id: "y-axis-4"
          }
        ]
      },
      legend: { display: false },
      tooltips: { enabled: false, custom: CustomTooltips },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  getMinValues() {
    const { minValueList, minPctList } = this.state;
    return {
      data: minPctList,
      labelData: minValueList.map((i, index) =>
       index === 0
          ? `${minPctList[0]}%`
          :  i && `min\n${this.numberWithCommas(i)}`
      )
    };
  }
  getMaxValues() {
    const { maxValueList, maxPctList } = this.state;
    return {
      data: maxPctList,
      labelData: maxValueList.map((i, index) =>
        index === 0
          ? `${maxPctList[0]}%`
          : i && `max\n${this.numberWithCommas(i)}`
      )
    };
  }
  getTangueValues() {
    const { percentageList, tangueList } = this.state;
    const data = percentageList.map(i => 100 - i);
    return {
      data,
      labelData: tangueList.map(
        (v, i) => v && `Tangue ${i + 1}\n${this.numberWithCommas(v)}`
      )
    };
  }

  render() {
    const options = this.getChartOptions();
    const data = this.getChartData();
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="bar-chart">
          <Container className="total_revenue__body">
            <Card>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar data={data} options={options} />
                </div>
              </CardBody>
            </Card>
          </Container>
        </Container>
      </div>
    );
  }
}

export default BarChart;
