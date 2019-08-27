import React, {Component} from 'react';
import axios from 'axios';

import "./AddShow.css";
import Price from '../Price/Price';
import { stat } from 'fs';

class AddShow extends Component{
    state = {
        town: "",
        cinema: "",
        hall: "",
        film: "",
        date: "", 
        type: "",
        price: "",
        prices: []
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    addShowToServerHandler = (event) => {
        event.preventDefault();
        const data = this.state;    
        axios.post("http://localhost:8081/newShow", this.state)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    isEmpty = (obj) => {
            
    }

    addPriceHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        if ((this.state.type !== "") && (this.state.price !== "")){
            console.log("lol_kekekek");
            this.setState({prices: this.state.prices.concat({
                type: this.state.type,
                price: this.state.price
            })});
        }
    }

    render(){
        return(
            <div className="addShow">
                <div className="details">
                    <label> Город </label>
                    <input type="text" name="town" onChange={this.handleChange}/>
                    <label>Название кинотеатра</label>
                    <input type="text" name="cinema" onChange={this.handleChange}/>
                    <label> Название зала </label>
                    <input type="text" name="hall" onChange={this.handleChange}/> 
                    <label> Фильм </label>
                    <input type="text" name="film" onChange={this.handleChange}/> 
                    <label> Дата </label>
                    <input type="text" name="date" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                    <input type="submit" value="добавить показ" onClick={this.addShowToServerHandler} />
                </div>
                <div className="prices">
                    <div className="adder">
                        <select name="type">
                            <option> VIP </option>
                            <option> Basic</option>
                            <option> For pairs </option>
                        </select>
                        <input type="text" name="price"/> 
                        <br/>
                        <input type="submit" value="добавить цену" onClick={this.addPriceHandler}/>
                    </div>
                    <div className="cashPrice">
                       {this.state.prices.map((element) => {
                           return <Price data = {element}/>
                       })}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddShow;