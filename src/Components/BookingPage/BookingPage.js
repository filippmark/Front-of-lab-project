import React, {Component} from 'react';
import "./BookingPage.css";
import Scheme from '../Scheme/Scheme';
import axios from 'axios';

class BookingPage extends Component{

    state ={
        showDetails: {},
        rows: []
    }

    componentDidMount(){
        let date = new Date(this.props.location.state.date);
        this.setState({
            showDetails: this.props.location.state,
            date: date
        },() => {console.log(this.state)});

        axios.post("http://localhost:8080/seats",{
            data: this.props.location.state
        })
        .then((resp) => {
            console.log(resp.data.seats)
            this.setState({
                rows: resp.data.seats,
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){

        let info;
        if(typeof(this.state.date) === "object"){
            let month = (this.state.date.getMonth() + 1) > 10? (this.state.date.getMonth() + 1) + "": "0" + (this.state.date.getMonth() + 1);
            info = `${this.props.location.state.town.toUpperCase()}, ${this.props.location.state.cinema.toUpperCase()}, ${this.state.date.getDate() +  '.'  + month },
            ${this.props.location.state.time.toUpperCase()}`;
        }
            
        return(
            <div className="bookingPageWrapper">
                <div className="bookingShowDetails">
                    <div>
                    {
                        info
                    }
                    </div>
                </div>
                <div className="bookingDelimiter">

                </div>
                <div className="bookingSchemeWrapper">
                    <Scheme isAdminRows={false} rows={this.state.rows}/>
                </div>
                <div className="bookingInfoWrapper">
                        <div>
                            {`Количество билетов: `}
                        </div>
                        <div className="bookingSpacer">

                        </div>
                        <div>
                            {`Общая сумма заказа:`}
                        </div>
                        <div className="bookingSpacer">

                        </div>
                        <button className="bookTicketsBtn">
                            Заказать
                        </button>
                </div>
            </div>
        );
    }

}

export default BookingPage;