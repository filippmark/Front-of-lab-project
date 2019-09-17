import React from 'react';
import { Link } from 'react-router-dom';

import './Time.css';

const Time = (props) => {
    return(
        <Link to={{pathname:`/reservation/${props.data.movie.name.split(" ").join("")}`, state: props.data}}>
            <div className="time">
                <div>
                    {props.data.time}
                </div>
            </div>
        </Link>
        
    );
}

export default Time;