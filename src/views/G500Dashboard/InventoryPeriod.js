import React from "react";
import { Row, Container, Col, Button } from "reactstrap";
import "./InventoryPeriod.scss";
import { Bar, Chart } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

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
            data: [40546, 30422, 10000, 42552, 19432, 49535, 28953],
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
            data: [20000, 25000, 42552, 19432, 41535, 28953,34354],
            fill: false,
            backgroundColor: "#0039b0",
            borderColor: "#71B37C",
            hoverBackgroundColor: "#",
            hoverBorderColor: "#71B37C",
            yAxisID: "y-axis-1",
            datalabels: {
              color: "black",
              anchor: "start",
              formatter: (value, context) =>
                this.numberWithCommas(context.chart.data.datasets[1].data[context.dataIndex]),
              font: { size: 12, style: "bold" },
              align: "end",
              anchor: "end",
              padding: { right: 30, top: -10 }
            }
          }
        ]
      }
    };
    this.onLineChanged = this.onLineChanged.bind(this);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        display: false,
        position: "top",
        labels: {
          boxWidth: 10
        }
      },
      plugins: {
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
            gridLines: {
              display: false
            },
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
