import React from 'react';

import './Time.css';

const Time = (props) => {
    return(
        <div className="time">
            <div>
                {props.data.time}
            </div>
        </div>
    );
}

export default Time;