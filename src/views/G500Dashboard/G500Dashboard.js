import React from 'react';
import Alerts from './Alerts.js';
import Performance from "./Performance";
import SupplierAnalysis from "./SupplierAnalysis";
import TotalRevenue from "./TotalRevenue";
import BarChart from './BarChart';
import OneBarChart from './OneBarChart';
import InventoryPeriod from './InventoryPeriod';
import responseJSON from "./mockData.json";
import './Alerts.scss';

class G500Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language:"en",
      g500DataDashBoard: [],
      g500DataDashBoard_en: [
        {
          title: "Dashboard - G500 Gas Station"
        }
      ]
    };
  }
  componentDidMount() {
    let languagebr = localStorage.getItem('language');
    this.setState({language:languagebr});
  }
  render() {
    return (
      <div className= "row">
        <div className="col-md-12">
          <p className="g500-dashboard">
            {this.state.g500DataDashBoard_en[0].title}
          </p>
        </div>
        {/* <SupplierAnalysis />
         <Alerts />
         <Performance />
         <TotalRevenue /> 
         <InventoryPeriod data={responseJSON} /> 
        <BarChart />
         */} 
         <OneBarChart />
      </div>
    )
  }
}
export default G500Dashboard;
