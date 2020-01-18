import React from 'react'; 
import { Button } from 'reactstrap';
import GasStation from '../../assets/img/brand/logo.svg';
class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertsData: [
                {
                    image: "" + GasStation,
                    time: "11:53am",
                    date: "12/22/19",
                    descHeader: "G500 #34 - Tank 3 Low Level Alert",
                    descSub: "Product levels are low at the Westheimer station for product #3 - 93 Octane Supreme petrol.",
                    buttonName1: "Reorder",
                    buttonName2: "Review"
                },
                {
                    image: "" + GasStation,
                    time: "11:53am",
                    date: "12/22/19",
                    descHeader: "Order #1234 Delayed due to Seal Break",
                    descSub: "A seal break found en route has caused a delay in this order.",
                    buttonName1: "Contact",
                    buttonName2: "Review"
                },
                {
                    image: "" + GasStation,
                    time: "11:53am",
                    date: "12/22/19",
                    descHeader: "Sales Report Available",
                    descSub: "Your Q3 Sales results are available and pending approval.",
                    buttonName1: "Review",
                    buttonName2: ""
                },
                {
                    image: "" + GasStation,
                    time: "11:53am",
                    date: "12/22/19",
                    descHeader: "GS500 #23 Tank 3 Low Level Alert",
                    descSub: "Product levels are low at the Wetheimer station for product #3 - 93 Octane Supreme petrol.",
                    buttonName1: "Reorder",
                    buttonName2: "Review"
                }
            ]
        }
    }
    renderContent = () => {
        return (
            this.state.alertsData.map((data, index) => {
                return (
                    <div className="alerts__body" key={index}>
                        <div className="alerts__body-image">
                            <img src={"" + data.image} alt="acdd" className="alert-images" />
                            <p>{data.time}</p>
                            <p>{data.date}</p>
                        </div>
                        <div className="alerts__body-content">
                            <div className="alerts__body-content-title">{data.descHeader}</div>
                            <p>{data.descSub}</p>
                        </div>
                        <div className="alerts__body-buttons">
                            { data.buttonName1 ? <button>{data.buttonName1}</button> : null } 
                            { data.buttonName2 ? <button>{data.buttonName2}</button> : null }
                        </div>
                    </div>
                );
            })
        );
    }
    render() {
        return (
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 pdg-0px">
                    <div className="alerts">
                        <div className="alerts__title">Alerts</div>
                        {this.renderContent()}
                        <div className="alerts__viewall">
                            <button>View All</button>
                        </div>
                    </div>
                    
                </div>
        )
    }
}
export default Alerts;