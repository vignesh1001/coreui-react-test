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
import "./TotalRevenue.scss";
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
      isWeekDDOpen: false,
      weekDDValue: "This Week",
      data: {
        labels: ["DIESEL","DIESEL","DIESEL","REGULAR","PREMINUM"],
        datasets: [
          {
            type: "bar",
            label: "My First dataset",
            data: [83,25,26,67,86],
            borderWidth: 1,
            backgroundColor: "#45a973",
            pointBorderWidth: 5,
            yAxisID: "y-axis-1",
            stack: 'Stack 1',
            //xAxisID: "x-axis-1",
            datalabels: {
              color: 'white',
              formatter: function(value, context) {
                return context.chart.data.datasets[0].data[context.dataIndex]+'%';
              }
            }
          },
          {
            type: "line",
            data: [90, 90, 90, 90, 90],
            labelData: ['max\n48,000', 'max\n5,000', 'max\n11,000', 'max\n4,000', 'max\n4,000'],
            fill: false,
            borderColor: "#c9606f",
            //xAxisID: "x-axis-2",
            yAxisID: "y-axis-2",
            datalabels: {
              color: 'black',
              align: 'start',
              anchor: 'start',
              offset: 0,
              formatter: function(value, context) {
                return context.chart.data.datasets[1].labelData[context.dataIndex];
              },
              font:{
                size:10,
              },
              align:'right',
              padding: {
                right: 30,
              }
            }
          },
          {
            type: "scatter",showLine: true,
            data: [10, 10, 10, 10, 10],
            labelData: ['min\n4,000', 'min\n5,000', 'min\n11,000', 'min\n4,000', 'min\n4,000'],
            fill: false,
            borderColor: "#c9606f",
            //xAxisID: "x-axis-3",
            yAxisID: "y-axis-3",
            datalabels: {
              color: 'black',
              align: 'start',
              anchor: 'start',
              formatter: function(value, context) {
                return context.chart.data.datasets[2].labelData[context.dataIndex];
              },
              font:{
                size:10,
                style:'bold'
              },
              align:'right',
              padding: {
                right: 30,
              }
            },
          },
          {
            type: "bar",
            label: "My First dataset 2",
            data: [7,65,64,23,4],
            borderWidth: 1,
            backgroundColor: "rgba(152, 152, 208, 0.2)",
            pointBorderWidth: 5,
            yAxisID: "y-axis-1",
            stack: 'Stack 1',
            //xAxisID: "x-axis-1",
            datalabels: {
              color: 'red',
              formatter: function(value, context) {
                return '';
              }
            }
          },
        ]
      },
       options: {
          scales: {
            xAxes: [{
              ticks: {
                fontColor: '#000',
                fontStyle: "bold",
                fontFamily: "Roboto",
                fontSize: 12,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              categoryPercentage: 0.5,
              barPercentage: 1.2,
              stacked: true,
            }
            ],
            yAxes: [
              {stacked: true,
                ticks: {
                  max: 100,
                  stepSize: 20,
                  beginAtZero: true,
                  callback: function(label, index, labels) {
                    return label+'%';
                  }
                },
                id: "y-axis-1",
              },
              {
                ticks: {
                  max: 100,
                  min: 10,
                  stepSize: 1,
                  beginAtZero: true,
                },
                display: false,
                id: "y-axis-2",
              },
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  min: 0,
                  stepSize: 10,
                },
                display: false,
                id: "y-axis-3",
              },
              {stacked: true,display: false,
                ticks: {display: false,
                  max: 100,
                  stepSize: 20,
                  beginAtZero: true,
                  callback: function(label, index, labels) {
                    return '';
                  }
                },
                id: "y-axis-4",
              },            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
            custom: CustomTooltips
          },
          responsive: true,
          maintainAspectRatio: false,
        }
    };
  }

  render() {
    const { data, options } = this.state;
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="total_revenue">
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
