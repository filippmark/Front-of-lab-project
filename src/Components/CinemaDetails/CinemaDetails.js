import React, {Component} from 'react';
import axios from 'axios';
import './CinemaDetails.css';

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
                        <label> Город: </label>
                        <input type="text" name="townName" onChange={this.handleChange}/>
                        <label>Название кинотеатра</label>
                        <input type="text" name="cinemaName" onChange={this.handleChange}/>
                        <input type="submit" value="Добавить кинотеатр" className="addCinemaBtn" onClick={this.addCinemaHandler}/>
                        <div>  
                            <label> Название зала </label>
                        </div>
                        <input type="text" name="hallName" onChange={this.handleChange}/> 
                        <input type="submit" name="addHall" value="Добавить зал" onClick={this.addHallHandler}/>                        
                </div>
        )
    }
}

export default AddCinema;