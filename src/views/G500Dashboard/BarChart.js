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
import {Bar} from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  },
};

class BarChart extends React.Component {
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
    const plugins = [{
      afterDraw: (chartInstance, easing) => {
          const ctx = chartInstance.chart.ctx;
          ctx.fillText("This text drawn by a plugin", 100, 10);
          console.log(ctx);
      }
  }];
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="total_revenue">
          <Container className="total_revenue__body">
            <Card>
            <CardBody>
              <div className="chart-wrapper">
                <Bar 
                  plugins={plugins}
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

export default BarChart;
