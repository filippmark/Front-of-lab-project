import React, {Component} from 'react';

import './BookedTicket.css';

class BookedTicket extends Component{
    state = {
        data: {},
    }

    findPrice = (element) => {
        if(element.type.split(' ').join('').toLowerCase() === this.props.data.seat.type.toLowerCase())
            return element;
    }

    render(){
        let date;
        let dateStr;
        if(this.props.data.show !== null){
            date = new Date(this.props.data.show.date);
            dateStr = `${date.getDate() < 10 ? '0' + date.getDate(): date.getDate()}.${date.getMonth() < 10 ? '0' + date.getMonth(): date.getMonth()}`;
        }
        return(
            <li className = "bookedTicket">
                <ul className="bookedTicketDetailsList">
                    <li className="place bookedTicketDetailsItem">
                        <div>
                            {`${this.props.data.show.town.toUpperCase()}, ${this.props.data.show.cinema.toUpperCase()}`} 
                        </div>
                    </li>
                    <li className="movie bookedTicketDetailsItem">
                        <div>
                        {`${this.props.data.show.movie.toUpperCase()}`}
                        </div>
                    </li>
                    <li className="rowSeat bookedTicketDetailsItem">
                        <div>
                            {`${this.props.data.show.hall.toUpperCase()}, ряд ${this.props.data.seat.row}, место ${this.props.data.seat.num}`}
                        </div>
                    </li>
                    <li className="dateTime bookedTicketDetailsItem">
                        <div>
                            {`${dateStr}, ${this.props.data.show.time}`}
                        </div>
                    </li>
                    <li className="priceOfBookedTicket">
                        <div>
                            {`${this.props.data.show.prices.find(this.findPrice).price}р.`}
                        </div>
                    </li>
                </ul>
            </li>
        )
    }
}

export default BookedTicket;