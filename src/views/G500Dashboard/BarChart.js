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
      percentageList: [83, 25, 26, 67, 86],
      chartLabels: ["DIESEL", "DIESEL", "DIESEL", "REGULAR", "PREMINUM"],
      minList: [4000,5000,11000,4000,4000],
      maxList: [38000,47500,104500,38000,38000],
      tangueList: [33114,12544,28531,28531,28531],
      isWeekDDOpen: false,
      weekDDValue: "This Week"
    };
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getChartData() {
    const { percentageList, chartLabels } = this.state;
    return {
      labels: chartLabels,
      datasets: [
        {
          type: "bar",
          label: "1",
          data: percentageList,
          borderWidth: 1,
          backgroundColor: "#45a973",
          pointBorderWidth: 5,
          yAxisID: "y-axis-1",
          stack: "Stack 1",
          datalabels: {
            color: "white",
            formatter: function(value, context) {
              return (
                context.chart.data.datasets[0].data[context.dataIndex] + "%"
              );
            }
          }
        },
        {
          type: "bar",
          label: "2",
          ...this.getTangueValues(),
          borderWidth: 1,
          backgroundColor: "rgba(152, 152, 208, 0.2)",
          pointBorderWidth: 5,
          yAxisID: "y-axis-1",
          stack: "Stack 1",
          datalabels: {
            color: "black",
            anchor: "start",
            formatter: function(value, context) {
              return context.chart.data.datasets[1].labelData[
                context.dataIndex
              ];
            },
            font: { size: 12, style: "bold" },
            align: "end",
            anchor: "end",
            padding: { right: 30, top: 10 }
          }
        },
        {
          type: "line",
          fill: false,
          borderColor: "#c9606f",
          yAxisID: "y-axis-2",
          datalabels: {
            color: "black",
            anchor: "start",
            offset: 0,
            formatter: function(value, context) {
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
          type: "scatter",
          showLine: true,
          fill: false,
          borderColor: "#c9606f",
          yAxisID: "y-axis-3",
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
        padding: { top: 40, left: -3, right: 10, bottom: 0 }
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
            gridLines: { color: "rgba(0, 0, 0, 0)" },
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
              callback: function(label, index, labels) {
                return label + "%";
              }
            }
          },
          {
            ticks: { max: 100, min: 10, stepSize: 1, beginAtZero: true },
            display: false,
            id: "y-axis-2"
          },
          {
            ticks: { beginAtZero: true, max: 100, min: 0, stepSize: 10 },
            display: false,
            id: "y-axis-3"
          },
          {
            stacked: true,
            ticks: {
              max: 200,
              stepSize: 20,
              beginAtZero: true,
              callback: function(label, index, labels) {
                return "";
              }
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
    const { minList } = this.state;
    return {
      data: minList.map(() => 10),
      labelData: minList.map(i => `mix\n${this.numberWithCommas(i)}`)
    };
  }
  getMaxValues() {
    const { maxList } = this.state;
    return {
      data: maxList.map(() => 90),
      labelData: maxList.map(i => `max\n${this.numberWithCommas(i)}`)
    };
  }
  getTangueValues() {
    const { percentageList, tangueList } = this.state;
    const data = percentageList.map(i => 100 - i);
    return {
      data,
      labelData: tangueList.map((v, i) => `Tangue ${i + 1}\n${this.numberWithCommas(v)}`)
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
