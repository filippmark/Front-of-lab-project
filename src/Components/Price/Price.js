import React, {Component} from 'react';

import "./Price.css";

const Price = (props) => {
    return(
        <div className="price">
            Тип: {props.data.type};
            Цена: {props.data.price}
        </div>
    );
}

export default Price;