import React, {Component} from 'react';
import axios from 'axios';


import "./Admin.css";
import Place from '../Place/Place';
import AddCinema from '../AddCinema/AddCinema';
import AddMovie from '../AddMovie/AddMovie';
import AddShow from '../AddShow/AddShow';

class Admin extends Component{
    state = {
    } 

    render(){
        return(
            <div className="adminPage">
                    <div className="addAdmin">
                        <label> Email пользователя </label>
                        <input type="text"/>
                        <input type="submit" value="Сделать администратором"/>
                    </div>
                    <AddCinema/>
                    <AddMovie/>
                    <AddShow/>
            </div>
        )
    }
}


export default Admin;