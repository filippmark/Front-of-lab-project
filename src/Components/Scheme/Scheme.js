import React, {Component} from 'react';
import './Scheme.css';
import Seat from '../Seat/Seat';
import RowOfSeats from '../RowOfSeats/RowOfSeats';

class Scheme extends Component{
    
    state = {
        rows: [],
        amount: '',
        type: '',
        amountOfRows: 0
    }

    changeHandle = (event) => {
        let {name, value} =  event.target;
        this.setState({
            [name]: value
        });
    }

    addRowHandler = () => {
        console.log(this.state);
        let amount = parseInt(this.state.amount);
        if ((!isNaN(amount)) && (amount > 0) && (this.state.type !== "")){
            let seats = Array.from({length: amount}, (v, k) => ({num: k, type: this.state.type}));
            this.setState({
                rows: this.state.rows.slice().concat([seats]),
            });
        }
    }

    render(){
        console.log(this.state.rows);
        return(  
            <div className="schemeWrapper">
                <div className="scheme">
                    <ul className="schemeList">
                        <li className="screenWrapper">
                            <div className="screen">
                                    Экран
                            </div>
                        </li>
                        <li className="rowsWrapper">
                            {
                                this.state.rows.map((element) => {
                                    return  <RowOfSeats data={element}/>       
                                })
                            }
                        </li>
                    </ul>
                </div>
                <div className="controllers">
                    <div className="addRowWrapper">
                        <input type="text" placeholder="кол-во мест" name="amount" onChange={this.changeHandle}>
                        </input>
                        <select name="type" onChange={this.changeHandle}>
                            <option> vip </option>
                            <option> basic</option>
                            <option> forPairs </option>
                        </select>
                        <button className="addRowBtn" onClick={this.addRowHandler}>
                            Добавить ряд
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Scheme;