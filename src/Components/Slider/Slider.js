import React, {Component} from 'react';

import './Slider.css';
import Date from '../Date/Date';


class Slider extends Component{

    state = {
        currentIndex: 0,
        amount: 20
    }

    nextDate = () => {
        console.log(this.state);
        let newIndex = this.state.currentIndex + 1;
        this.setState({currentIndex: newIndex});
    }

    previousDate = () => {
        console.log("xmmm");
        this.setState({currentIndex: (this.state.currentIndex - 1)})
    }

    render(){
        return(
            <div className="slider">
                <div className="leftArrowWrapper">
                    <img src={process.env.PUBLIC_URL + "/chevrons/left-chevron.png"} className="leftArrow" onClick={this.previousDate}/>
                </div>
                <div className="sliderDateWrapper" style={{
                  'transform': `translateX(${((this.state.currentIndex)*120)}px)`
                }}>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    
                    <Date/>
                    <Date/>
                    <Date/>
                    
                    <Date/>
                    <Date/>
                    <Date/>
                    
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    <Date/>
                    
                    <Date/>
                    <Date/>
                    <Date/>
                    
                    <Date/>
                    <Date/>
                    <Date/>
                </div>
                <div className="rightArrowWrapper">
                    <img src={process.env.PUBLIC_URL + "/chevrons/right-chevron.png"} className="rightArrow" onClick={this.nextDate}/>
                </div>
            </div>   
        )
    }
}

export default Slider;