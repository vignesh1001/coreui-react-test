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
      percentageList: ["", 60, ""],
      chartLabels: ["", "DIESEL", ""],
      minValueList: ["", "", 5000],
      minPctList: [10, 10, 10],
      maxValueList: ["", "", 47500],
      maxPctList: [60, 60, 60],
      tangueList: ["", 50000, ""],
      isWeekDDOpen: false,
      weekDDValue: "This Week",
      chartDataObject:{"mac":"3403de7f1f38","tank_num":2,"product_code":2,"product_name":"DIESEL","volume":12918,"tc_volume":12872,"ullage":36658,"height":1003,"water":0,"temperature":23,"water_volume":0,"cust_req_updated_on":"2020-02-29T03:38:57.897Z","Tank_capacity":50000,"min_warn_qty":5000,"max_warn_qty":47500,"alarm_message":"","txncode":"39f568f65e470c3b9fc768349c8f77b3"}
    };
  }
  componentDidMount() {
    this.updateChartData();
  }
  updateChartData() {
    const chartOptions =  this.getChartOptions();
    const chartData =  this.getChartData();
    this.setState({chartOptions,chartData});
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getChartData() {
    const { percentageList, chartLabels } = this.state;
    const pctVal = percentageList.find(e => e);
    const barBgColor = percentageList.map(pctVal =>
      pctVal < 10 || pctVal > 95 ? "#f00" : pctVal < 20 ? "#f0f009" : "#45a973"
    );
    const chartFontColor = pctVal < 20 ? "black" : "white";
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
            align: "top",
            anchor: "bottom",
            formatter: function(value, context) {
              if (context.dataIndex === 0) {
                context.chart.chartArea.left = 50;
                context.chart.$datalabels._datasets[0][0]._el._yScale.left = 10;
                console.log(
                  context.chart.$datalabels._datasets[0][0].pointRadius
                );
                //context.chart.$datalabels._datasets[0][2].pointRadius = [0, 0, 0, 0, 0, 8, 0];
                // myChart1.data.datasets[0].pointRadius = [0, 0, 0, 0, 0, 8, 0];
              }
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
          spanGaps: false,
          type: "scatter",
          showLine: true,
          fill: false,
          borderColor: "#c9606f",
          yAxisID: "y-axis-3",
          pointRadius: [0, 0, 0, 0, 0, 8, 0],
          datalabels: {
            color: context => (context.dataIndex === 0 ? "blue" : "black"),
            align: "top",
            anchor: "bottom",
            formatter: (value, context) =>
              context.chart.data.datasets[3].labelData[context.dataIndex],
            font: { size: 10, style: "bold" },
            padding: { right: 10, top: 0 }
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
      tooltips: {
        enabled: false,
        custom: (tooltipModel,tooltip1)=>{
          const {chartDataObject}=this.state;
          var tooltipEl = document.getElementById('chartjs-tooltip');
          if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
          }
          if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
          }
          tooltipEl.classList.remove('above', 'below', 'no-transform');
          if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
              tooltipEl.classList.add('no-transform');
          }
          function getBody(bodyItem) {
            return bodyItem.lines;
          }
          if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);
              const addTableRow = (hText,cText)=>`<tr><td>${hText}</td><td>${cText}</td></tr>`;
              var innerHtml = '<tbody>';
              innerHtml += addTableRow('Tanque #',chartDataObject.tank_num);
              innerHtml += addTableRow('Volumen ',this.numberWithCommas(chartDataObject.volume));
              innerHtml += addTableRow('nivel max(Lts)',this.numberWithCommas(chartDataObject.max_warn_qty));
              innerHtml += addTableRow('nivel min(Lts)',this.numberWithCommas(chartDataObject.min_warn_qty));
              innerHtml += addTableRow('Capacidad Tanque(Lts)',this.numberWithCommas(chartDataObject.Tank_capacity));
              innerHtml += '</tbody>';
              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
          }
          var position = this.state.percentageList._chartjs.listeners[0].chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY+10+ 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.backgroundColor = '#eee';
      } 
      },
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
          : i && `min\n${this.numberWithCommas(i)}`
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
    const data = percentageList.map(i => i && 100 - i);
    return {
      data,
      labelData: tangueList.map(
        (v, i) => v && `Tangue ${i + 1}\n${this.numberWithCommas(v)}`
      )
    };
  }
  render() {
    const {chartOptions,chartData} = this.state;
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="one-bar-chart">
          <Container className="one-bar-chart__body">
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

export default OneBarChart;
