import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import "./Admin.css";
import AddCinema from '../AddCinema/AddCinema';
import AddMovie from '../AddMovie/AddMovie';
import AddShow from '../AddShow/AddShow';

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
                    <AddCinema/>
                    <AddMovie/>
                    <AddShow/>
                </div>
            )
    }
}


export default Admin;