import React  from 'react';

import "./Place.css"

const Place = (props) => {
    return(
        <div className="place">
            <div>
                Кинотеатр:{props.data.cinema}
                Тип: {props.data.type}
                <br/>
                Зал: {props.data.hall}
                Количество: {props.data.amount}
            </div>
        </div>
    )
}

export default Place;