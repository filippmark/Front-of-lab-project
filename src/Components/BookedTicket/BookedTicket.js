import React, {Component} from 'react';

import './BookedTicket.css';

class BookedTicket extends Component{
    
    calculateSum = () => {
        let sum = 0;
        this.props.data.reservations.map((reservation) => {
            let price = parseInt(this.props.data.show.prices.find(this.findPrice(reservation.seat.type)).price);
            console.log(price);
            if(!isNaN(price)){
                sum += price;
            }
        })
        this.props.data.services.map((service) => {
            sum += service.sum;
        })
        
        return sum;
    }


    findPrice = (type) => { 
        return function(element){
            if(element.type.split(' ').join('').toLowerCase() === type.toLowerCase())
                return element;
        }
    }

    render(){
        let date = new Date(this.props.data.show.date);
        let dateStr = `${date.getDate() < 10 ? '0' + date.getDate(): date.getDate()}.${date.getMonth() < 10 ? '0' + date.getMonth(): date.getMonth()}`;
        return(
            <li className = "bookedTicket">
                <ul className="bookedTicketDetailsList">
                    <li className="place bookedTicketDetailsItem">
                        <div>
                            {`${this.props.data.show.town.toUpperCase()}, ${this.props.data.show.cinema.name.toUpperCase()}`} 
                        </div>
                    </li>
                    <li className="hall bookedTicketDetailsItem">
                        <div>
                            {`${this.props.data.show.hall.hallName.toUpperCase()}`} 
                        </div>
                    </li>
                    <li className="movie bookedTicketDetailsItem">
                        <div>
                        {`${this.props.data.show.movie.name.toUpperCase()}`}
                        </div>
                    </li>
                    <li className="rowSeat bookedTicketDetailsItem">
                        <ul className="bookedTicketsPositionsList">
                            {
                                this.props.data.reservations.map((reservation) => {
                                    return <li className="bookedTicketsPositionsItem"> {`ряд ${reservation.seat.row}, место ${reservation.seat.num}`}</li>
                                })
                            }
                        </ul>
                    </li>
                    <li className="services bookedTicketDetailsItem">
                        <ul className="bookedServicesList">
                            {
                                this.props.data.services.length === 0 ?
                                "Услуги не заказаны"
                                :
                                this.props.data.services.map((service) => {
                                    return <li className="bookedServicesItem"> {`услуга ${service.obj.type}, количество ${service.amount}`}</li>
                                })
                            }
                        </ul>
                    </li>    
                    <li className="dateTime bookedTicketDetailsItem">
                        <div>
                            {`${dateStr}, ${this.props.data.show.time}`}
                        </div>
                    </li>
                    <li className="priceOfBookedTicket">
                        <div>
                            {
                                `${this.calculateSum()} р.`
                            }
                        </div>
                    </li>
                </ul>
            </li>
        )
    }
}

export default BookedTicket;