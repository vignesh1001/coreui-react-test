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
import { Line, Chart } from "react-chartjs-2";
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
      chartOptions: {},
      chartData: {}
    };
  }

  prepareBarChartState() {
    const { data } = this.props;
    const chartLabels = ["", ...data.map(e => e.product_name), ""];
    const percentageList = [
      "",
      ...data.map(e => Math.round((e.tc_volume * 100) / e.Tank_capacity)),
      ""
    ];
    const minValueList = ["", ...data.map(e => e.min_warn_qty), ""];
    const maxValueList = ["", ...data.map(e => e.max_warn_qty), ""];
    const tangueList = ["", ...data.map(e => e.Tank_capacity), ""];
    const firstData = data.length && data[1];
    const minPctList = [
      firstData &&
        Math.round((firstData.min_warn_qty * 100) / firstData.Tank_capacity),
      ...data.map(e => Math.round((e.min_warn_qty * 100) / e.Tank_capacity)),
      firstData &&
        Math.round((firstData.min_warn_qty * 100) / firstData.Tank_capacity)
    ];
    // const maxPctList = Math.round(data.max_warn_qty*100/data.Tank_capacity);

    const maxPctList = [
      firstData &&
        Math.round((firstData.max_warn_qty * 100) / firstData.Tank_capacity),
      ...data.map(e => Math.round((e.max_warn_qty * 100) / e.Tank_capacity)),
      firstData &&
        Math.round((firstData.max_warn_qty * 100) / firstData.Tank_capacity)
    ];
    return {
      percentageList,
      chartLabels,
      minValueList,
      maxValueList,
      tangueList,
      minPctList,
      maxPctList
    };
  }
  componentDidMount() {
    this.setState(this.prepareBarChartState(), () => this.updateChartData());
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    const { data } = this.props;
    if (data.length !== prevData.length) {
      this.setState(this.prepareBarChartState(), () => this.updateChartData());
    }
  }
  updateChartData() {
    const chartOptions = this.getChartOptions();
    const chartData = this.getChartData();
    this.setState({ chartOptions, chartData });
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getChartData() {
    const { percentageList=[], chartLabels=[] } = this.state;
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
            formatter: (value, context) =>
              context.chart.data.datasets[0].data[context.dataIndex] &&
              context.chart.data.datasets[0].data[context.dataIndex] + "%"
          }
        },
        {
          type: "bar",
          label: "2",
          ...this.getTangueValues(),
          borderWidth: 1,
          backgroundColor: "#FFF",
          pointBorderWidth: 5,
          yAxisID: "y-axis-1",
          stack: "Stack 1",
          datalabels: {
            color: "black",
            anchor: "start",
            formatter: (value, context) =>
              context.chart.data.datasets[1].labelData[context.dataIndex],
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
            formatter: (value, context) => {
              if (context.dataIndex === 0) {
                context.chart.chartArea.left = 0;
                context.chart.$datalabels._datasets[0][0]._el._yScale.left = 10;
                context.chart.$datalabels._datasets[0][0]._el._yScale.margins.top = 100;
                console.log(
                  "Hi",
                  context.chart.$datalabels._datasets[0][1]._el
                );
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
            color: context => (context.dataIndex === 0 ? "blue" : "black"),
            anchor: "start",
            formatter: (value, context) => {
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
        padding: { top: 40, left: -3, right: 0, bottom: 0 }
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
            barPercentage: 1.8,
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
              callback: (label, index, labels) => ""
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
    const { minValueList=[], minPctList=[] } = this.state;
    return {
      data: minPctList,
      labelData: minValueList.map((i, index) =>
        index === 0
          ? minPctList.length && `${minPctList[0]}%`
          : i && `min\n${this.numberWithCommas(i)}`
      )
    };
  }
  getMaxValues() {
    const { maxValueList=[], maxPctList=[] } = this.state;
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
    const { percentageList=[], tangueList=[] } = this.state;
    const data = percentageList.map(i => i && 100 - i);
    return {
      data,
      labelData: tangueList.map(
        (v, i) => v && `Tangue ${i}\n${this.numberWithCommas(v)}`
      )
    };
  }

  render() {
    const { chartData, chartOptions } = this.state;
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="bar-chart">
          <Container className="total_revenue__body">
            <Card>
              <CardBody>
                <div className="chart-wrapper">
                  <Line data={chartData} options={chartOptions} />
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
