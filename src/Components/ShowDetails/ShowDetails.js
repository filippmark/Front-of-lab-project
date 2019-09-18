import React, {Component} from 'react';
import axios from 'axios';

import "./ShowDetails.css";
import Price from '../Price/Price';

class AddShow extends Component{
    state = {
        town: "",
        cinema: "",
        hall: "",
        film: "",
        date: "",
        time: "", 
        type: "",
        price: "",
        prices: [],
        services: [],
        serviceType: "",
        servicePrice: ""
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    addShowToServerHandler = (event) => {
        event.preventDefault();  
        axios.post("http://localhost:8080/newShow", this.state)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addPriceHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        if ((this.state.type !== "") && (this.state.price !== "")){
            for (let i = 0; i < this.state.prices.length; i++){
                if (this.state.prices[i].type === this.state.type)
                    return alert("Цена для данного типа уже есть.")
            }
            this.setState({prices: this.state.prices.concat({
                type: this.state.type,
                price: this.state.price
            })});
        }
    }

    addServiceHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        if ((this.state.serviceType !== "") && (this.state.servicePrice !== "")){
            for (let i = 0; i < this.state.services.length; i++){
                if (this.state.services[i].type === this.state.serviceType)
                    return alert("Цена для данного типа уже есть.")
            }
            this.setState({services: this.state.services.concat({
                type: this.state.serviceType,
                price: this.state.servicePrice
            })});
        }
    }
    
    clearServicesHandler = (event) =>{
        event.preventDefault();
        this.setState({
            services: []
        });
    }

    clearPriceHandler = (event) =>{
        event.preventDefault();
        this.setState({
            prices: []
        });
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
                    <label> Время </label>
                    <input type="text" name="time" placeholder="HH:MM" onChange={this.handleChange}/>
                    <input type="submit" value="добавить показ" onClick={this.addShowToServerHandler} />
                </div>
                <div className="showPricesAndServices">
                    <div className="prices">
                        <div className="adder">
                            <select name="type" onChange={this.handleChange}>
                                <option> VIP </option>
                                <option> Basic</option>
                                <option> For pairs </option>
                            </select>
                            <input type="text" name="price" placeholder="цена билета данного типа" onChange={this.handleChange}/> 
                            <input type="submit" value="добавить цену" onClick={this.addPriceHandler}/>
                            <input type="submit" value="очистить" className="clear" onClick={this.clearPriceHandler}/>
                        </div>
                        <div className="cashPrice">
                            {this.state.prices.map((element) => {
                                return <Price data = {element} key = {element.type}/>
                            })}
                        </div>
                    </div>
                    <div className="services">
                        <select name="serviceType" onChange={this.handleChange}>
                            <option> chips </option>
                            <option> water </option>
                            <option> popcorn </option>
                        </select>
                        <input type="text" name="servicePrice" placeholder="цена услуги" onChange={this.handleChange}/>
                        <div className="cashService">
                            {
                                this.state.services.map((element) => {
                                    return <Price data = {element} key = {element.type}/>
                                })
                            }
                        </div>
                        <input type="submit" value="добавить услугу" className="addService" onClick={this.addServiceHandler}/>
                        <input type="submit" value="убрать услуги" onClick={this.clearServicesHandler} className="clear"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddShow;