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
  Table, CardHeader
} from "reactstrap";
import './Performance.scss';
import {Doughnut} from "react-chartjs-2";

const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  },
};

class SupplierAnalysis extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isWeekDDOpen: false,
      weekDDValue: "This Week",

      doughnut : {
        labels: [
          '60%',
          '12%',
          '18%',
          '29%',
        ],
        datasets: [{
            data: [60, 12, 18,29],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          }],
      },
    };
    Chart.pluginService.register({
      beforeRender: function (chart) {
          if (chart.config.options.showAllTooltips) {
              chart.pluginTooltips = [];
              chart.config.data.datasets.forEach(function (dataset, i) {
                  chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                      chart.pluginTooltips.push(new Chart.Tooltip({
                          _chart: chart.chart,
                          _chartInstance: chart,
                          _data: chart.data,
                          _options: chart.options.tooltips,
                          _active: [sector]
                      }, chart));
                  });
              });
              chart.options.tooltips.enabled = false;
          }
      },
      afterDraw: function (chart, easing) {
          if (chart.config.options.showAllTooltips) {
              if (!chart.allTooltipsOnce) {
                  if (easing !== 1)
                      return;
                  chart.allTooltipsOnce = true;
              }
              chart.options.tooltips.enabled = true;
              Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                  tooltip.initialize();
                  tooltip.update();
                  tooltip.pivot();
                  tooltip.transition(easing).draw();
              });
              chart.options.tooltips.enabled = false;
          }
      }
    });
  }

  onChangeDropdown(e) {
    this.setState({weekDDValue: e.currentTarget.textContent});
  }

  render() {
    const {weekDDValue, isWeekDDOpen,doughnut} = this.state;
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 pdg-0px">
        <Container className="performance">
          <Container>
            <Row xs="2" sm="2" md="2">
              <Col xs="4" sm="4" md="4" className="p-0">
                <p className="performance__title">Supplier Analysis</p>
              </Col>
              <Col xs="8" sm="8" md="8" className="p-0 text-right performance__title-actions">
                <Dropdown
                  className="float-right pr-10"
                  isOpen={isWeekDDOpen}
                  toggle={() =>
                    this.setState({isWeekDDOpen: !this.state.isWeekDDOpen})
                  }
                >
                  <DropdownToggle caret className="week-dd-btn">
                    {weekDDValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <div onClick={e => this.onChangeDropdown(e)}>Diesel</div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={e => this.onChangeDropdown(e)}>Petrol</div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  className="float-right pr-10"
                  isOpen={isWeekDDOpen}
                  toggle={() =>
                    this.setState({isWeekDDOpen: !this.state.isWeekDDOpen})
                  }
                >
                  <DropdownToggle caret className="week-dd-btn">
                    {weekDDValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <div onClick={e => this.onChangeDropdown(e)}>This Week</div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={e => this.onChangeDropdown(e)}>Last Week</div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={e => this.onChangeDropdown(e)}>
                        Last 2 Weeks
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
          <Container className="performance__body">
            <Card>
                <CardBody>
                <Row xs="2" sm="2" md="2">
                  <Col xs="4" sm="4" md="4" className="p-0">
                    <div className="text-center">Breakdown of Product: <b>Diesel</b></div>
                    <div className="chart-wrapper">
                      <Doughnut data={doughnut} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        legend: {
                          display: false
                        },
                        showAllTooltips:true,
                        tooltips: {
                          callbacks: {
                            title: function() {
                              return "";
                            },
                            label: function(item, data) {
                              var datasetLabel = data.labels[item.datasetIndex] || "";
                              var dataPoint = item.yLabel;
                              console.log(item,data,datasetLabel);
                              return datasetLabel;
                            }
                          }
                        }
                      }}/>
                    </div>
                  </Col>
                  <Col xs="8" sm="8" md="8" className="p-0 text-right performance__title-actions">

                  </Col>
                  </Row>
                </CardBody>
              </Card>
          </Container>
        </Container>
      </div>
    );
  }
}

export default SupplierAnalysis;
