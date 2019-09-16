import React, {Component} from 'react';
import './HallDetails.css';
import Scheme from "../Scheme/Scheme";
import axios from 'axios';

class HallDetails extends Component{
    
    state = {
        rows: [],
        newRows: [],
        amount: '',
        amountOfAllSeats: 0,
        type: '',
        amountOfRows: 0,
        hall: '',
        newType: '',
        seat: ''
    }

    changeHandle = (event) => {
        let {name, value} =  event.target;
        console.log(name);
        this.setState({
            [name]: value
        });
    }

    addRowHandler = () => {
        let amount = parseInt(this.state.amount);
        if ((!isNaN(amount)) && (amount > 0) && (this.state.type !== "")){
            let seats = Array.from({length: amount}, (v, k) => ({num: (k + 1), type: this.state.type, row: (this.state.newRows.length + 1)}));
            console.log(this.state);
            this.setState({
                amountOfAllSeats: this.state.amountOfAllSeats + amount,
                newRows: this.state.newRows.slice().concat([seats]),
            });
        }
    }

    addHallHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        console.log(this.state);
        if ((this.state.newRows.length > 0) && (this.props.town) && (this.props.cinema) && (this.state.hall)){
            console.log("xmmm");
            axios.post("http://localhost:8080/newHall", {
            town: this.props.town,
            cinema: this.props.cinema,
            hall: this.state.hall,
            rows: this.state.newRows,
            amount: this.state.amountOfAllSeats
            })
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            })
        } else{
             console.log("nea");
        }
    }

   

    changeType = () => {
        this.setState({
            newType: this.state.changeType
        },() => {this.setState({newType: ''})});
    }

    deleteEls = () => {
        this.setState({
            newType: "delete"
        }, () => {this.setState({newType: ''})});
    }

    copyMatrix = (matrix) => {
        return matrix.map((row) => {
            return JSON.parse(JSON.stringify(row));
        })
    }

    matrixChangHandle = (matrix) => {
        let copy =  this.copyMatrix(matrix);
        this.setState({newRows: copy});
    }

    render(){
        return(  
            <div className="schemeWrapper">
                <Scheme isAdminRows={true} rows={this.copyMatrix(this.state.newRows)} newType={this.state.newType} updater={this.rowsUpdateHandler} handler={this.matrixChangHandle}/>
                <ul className="controllers">
                    <li className="addRowWrapper">
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
                    </li>
                    <li className="addHall">  
                        <input type="text" name="hall" placeholder="название зала" onChange={this.changeHandle}/> 
                        <input type="submit" name="addHall" value="Добавить зал" onClick={this.addHallHandler}/> 
                    </li>
                </ul>
                <ul className="manageElements">
                    <li className="changeType">
                        <select name="changeType"  onChange={this.changeHandle}>
                            <option> vip </option>
                            <option> basic</option>
                            <option> forPairs </option>
                        </select>
                        <button className="changeBtn" onClick={this.changeType}>
                            Изменить тип
                        </button>
                    </li>
                    <li className="deleteBtnWrapper">
                        <button className="deleteBtn" onClick={this.deleteEls}>
                            Удалить
                        </button>
                    </li>
                </ul>   
            </div>
        )
    }
}

export default HallDetails;