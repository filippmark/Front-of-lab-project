import React, {Component} from 'react';

const Price = (props) => {
    return(
        <div className="price">
            Тип: {props.data.type};
            Цена: {props.data.price}
        </div>
    );
}

export default Price;