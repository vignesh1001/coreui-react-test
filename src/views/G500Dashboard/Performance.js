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
import './Performance.scss';

const styles = {
  header: {
    fontSize: 22,
    letterSpacing: 0,
    opacity: 1
  },
};

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWeekDDOpen: false,
      weekDDValue: "This Week",
      topperList: [
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"}
      ],
      lowerList: [
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"},
        {stationNm: "Gacoco#342", volume: "4000Lts", revenue: "$500,000"}
      ]
    };
  }

  onChangeDropdown(e) {
    this.setState({weekDDValue: e.currentTarget.textContent});
  }

  render() {
    const {weekDDValue, isWeekDDOpen, topperList, lowerList} = this.state;
    const renderTable = list => (
      <Table hover responsive className="mb-0 d-sm-table">
        <thead className="">
        <tr>
          <th className="border-top-0"/>
          <th className="border-top-0">Station</th>
          <th className="border-top-0">Volume</th>
          <th className="border-top-0">Revenue</th>
        </tr>
        </thead>
        <tbody>
        {list.map((object, index) => (
          <tr>
            <td>
              <p>{index + 1}.</p>
            </td>
            <td>
              <p>{object.stationNm}</p>
            </td>
            <td>{object.volume}</td>
            <td>
              <p>{object.revenue}</p>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    );
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 pdg-0px">
        <Container className="performance">
          <Container>
            <Row xs="2" sm="2" md="2">
              <Col xs="4" sm="4" md="4" className="p-0">
                <p className="performance__title">Performance</p>
              </Col>
              <Col xs="8" sm="8" md="8" className="p-0 text-right performance__title-actions">
                <Button className="float-right view-all-btn">
                  View All
                </Button>
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
          <Container  className="performance__body">
            <Card className="performance__table-container green col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h4 className="title">Top Performers</h4>
              {renderTable(topperList)}
            </Card>
            <Card className="performance__table-container red col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h4 className="title">Low Performers</h4>
              {renderTable(lowerList)}
            </Card>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Performance;
