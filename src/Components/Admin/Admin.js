import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import "./Admin.css";
import CinemaDetails from '../CinemaDetails/CinemaDetails';
import MovieDetails from '../MovieDetails/MovieDetails';
import ShowDetails from '../ShowDetails/ShowDetails';
import Scheme from '../Scheme/Scheme';

class Admin extends Component{
    state = {
        email: "",
        admin: false,
        logged: false
    } 


    componentDidMount(){
        let logged = window.localStorage.getItem("logged");
        if (logged !== null){
            let object = JSON.parse(logged);
            console.log(object);
            this.setState({
                logged: true,
                admin: object.user.isAdmin
            });
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    addNewAdmin = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/newAdmin", this.state)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
            return(
                <div className="adminPage">
                    <div className="addAdmin">
                        <label> Email пользователя </label>
                        <input type="text" name="email" onChange={this.handleChange}/>
                        <input type="submit" value="Сделать администратором" onClick={this.addNewAdmin}/>
                    </div>
                    <CinemaDetails/>
                    <Scheme/>
                    <MovieDetails/>
                    <ShowDetails/>
                </div>
            )
    }
}


export default Admin;