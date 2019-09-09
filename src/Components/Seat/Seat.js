import React, {Component} from 'react';
import './Seat.css';

class Seat extends Component{


    componentDidMount(){
        let element = document.getElementById('seat');
        element.onmousedown = this.mouseDownHandle;
        element.onmousemove = this.mouseMoveHandle;
    }
    
    mouseDownHandle = (event) => {
        console.log('down');
    }

    mouseMoveHandle = (event) => {
        console.log('move');
    }

    render(){
        return(
            <li className={`seat ${this.props.data.type}`} id={`seat`}>

            </li>
        )
    }
}

export default Seat;