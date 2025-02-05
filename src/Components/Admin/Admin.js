import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import "./Admin.css";
import CinemaDetails from '../CinemaDetails/CinemaDetails';
import MovieDetails from '../MovieDetails/MovieDetails';
import ShowDetails from '../ShowDetails/ShowDetails';

class Admin extends Component{
    state = {
        email: "",
        admin: false,
    } 


    componentDidMount(){
        let logged = window.localStorage.getItem("logged");
        if (logged !== null){
            let object = JSON.parse(logged);
            console.log(object);
            this.setState({
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
            if(this.state.admin){
                return(
                    <div className="adminPage">
                        <div className="addAdmin">
                            <label> Email пользователя </label>
                            <input type="text" name="email" onChange={this.handleChange}/>
                            <input type="submit" value="Сделать администратором" onClick={this.addNewAdmin}/>
                        </div>
                        <CinemaDetails/>
                        <MovieDetails/>
                        <ShowDetails/>
                    </div>
                )
            }else{
                return <Redirect to="/login"/>
            }
            
    }
}


export default Admin;