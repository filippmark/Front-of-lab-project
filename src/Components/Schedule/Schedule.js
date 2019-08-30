import React, {Component} from 'react';

import "./Schedule.css";
import Time from '../Time/Time';

class Schedule extends Component{

    state = {

    }

    

    render(){
        return(
            <div className="schedule">
               <div className="position">
                   {`${this.props.data.cinema.name.toUpperCase()}, ${this.props.data.cinema.town.toUpperCase()}`}
               </div>
               <div className="delimiter">

               </div>
               <div className="timeVariants">
                    {
                        this.props.data.dates.map((element) => {
                            return <Time data={element} key={element.date}/>;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Schedule;