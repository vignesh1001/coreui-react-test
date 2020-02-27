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
import responseJSON from "./mockData.json";
class InventoryPeriod extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isShowLineChart: true,
      isFuelDDOpen: false,
      fuelDDValue: "",
      periodType: {
        list: [
          { key: "1", value: "Last" },
          { key: "2", value: "This" }
        ],
        isOpen: false,
        value: "1"
      },
      periodDay: "10",
      period: {
        list: [
          { key: "1", value: "Days" },
          { key: "2", value: "Weeks" },
          { key: "3", value: "Months" },
          { key: "4", value: "Years" }
        ],
        isOpen: false,
        value: "1"
      },
      barData: {},
      chartOptions: {},
      chartLabels: [],
      lineChartData: [ ],
      barChartData: [],
    };
    this.onLineChanged = this.onLineChanged.bind(this);
    this.handleGo = this.handleGo.bind(this);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  componentDidMount() {
    //let languagebr = localStorage.getItem("language");
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
    this.handleGo();
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
          label: "Tendency",
          type: "line",
          data: lineChartData,
          fill: false,
          borderColor: "#E66C37",
          backgroundColor: "#E66C37",
          pointBorderColor: "#E66C37",
          pointBackgroundColor: "#E66C37",
          pointHoverBackgroundColor: "#E66C37",
          pointHoverBorderColor: "#E66C37",
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
            padding: { right: 30, top: -6 },
            display: false
          }
        },
        {
          type: "bar",
          label: "Period",
          data: barChartData,
          fill: false,
          backgroundColor: "#118DFF",
          borderColor: "#118DFF",
          hoverBackgroundColor: "#118DFF",
          hoverBorderColor: "#118DFF",
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
      plugins: {
        labels: false
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
  handleGo() {
    const { period, periodType, periodDay } = this.state;
    const { data } = this.props;
    data.forEach(
      item =>
        (item.o_RecordDate = new Date(
          item.RecordDate.replace("T", " ").substring(
            0,
            item.RecordDate.lastIndexOf(".")
          )
        ))
    );
    let filterList = [];
    let tarDate = new Date();
    tarDate.setHours(0);
    tarDate.setMinutes(0);
    tarDate.setSeconds(0);
    tarDate.setMilliseconds(0);
    const getMonday = d => {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
      d.setDate(diff);
      return d;
    };
    if (periodType.value === "1" && periodDay && period.value) {
      if (period.value === "1")
        tarDate.setDate(tarDate.getDate() - Number(periodDay));
      if (period.value === "2")
        tarDate.setDate(tarDate.getDate() - Number(periodDay) * 7);
      if (period.value === "3")
        tarDate.setMonth(tarDate.getMonth() - Number(periodDay));
      if (period.value === "4")
        tarDate.setFullYear(tarDate.getFullYear() - Number(periodDay));
    } else if (periodType.value === "2") {
      if (period.value === "2") tarDate = getMonday(tarDate.getTime());
      if (period.value === "3") tarDate.setDate(1);
      if (period.value === "4") {
        tarDate.setDate(1);
        tarDate.setMonth(0);
      }
    }
    filterList = data
      .filter(item => item.o_RecordDate.getTime() >= tarDate.getTime())
      .sort((a, b) => new Date(a.o_RecordDate) - new Date(b.o_RecordDate));
    this.setState({
      chartLabels: filterList.map(e => e.periodo),
      lineChartData: filterList.map(e => e.StartingInventory),
      barChartData: filterList.map(e => e.EndingInventory)
    });
  }
  renderDropdown(stateName) {
    const dropdownObject = this.state[stateName];
    const { list, isOpen, value } = dropdownObject;
    const selectedValue = value && list.find(e => e.key === value).value;
    const toggleDropdown = () => {
      dropdownObject.isOpen = !isOpen;
      this.setState({
        [stateName]: dropdownObject
      });
      this.handleGo();
    };
    const onDropdownChange = e => {
      dropdownObject.isOpen = !isOpen;
      dropdownObject.value = e.target.getAttribute("value");
      this.setState({
        [stateName]: dropdownObject
      });
    };
    return (
      <Dropdown
        className="float-left pr-10"
        isOpen={isOpen}
        toggle={toggleDropdown}
      >
        <DropdownToggle caret className="period-dd-btn">
          {selectedValue}
        </DropdownToggle>
        <DropdownMenu>
          {list.map((item, i) => (
            <DropdownItem>
              <div
                onClick={onDropdownChange}
                value={item.key}
                key={`key-${stateName + i}`}
              >
                {item.value}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
  render() {
    const {
      barData,
      chartOptions,
      isShowLineChart,
      periodType,
      periodDay,
    } = this.state;
    console.log("inventory period data", this.props.data);
    return (
      <div>
        <Container className="p-0">
          <Container>
            <Row className="mb-2">
              <Col lg="4" className="p-0">
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    {this.renderDropdown("periodType")}
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input
                      style={{ width: 70 }}
                      name="days"
                      id="period_days"
                      placeholder="Days"
                      value={periodDay}
                      onChange={e =>
                        this.setState({ periodDay: e.target.value })
                      }
                      maxLength={3}
                      disabled={periodType.value==='2'}
                      className="period-input"
                    />
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    {this.renderDropdown("period")}
                  </FormGroup>
                  {/* <Button onClick={e => this.handleGo(e)}>Go</Button> */}
                </Form>
              </Col>
              <Col lg="6">
                  <h5>INVENTARIO POR PERIODO</h5>
              </Col>
              <Col lg="2" className="p-0 text-right">
                <CustomInput
                  type="switch"
                  id="customSwitch"
                  name="customSwitch"
                  label={`Tendency ${isShowLineChart ? "On" : "Off"}`}
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
