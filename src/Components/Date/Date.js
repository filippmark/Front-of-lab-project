import React, {Component} from 'react';

import './Date.css';

class DateSlider extends Component{

    clickHandler = () =>{
        this.props.changeDate(this.props.date)
    }

    render(){
        let date = new Date(this.props.date); 
        return(
            <div className="date" onClick={this.clickHandler}>
                <div>
                    {`${date.getDate() < 10 ? "0" + date.getDate(): date.getDate()}.${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1): (date.getMonth() + 1)}`}
                </div>
            </div>
        )
    }
}

export default DateSlider;