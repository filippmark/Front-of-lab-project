import React, {Component} from 'react';

import "./FilmCard.css";

class FilmCard extends Component{
    state = {

    }

    render(){
        return(
            <div className="filmCard">
                <div className="filmPoster">    
                    <a href="onliner.by">
                        <img src="./posters/1.jpg" alt="lol"/>
                    </a>
                </div>
                <div className="filmName">     
                    <div>
                            <a href="lolol">
                                Hobs asd Shaw 
                            </a>     
                    </div>
                </div>
            </div>
        )
    }
}

export default FilmCard;