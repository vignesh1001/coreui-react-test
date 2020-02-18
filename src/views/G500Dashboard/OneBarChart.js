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
import "./OneBarChart.scss";
import { Line, Chart } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  }
};

class OneBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageList: ['',83,''],
      chartLabels: ['',"DIESEL",''],
      minList: ['','',4000],
      maxList: ['','',38000],
      tangueList: ['',33114,''],
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
        {spanGaps:true,
          type: "line",fill: false,
          borderColor: "#c9606f",yAxisID: "y-axis-2",
          datalabels: {
            color: "black",offset: 0,
            align: "left",anchor: "bottom",
            formatter: function(value, context) {
              return context.chart.data.datasets[2].labelData[
                context.dataIndex
              ];
            },
            font: { size: 10, style: "bold" },
            padding: { right: -10 }
          },
          ...this.getMaxValues()
        },
        {
          type: "scatter",showLine: true,
          fill: false,borderColor: "#c9606f",
          yAxisID: "y-axis-3",
          datalabels: {
            color: "black",
            align: "left",anchor: "bottom",
            formatter: function(value, context) {
              return context.chart.data.datasets[3].labelData[
                context.dataIndex
              ];
            },
            font: { size: 10, style: "bold" },
            padding: { right: -10 }
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
            barPercentage: 0.6,
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
            ticks: { max: 100, min: 0, stepSize: 1, beginAtZero: true },
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
      labelData: minList.map(i => i && `mix\n${this.numberWithCommas(i)}`)
    };
  }
  getMaxValues() {
    const { maxList } = this.state;
    return {
      data: maxList.map(() => 90),
      labelData: maxList.map(i => i && `max\n${this.numberWithCommas(i)}`)
    };
  }
  getTangueValues() {
    const { percentageList, tangueList } = this.state;
    const data = percentageList.map(i => i && 100 - i);
    return {
      data,
      labelData: tangueList.map((v, i) => v && `Tangue ${i + 1}\n${this.numberWithCommas(v)}`)
    };
  }

  render() {
    const options = this.getChartOptions();
    const data = this.getChartData();
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="one-bar-chart">
          <Container className="one-bar-chart__body">
            <Card>
              <CardBody>
                <div className="chart-wrapper">
                  <Line data={data} options={options} />
                </div>
              </CardBody>
            </Card>
          </Container>
        </Container>
      </div>
    );
  }
}

export default OneBarChart;
