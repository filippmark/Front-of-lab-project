import React, {Component} from 'react';
import axios from 'axios';
import './CinemaDetails.css';
import HallDetails from '../HallDetails/HallDetails';

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

    render(){
        return(
                <div className="addCinema">
                        <label> Город: </label>
                        <input type="text" name="townName" onChange={this.handleChange}/>
                        <label>Название кинотеатра</label>
                        <input type="text" name="cinemaName" onChange={this.handleChange}/>
                        <input type="submit" value="Добавить кинотеатр" className="addCinemaBtn" onClick={this.addCinemaHandler}/>
                        <HallDetails cinema={this.state.cinemaName} town={this.state.townName}/>                       
                </div>
        )
    }
}

export default AddCinema;