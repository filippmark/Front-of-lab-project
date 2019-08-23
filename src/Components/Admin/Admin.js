import React, {Component} from 'react';
import axios from 'axios';


import "./Admin.css";
import Place from '../Place/Place';

class Admin extends Component{
    state = {
        townName: "",
        cinemaName: "",
        hallName: "",
        townNamePlaces: "",
        cinemaNamePlaces: "",
        hallNamePlaces: "",
        placesType: "",
        amount: "",
        filmName: "",
        start: "",
        end: "",
        description: "",
        placesArr: [],
    }

    componentDidMount(){
        window.onchange = (e) => {
            const {name, value} = e.target;
            this.setState({
                [name]: value
            });
        }
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

    addFilm = (event) => {
        axios.post("http://localhost:8080/newFilm", {
            name: this.state.filmName,
            start: this.state.start,
            end: this.state.end,
            description: this.state.description 
        })
        .then((resp) => {

        })
        .catch((err) => {

        })
    }

    render(){
        return(
            <div className="adminPage">
                    <div className="addCinema">
                        <div>
                            <form>
                                <label> Город: </label>
                                <input type="text" name="townName"/>
                                <label>Название кинотеатра:</label>
                                <input type="text" name="cinemaName"/>
                                <input type="submit" value="Добавить кинотеатр" className="addCinemaBtn" onClick={this.addCinemaHandler}/>   <br/>
                                <label> Название зала: </label>
                                <input type="text" name="hallName" /> 
                                <input type="submit" name="addHall" value="Добавить зал" onClick={this.addHallHandler}/>                    
                            </form>    
                        </div>
                        <div>
                            <form>
                                <label> Город: </label>
                                <input type="text" name="townNamePlaces"/>
                                <label>Название кинотеатра:</label>
                                <input type="text" name="cinemaNamePlaces"/>
                                <label> Название зала: </label>
                                <input type="text" name="hallNamePlaces"/>
                                <label> Тип мест: </label>
                                <select type="text" name="placesType">
                                    <option> VIP </option>
                                    <option> Basic </option>
                                    <option> For pairs </option>
                               </select>
                                <label>Количество мест:</label>
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
                    <div className="addMovie">
                        <label> Название фильма</label>
                        <input type="text" name="filmName"/>
                        <label> Начало проката </label>
                        <input type="text" name="start" placeholder="YYYY-MM-DD"/>
                        <label> Конец проката</label>
                        <input type="text" name="end" placeholder="YYYY-MM-DD"/>
                        <label> Описание</label>
                        <textarea name="description"/>
                        <input type="submit" value="Добавить фильм" onClick={this.addFilm}/>
                    </div>
                    <div className="addShow">
                        
                    </div>
            </div>
        )
    }
}


export default Admin;