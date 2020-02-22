import React from "react";
import {
  Row,
  Container,
  Col,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  CustomInput,
  Form,
  Label,
  Input,
  FormGroup
} from "reactstrap";
import "./InventoryPeriod.scss";
import { Bar, Chart } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

class InventoryPeriod extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isShowLineChart: true,
      isFuelDDOpen: false,
      fuelDDValue: "",
      periodDD:{
        isOpen: false,
        value:'',
      },
      
      barData: {},
      chartOptions: {},
      chartLabels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
      ],
      lineChartData: [40546, 30422, 10000, 42552, 19432, 49535, 28953],
      barChartData: [20000, 25000, 42552, 19432, 41535, 28953, 34354]
    };
    this.onLineChanged = this.onLineChanged.bind(this);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    let languagebr = localStorage.getItem("language");
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
    this.setState({
      barData: this.getBarData(),
      chartOptions: this.getChartOptions(),
      language: languagebr
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevState", prevState, this.state);
    const { lineChartData, barChartData } = prevState;
    const {
      lineChartData: newStateLineChartData,
      barChartData: newStateBarChartData
    } = this.state;
    console.log(
      lineChartData.length,
      newStateLineChartData.length,
      barChartData.length,
      newStateBarChartData.length
    );
    if (
      lineChartData.length !== newStateLineChartData.length ||
      barChartData.length !== newStateBarChartData.length
    ) {
      this.setState({
        barData: this.getBarData(),
        chartOptions: this.getChartOptions()
      });
    }
  }
  onLineChanged() {
    const { isShowLineChart } = this.state;
    this.myRef.current.chartInstance.getDatasetMeta(
      0
    ).hidden = !this.myRef.current.chartInstance.getDatasetMeta(0).hidden;
    this.myRef.current.chartInstance.update();
    this.setState({ isShowLineChart: !isShowLineChart });
  }
  getBarData() {
    const { chartLabels, lineChartData, barChartData } = this.state;
    const options = {
      labels: chartLabels,
      datasets: [
        {
          label: "Sales",
          type: "line",
          data: lineChartData,
          fill: false,
          borderColor: "#EC932F",
          backgroundColor: "#EC932F",
          pointBorderColor: "#EC932F",
          pointBackgroundColor: "#EC932F",
          pointHoverBackgroundColor: "#EC932F",
          pointHoverBorderColor: "#EC932F",
          yAxisID: "y-axis-2",
          datalabels: {
            color: "black",
            anchor: "start",
            formatter: (value, context) =>
              this.numberWithCommas(
                context.chart.data.datasets[0].data[context.dataIndex]
              ),
            font: { size: 12 },
            align: "end",
            anchor: "end",
            padding: { right: 30, top: -6 }
          }
        },
        {
          type: "bar",
          label: "Visitor",
          data: barChartData,
          fill: false,
          backgroundColor: "#0039b0",
          borderColor: "#71B37C",
          hoverBackgroundColor: "#032a75",
          hoverBorderColor: "#71B37C",
          yAxisID: "y-axis-1",
          datalabels: {
            color: "black",
            anchor: "start",
            formatter: (value, context) =>
              this.numberWithCommas(
                context.chart.data.datasets[1].data[context.dataIndex]
              ),
            font: { size: 12, style: "bold" },
            align: "end",
            anchor: "end",
            padding: { right: 30, top: -10 }
          }
        }
      ]
    };
    return options;
  }
  getChartOptions() {
    return {
      layout: {
        padding: { top: 30, left: -3, bottom: 0 }
      },
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
      plugins: {},
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
            }
          }
        ],
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1", // bar chart
            gridLines: {
              borderDash: [8, 4]
            },
            ticks: { max: 50000, min: 0, stepSize: 10000, beginAtZero: true }
          },
          {
            type: "linear",
            display: false,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false
            }
          }
        ]
      }
    };
  }
  handleChange(e, fieldName) {
    this.setState({ [fieldName]: e.currentTarget.textContent });
    console.log(e.currentTarget.textContent);
    if ("Diesel" === e.currentTarget.textContent) {
      this.setState({
        chartLabels: ["1", "2", "3", "4", "5", "6", "7"],
        lineChartData: [40546, 30422, 10000, 42552, 19432, 49535, 28953],
        barChartData: [20000, 25000, 42552, 19432, 41535, 28953, 34354]
      });
    } else {
      this.setState({
        chartLabels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15"
        ],
        lineChartData: [
          20004,
          53235,
          35646,
          42123,
          14321,
          13532,
          34224,
          26535,
          35363,
          28335,
          23084,
          49853,
          25784,
          28434,
          35363
        ],
        barChartData: [
          20004,
          53235,
          35646,
          42123,
          14321,
          13532,
          34224,
          26535,
          35363,
          28335,
          23084,
          49853,
          25784,
          28434,
          35363
        ]
      });
    }
  }
  //  const toggle = document.getElementById("toggleSales");
  //  toggle.addEventListener("click", toggleSales, false);
  renderDropdown() {
    return (<Dropdown
      className="float-left pr-10"
      isOpen={isFuelDDOpen}
      toggle={() => this.setState({ isFuelDDOpen: !isFuelDDOpen })}
    >
      <DropdownToggle caret className="week-dd-btn">
        {fuelDDValue}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <div onClick={e => this.handleChange(e, "fuelDDValue")}>Diesel</div>
        </DropdownItem>
        <DropdownItem>
          <div onClick={e => this.handleChange(e, "fuelDDValue")}>Petrol</div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>);
  }
  render() {
    const {
      barData,
      chartOptions,
      isFuelDDOpen,
      fuelDDValue,
      isShowLineChart
    } = this.state;
    return (
      <div className="col-xl-12 col-lg-12 col-sm-6 col-12 mt-2 mb-2 pl-0 pr-0 pr-lg-3 pr-sm-0">
        <Container className="inventory-period">
          <Container>
            <Row xs="2" sm="2" md="2">
              <Col xs="8" sm="8" md="8" className="p-0">
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">
                      Email
                    </Label>
                    <Input
                      name="email"
                      id="exampleEmail"
                      placeholder="something@idk.cool"
                    />
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="don't tell!"
                    />
                  </FormGroup>
                  <Button>Go</Button>
                </Form>
              </Col>
              <Col
                xs="4"
                sm="8"
                md="8"
                className="p-0 text-right total_revenue__title-actions"
              >
                <CustomInput
                  type="switch"
                  id="customSwitch"
                  name="customSwitch"
                  label={`${isShowLineChart ? "Hide" : "Show"} Line`}
                  checked={isShowLineChart}
                  onChange={this.onLineChanged}
                />
              </Col>
            </Row>
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
                      options={chartOptions}
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
