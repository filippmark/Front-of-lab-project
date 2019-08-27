import React, {Component} from 'react';

const Variant = (props) => {
    return(
        <div className="variant" onClick={props.handler} id={props.id}>
            {props.data}
        </div>
    )
}

export default Variant;