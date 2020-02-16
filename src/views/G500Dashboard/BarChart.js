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
            datalabels: {
              color: 'white',
              formatter: function(value, context) {
                return context.chart.data.datasets[0].data[context.dataIndex]+'%';
              }
            }
          },
          {
            label: "Sales",
            type: "line",
            data: [10, 10, 10, 10, 10],
            labelData: ['min\n4,000', 'min\n5,000', 'min\n11,000', 'min\n4,000', 'min\n4,000'],
            position: "bottom",
            fill: false,
            borderColor: "#da9aaa",
            yAxisID: "y-axis-2",
            datalabels: {
              color: 'black',
              align: 'start',
              anchor: 'start',
              offset: -10,
              formatter: function(value, context) {
                return context.chart.data.datasets[1].labelData[context.dataIndex];
              },
              font:{
                size:10,
              },
              align:'right',
              padding: {
                right: 55,
              }
            }
          }
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
              }
            }],
            yAxes: [
              {
                ticks: {
                  max: 100,
                  min: 0,
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
                  min: 0,
                  stepSize: 20,
                  beginAtZero: true,
                },
                display: false,
                id: "y-axis-2",
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
            custom: CustomTooltips
          },
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
