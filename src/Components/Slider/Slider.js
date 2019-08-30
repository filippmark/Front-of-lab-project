import React, {Component} from 'react';

import './Slider.css';
import Date from '../Date/Date';


class Slider extends Component{
    
    state = {
            currentIndex: 0,
    }
    
    previousDate = () => {
        if (this.state.currentIndex !== 0){
            let newIndex = this.state.currentIndex + 1;
            this.setState({currentIndex: newIndex});
        }
    }

    nextDate = () => {
        if ((-(this.state.currentIndex - 1)) <= this.props.dates.length)
            this.setState({currentIndex: (this.state.currentIndex - 1)});
        
    }
   
    render(){
        return(
                <div className="sliderWrapper">
                     <div className="leftArrowWrapper">
                        <img src={process.env.PUBLIC_URL + "/chevrons/left-chevron.png"} className="leftArrow" onClick={this.previousDate}/>
                    </div>
                    <div className="slider">
                        <div className="sliderDateWrapper" style={{'transform': `translateX(${((this.state.currentIndex)*120)}px)`}}>
                           {this.props.dates.map((el) => {
                               return <Date date={el} key={el} changeDate={this.props.changeDate}/>
                           })}
                        </div>
                    </div>   
                    <div className="rightArrowWrapper">
                        <img src={process.env.PUBLIC_URL + "/chevrons/right-chevron.png"} className="rightArrow" onClick={this.nextDate}/>
                    </div> 
                </div>    



                  
        )
    }
}

export default Slider;