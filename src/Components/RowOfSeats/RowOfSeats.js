import React from 'react';
import './RowOfSeats.css';
import Seat from '../Seat/Seat';

const RowOfSeats = (props) => {
    return(
        <ul className="rowOfSeats">
                {
                    props.data.map((element) => {
                        return <Seat data={element} addTicket={props.addTicket}/>
                    })
                }
        </ul>
    )
}

export default RowOfSeats;