import React from "react";
import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  Card,
  Row,
  
  Container,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  CardHeader
} from "reactstrap";
import "./SupplierAnalysis.scss";
import { Doughnut,Chart } from "react-chartjs-2";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  }
};

class SupplierAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isWeekDDOpen: false,
      weekDDValue: "This Week",
      isFuelDDOpen: false,
      fuelDDValue: "Diesel",
      doughnut: {
        datasets: [
          {
            data: [50,12, 18, 20],
            backgroundColor: ["#D532DC", "#6C6B6C", "#DC6032", "#328ADC"],
            dataList:[
              {volume:'50M',pctValue:50,name:'Certum Energía'},
              {volume:'12M',pctValue:12,name:'Pharaoh Int. Productos'},
              {volume:'18M',pctValue:18,name:'PEMEX'},
              {volume:'20M',pctValue:20,name:'Otro'},
            ]
          }
        ]
      }
    };
    Chart.pluginService.register({
      beforeRender: function(chart) {
        if (chart.config.options.showAllTooltips) {
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function(dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function(sector, j) {
              chart.pluginTooltips.push(
                new Chart.Tooltip(
                  {
                    _chart: chart.chart,
                    _chartInstance: chart,
                    _data: chart.data,
                    _options: chart.options.tooltips,
                    _active: [sector]
                  },
                  chart
                )
              );
            });
          });
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: function(chart, easing) {
        if (chart.config.options.showAllTooltips) {
          if (!chart.allTooltipsOnce) {
            if (easing !== 1) return;
            chart.allTooltipsOnce = true;
          }
          chart.options.tooltips.enabled = true;
          Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
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

  onChange(e,stateName) {
    this.setState({ [stateName]: e.currentTarget.textContent });
  }

  render() {
    const { weekDDValue, isWeekDDOpen, doughnut,isFuelDDOpen,fuelDDValue } = this.state;
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 pdg-0px">
        <Container className="supplier_analysis">
          <Container>
            <Row xs="2" sm="2" md="2">
              <Col xs="4" sm="4" md="4" className="p-0">
                <p className="supplier_analysis__title">Supplier Analysis</p>
              </Col>
              <Col
                xs="8"
                sm="8"
                md="8"
                className="p-0 text-right supplier_analysis__title-actions"
              >
                <Dropdown
                  className="float-right pr-10"
                  isOpen={isFuelDDOpen}
                  toggle={() =>
                    this.setState({ isFuelDDOpen: !isFuelDDOpen })
                  }
                >
                  <DropdownToggle caret className="week-dd-btn">
                    {fuelDDValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <div onClick={e => this.onChange(e,'fuelDDValue')}>Diesel</div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={e => this.onChange(e,'fuelDDValue')}>Petrol</div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  className="float-right pr-10"
                  isOpen={isWeekDDOpen}
                  toggle={() =>
                    this.setState({ isWeekDDOpen: !isWeekDDOpen })
                  }
                >
                  <DropdownToggle caret className="week-dd-btn">
                    {weekDDValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <div onClick={e => this.onChange(e,'weekDDValue')}>
                        This Week
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={e => this.onChange(e,'weekDDValue')}>
                        Last Week
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div onClick={e => this.onChange(e,'weekDDValue')}>
                        Last 2 Weeks
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
          <Container className="supplier_analysis__body">
            <Row xs="2" sm="2" md="2" className="m-0">
              <Col xs="4" sm="4" md="4" className="p-0 chart-col">
                <div className="text-center">
                  Breakdown of Product: <b>Diesel</b>
                </div>
                <div className="chart-wrapper">
                  <Doughnut
                    data={doughnut}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: false
                      },
                      showAllTooltips:true,
                      tooltips: {
                        callbacks: {
                          label: function(item, data) {
                            return data.datasets[0].data[item.index] + "%";
                          },
                          labelTextColor: function(item, chart) {
                            return chart.config.data.datasets[0]
                              .backgroundColor[item.index];
                          }
                        },
                        displayColors: false,
                        titleFontSize: 12,
                        bodyFontSize: 12,
                        bodyFontColor: "#000",
                        steppedLine: true,
                        titleFontStyle: "normal",
                        backgroundColor: "rgba(63,15,255,0)",
                        footerFontSize: 0,
                        labels:{
                          render: 'label',
                          position: 'outside',
                        },
                      }
                    }}
                  />
                </div>
              </Col>
              <Col
                xs="8"
                sm="8"
                md="8"
                className="p-0 text-right fuel-grid"
              >
                <Row className="p-0 m-0 grid-header">
                  <Col xs="1" sm="1" md="1" className="p-0 text-left" />
                  <Col xs="5" sm="5" md="5" className="p-0 text-left">
                    Name
                  </Col>
                  <Col xs="3" sm="3" md="3" className="p-0 text-left">
                    % Supplied
                  </Col>
                  <Col xs="3" sm="3" md="3" className="p-0 text-left">
                    Volume Supplied
                  </Col>
                </Row>
                {
                  doughnut.datasets[0].data.map((item,index)=>
                  (
                    <Row className="grid-body">
                      <Col xs="1" sm="1" md="1" className="p-0 text-left">{index+1}</Col>
                      <Col xs="5" sm="5" md="5" className="p-0 text-left" style={{color:doughnut.datasets[0].backgroundColor[index]}}>
                        <b>{doughnut.datasets[0].dataList[index].name}</b>
                      </Col>
                      <Col xs="3" sm="3" md="3" className="p-0 text-left">
                        {doughnut.datasets[0].dataList[index].pctValue}
                      </Col>
                      <Col xs="3" sm="3" md="3" className="p-0 text-left">
                        <b>{doughnut.datasets[0].dataList[index].volume}</b> Lts
                      </Col>
                    </Row>
                  )
                  )
                }
                <div className="viewall">
                    <button>View All</button>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default SupplierAnalysis;
