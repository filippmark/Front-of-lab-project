import React, {Component} from 'react';

import "./Admin.css";

class Admin extends Component{
    state = {

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
                                <input type="submit" value="Добавить кинотеатр" className="addCinemaBtn"/>                        
                            </form>    
                        </div>
                        <div>
                            <form>
                                <label> Название зала: </label>
                                <input type="text" name="hallName"/>
                                <label> Тип мест: </label>
                                <input type="text" name="placesType"/>
                                <label>Количество мест:</label>
                                <input type="text" name="amount"/>
                                <>
                            </form>
                        </div>
                    </div>
                    <div className="addShow">

                    </div>
                    <div className="addMovie">

                    </div>
            </div>
        )
    }
}


export default Admin;