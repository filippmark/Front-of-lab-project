import React from 'react';
import './RowsForUser.css';
import RowOfSeats from '../RowOfSeats/RowOfSeats';

const RowsForUser = (props) => {
    console.log(props);
    return(
        <div className="rowsWrapper" id="rowsWrapper">
            {
                props.rows.map((element) => {
                    return  <RowOfSeats data={element} addTicket={props.addTicket} key={element._id}/>       
                })
            }
        </div>
    )
}

export default RowsForUser;