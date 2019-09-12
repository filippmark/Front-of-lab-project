import React, {Component} from 'react';
import './Seat.css';

class Seat extends Component{

    state = {
        id: '', 
        clicked: false
    }

    componentDidMount(){
        let id = `${this.props.data.row}-${this.props.data.num}`;
        let classOfSeat;
        if ((this.props.data.type === 'delete') || (this.props.data.type === 'booked')){
            classOfSeat = this.props.data.type;
        } else{
            classOfSeat = `seat ${this.props.data.type}`;
        }
        this.setState({
            id,
            classOfSeat
        }, () => {
            if ((this.props.data.type !== 'delete') && (this.props.data.type !== 'booked')){
                let element = document.getElementById(id);
                element.onclick = this.clickHandler;
            }
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps.data.type !== this.props.data.type){
            this.setState({
                classOfSeat: 'booked'
            })
            let element = document.getElementById(this.state.id);
            element.onclick = null;
        }
    }
    

    clickHandler = (event) => {
        let clicked;
        let classOfSeat;
        if (!this.state.clicked){
            this.props.addTicket(this.props.data, false);
            classOfSeat = 'seat prebooked';
            clicked = true;
        }else{
            this.props.addTicket(this.props.data, true);
            classOfSeat = `seat ${this.props.data.type}`;
            clicked = false;
        }
        this.setState({
            classOfSeat,
            clicked
        })
    }


    render(){
        return(
            <li className={this.state.classOfSeat} id={this.state.id}>

            </li>
        )
    }
}

export default Seat;