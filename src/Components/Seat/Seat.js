import React from 'react';
import './Seat.css';

const Seat = (props) => {
    return(
        <li className={`seat ${props.data.type}`}>

        </li>
    )
}

export default Seat;