import React, {Component} from 'react';
import axios from 'axios';

import "./Home.css";
import FilmCatalog from '../FilmCatalog/FilmCatalog';

class Home extends Component{

    state = {
        amount: 0,
    };

    render(){
        
        return(
            <div>
                <div className="filter">
                    <div  className = "town">
                        <label> Город: </label>
                        <input type="text"/>
                    </div>
                    <div className="cinema">
                        <label> Кинотеатр: </label>
                        <input type="text"/>
                    </div>
                    <div className="date">
                        <label> День: </label>
                        <input type="text"/>
                    </div>
                    <div className="name">
                        <label> Название фильма: </label>
                        <input type="text"/>
                    </div>
                    <div className="amount">
                        <input type="text"/>
                    </div>
                    <div className="btn">
                        <input type="submit" value="поиск"/>
                    </div>
                </div>
                <div className="homePage">
                    <FilmCatalog/>
                </div>
            </div>
        )
    }

}

export default Home;