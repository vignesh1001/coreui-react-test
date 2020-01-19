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
import './TotalRevenue.scss';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  },
};

class TotalRevenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWeekDDOpen: false,
      weekDDValue: "This Week",
      line : {
        labels: ['12/9','', '12/10','', '12/11','', '12/13','', '12/14', '12/15'],
        datasets: [
          {
            label: 'My First dataset',
            data: [10,1100,1025,2110,1900,2000,900,1000,900,2025],
            backgroundColor: 'rgba(152, 152, 208, 0.2)',
            borderColor: 'rgba(19, 247, 228,1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(19, 247, 228,1)',
            pointBorderColor: 'rgba(19, 247, 228,1)',
            pointBorderWidth: 5,
          },
        ],
      }
    };
  }

  onChangeDropdown(e) {
    this.setState({weekDDValue: e.currentTarget.textContent});
  }

  render() {
    const {weekDDValue, isWeekDDOpen,line} = this.state;
    
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 pdg-0px">
        <Container className="total_revenue">
          <Container>
            <Row xs="2" sm="2" md="2">
              <Col xs="8" sm="8" md="8" className="p-0">
                <p className="total_revenue__title">Total Revenue</p>
              </Col>
              <Col xs="4" sm="8" md="8" className="p-0 text-right total_revenue__title-actions">
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
          <Container className="total_revenue__body">
            <Card>
            <CardBody>
              <div className="chart-wrapper">
                <Line 
                  data={line} 
                  options={{
                    scales: {
                      xAxes: [ {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Date'
                        },
                        ticks: {
                          userCallback: function(item, index) {
                            if (!(index % 2)) return item;
                          },
                          autoSkipPadding: 30,
                          major: {
                            fontStyle: 'bold',
                            fontColor: '#FF0000'
                          },
                        }
                      } ],
                      yAxes: [ {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Liters'
                        },
                        ticks: {
                          max: 3000,
                          min: 0,
                          stepSize: 1000,
                          beginAtZero:true,
                        }
                      } ]
                    },
                    legend: {
                      display: false
                    },
                    tooltips: {
                      enabled: false,
                      custom: CustomTooltips
                    },
                    maintainAspectRatio: false,
                  }} />
              </div>
            </CardBody>
          </Card>
          </Container>
        </Container>
      </div>
    );
  }
}

export default TotalRevenue;
