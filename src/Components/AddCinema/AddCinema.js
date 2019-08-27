import React, {Component} from 'react';
import axios from 'axios';

import Place from "../Place/Place"

class AddCinema extends Component{
    state = {
        townName: "",
        cinemaName: "",
        hallName: "",
        townNamePlaces: "",
        cinemaNamePlaces: "",
        hallNamePlaces: "",
        placesType: "",
        amount: "",
        placesArr: [],
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }
    
    addCinemaHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/newCinema", {
            townName: this.state.townName,
            cinemaName: this.state.cinemaName
        })
        .then((resp) =>{
            console.log(resp);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    addHallHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/newHall",{
            townName: this.state.townName,
            cinemaName: this.state.cinemaName,
            hallName: this.state.hallName
        })
        .then((resp) =>{
            console.log(resp);
        })
        .catch((err) =>{
            console.error(err);
        })
    }

    addPlacesHandler = (event) => {
        event.preventDefault();
        console.log(this.state.placesArr);
        this.setState({placesArr: this.state.placesArr.concat({
            town: this.state.townNamePlaces,
            cinema: this.state.cinemaNamePlaces,
            hall: this.state.hallNamePlaces,
            type: this.state.placesType,
            amount: this.state.amount
        })});
    }



    addPlacesToServerHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/newPlaces",{
            data: this.state.placesArr.slice()  
        })
        .then((resp) => {
            this.setState({placesArr: []});
            
            console.log(resp);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    render(){
        return(
            <div className="addCinema">
            <div>
                <form>
                    <label> Город: </label>
                    <input type="text" name="townName" onChange={this.handleChange}/>
                    <label>Название кинотеатра</label>
                    <input type="text" name="cinemaName" onChange={this.handleChange}/>
                    <input type="submit" value="Добавить кинотеатр" className="addCinemaBtn" onClick={this.addCinemaHandler}/>   <br/>
                    <label> Название зала </label>
                    <input type="text" name="hallName" /> 
                    <input type="submit" name="addHall" value="Добавить зал" onClick={this.addHallHandler}/>                    
                </form>    
            </div>
            <div>
                <form>
                    <label> Город </label>
                    <input type="text" name="townNamePlaces"/>
                    <label>Название кинотеатра</label>
                    <input type="text" name="cinemaNamePlaces"/>
                    <label> Название зала </label>
                    <input type="text" name="hallNamePlaces"/>
                    <label> Тип мест </label>
                    <select type="text" name="placesType">
                        <option> VIP </option>
                        <option> Basic </option>
                        <option> For pairs </option>
                    </select>
                    <label>Количество мест</label>
                    <input type="text" name="amount"/>
                    <input type="submit" name="addPlaces" value="Добавить места" onClick={this.addPlacesHandler}/>
                </form>
            </div>
            <div className="cashPlacesWrapper">
                <div className="cashPlaces">
                    {this.state.placesArr.map((element) => {
                        return <Place data={element}/>;   
                    })}
                </div>
                <input type="submit" value="добавить места в зал" onClick={this.addPlacesToServerHandler}/>
            </div>                        
        </div>
        )
    }
}

export default AddCinema;