import React from "react";
import {
  Card,
  Row,
  Container,
  CardBody,
  Col
} from "reactstrap";
import "chartjs-plugin-datalabels";
import "./OneBarChart.scss";
import { Line, Chart } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";


const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  }
};

class Chart1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageList: ['',83,''],
      chartLabels: ['',"DIESEL",''],
      minList: ['','',4000],
      maxList: ['','',38000],
      tangueList: ['',33114,''],
      isWeekDDOpen: false,
      weekDDValue: "This Week"
    };
  }
  render() {
    const options = this.getChartOptions();
    const data = this.getChartData();
    return (
      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 pdg-0px">
        <Container className="one-bar-chart">
          <Container className="one-bar-chart__body">
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
export default Chart1;