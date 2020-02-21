import React from "react";
import { Row, Container, Col, Button } from "reactstrap";
import "./InventoryPeriod.scss";
import { Bar, Chart } from "react-chartjs-2";
import "chartjs-plugin-labels";

class InventoryPeriod extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      barData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Sales",
            type: "line",
            data: [51, 65, 40, 49, 60, 37, 40],
            fill: false,
            borderColor: "#EC932F",
            backgroundColor: "#EC932F",
            pointBorderColor: "#EC932F",
            pointBackgroundColor: "#EC932F",
            pointHoverBackgroundColor: "#EC932F",
            pointHoverBorderColor: "#EC932F",
            yAxisID: "y-axis-2"
          },
          {
            type: "bar",
            label: "Visitor",
            data: [200, 185, 590, 621, 250, 400, 95],
            fill: false,
            backgroundColor: "#71B37C",
            borderColor: "#71B37C",
            hoverBackgroundColor: "#71B37C",
            hoverBorderColor: "#71B37C",
            yAxisID: "y-axis-1"
          }
        ]
      }
    };
    this.onLineChanged = this.onLineChanged.bind(this);
  }

  componentDidMount() {
    let languagebr = localStorage.getItem("language");
    this.setState({ language: languagebr });
    // if (languagebr === "en") {
    //   this.setState({
    //     doughnut:this.state.doughnut_en
    //   });
    // }
    // if (languagebr === "es") {
    //   this.setState({
    //     doughnut:this.state.doughnut_es
    //   });
    // }
  }
  onLineChanged() {
    this.myRef.current.chartInstance.getDatasetMeta(
      0
    ).hidden = !this.myRef.current.chartInstance.getDatasetMeta(0).hidden;
    this.myRef.current.chartInstance.update();
  }
  getChartOptions() {
    return {
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        mode: "label"
      },
      elements: {
        line: {
          fill: false
        }
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 10
        }
      },
      plugins: {
        labels: {
          render: "value"
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            label: {
              show: false
            }
          }
        ],
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            label: {
              show: false
            }
          },
          {
            type: "linear",
            display: false,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false
            },
            label: {
              show: false
            }
          }
        ]
      }
    };
  }
  //  const toggle = document.getElementById("toggleSales");
  //  toggle.addEventListener("click", toggleSales, false);
  render() {
    const { barData } = this.state;
    console.log("my ref", this.myRef.current);
    return (
      <div className="col-xl-8 col-lg-6 col-sm-6 col-12 mt-2 mb-2 pl-0 pr-0 pr-lg-3 pr-sm-0">
        <Container className="inventory-period">
          <Container>
            <Button onClick={this.onLineChanged} />
          </Container>
          <Container className="inventory-period__body p-0">
            <Row className="m-0">
              <Col xs="12" sm="12" md="12" className="p-0">
                <div className="inventory-period__body-chart">
                  <div className="chart-wrapper">
                    <Bar
                      ref={this.myRef}
                      data={barData}
                      width={100}
                      height={50}
                      options={this.getChartOptions()}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}
export default InventoryPeriod;
