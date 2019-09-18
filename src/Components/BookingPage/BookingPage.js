import React, {Component} from 'react';
import "./BookingPage.css";
import Scheme from '../Scheme/Scheme';
import axios from 'axios';
import Services from "../Services/Services";

class BookingPage extends Component{

    state ={
        showDetails: {},
        rows: [],
        bookedTickets: [],
        bookedServices: [],
        amountOfService: "",
        amountOfBookedTickets: 0,
        sumOfOrder: 0,
        prices: [],
        services: []
    }

    componentDidMount(){
        let date = new Date(this.props.location.state.date);
        this.setState({
            showDetails: this.props.location.state,
            date: date,
            prices: this.props.location.state.prices,
            services: this.props.location.state.services,
        }, this.updateScheme());
    }

    updateScheme = () => {
        axios.post("http://localhost:8080/seats",{
            data: this.props.location.state
        })
        .then((resp) => {
            this.setState({
                rows: resp.data.seats,
                bookedTickets: [],
                amountOfBookedTickets: 0,
                sumOfOrder: 0
            }, () => {console.log(this.state)})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addTicket = (data, flag) => {
        let tickets;
        if (!flag){ 
            tickets = this.state.bookedTickets.slice().concat(data);
        }else{
            let index = this.state.bookedTickets.indexOf(data); 
            tickets = this.state.bookedTickets.slice();
            tickets.splice(index, 1);
        }
        this.setState({
            bookedTickets: tickets,
        }, this.updateInfo)
    }

    updateInfo = () => {
        let newAmount = this.state.bookedTickets.length;
        let newSum = 0;
        this.state.prices.map((price) => {
            let counter = 0;
            let sum = parseInt(price.price);
            this.state.bookedTickets.forEach((element) => {
                if(element.type.toLowerCase() === price.type.split(" ").join("").toLowerCase()){
                    counter++;
                }
            })
            newSum = newSum + counter*sum;
        })
        this.setState({
            amountOfBookedTickets: newAmount,
            sumOfOrder: newSum
        }, () => {console.log(this.state)});
    }


    bookTickets = () => {
        let logged = JSON.parse(window.localStorage.getItem("logged"));
        console.log(logged);
        if (this.state.bookedTickets.length > 0){
            axios.post('http://localhost:8080/bookTickets', {
            showId: this.state.showDetails._id,
            tickets: this.state.bookedTickets
            },
            {
                headers: {'Authorization': "bearer " + logged.token}
            })
            .then((resp) => {
                console.log(resp);
                this.updateScheme();
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }


    render(){

        let info;
        if(typeof(this.state.date) === "object"){
            let month = (this.state.date.getMonth() + 1) > 10? (this.state.date.getMonth() + 1) + "": "0" + (this.state.date.getMonth() + 1);
            info = `${this.props.location.state.town.toUpperCase()}, ${this.props.location.state.cinema.name.toUpperCase()}, ${this.state.date.getDate() +  '.'  + month },
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
                    <Scheme isAdminRows={false} rows={this.state.rows} addTicket={this.addTicket}/>
                </div>
                {this.state.services.length === 0 ?  " " : <Services services={this.state.services}/>}
                <div className="bookingInfoWrapper">
                        <div>
                            {`Количество билетов: ${this.state.amountOfBookedTickets}`}
                        </div>
                        <div className="bookingSpacer">

                        </div>
                        <div>
                            {`Общая сумма заказа: ${this.state.sumOfOrder} р.`}
                        </div>
                        <div className="bookingSpacer">

                        </div>
                        <button className="bookTicketsBtn" onClick={this.bookTickets}>
                            Заказать
                        </button>
                </div>
                <div className="bookingSchemeLegend">
                    <ul className="typesList">
                        <li className="type">
                            <div className="seat basic"/> 
                             - basic 
                        </li>
                        <li className="type">
                            <div className="seat vip"/>
                            - vip
                        </li>
                        <li className="type">
                            <div className="seat forPairs"/>
                            - для пар
                        </li>
                        <li className="type">
                            <div className="seat booked"/>
                            - забронированное
                        </li>
                        <li className="type">
                            <div className="seat prebooked"/>
                            - выбранное вами 
                        </li>
                        
                    </ul>
                </div>
            </div>
        );
    }

}

export default BookingPage;