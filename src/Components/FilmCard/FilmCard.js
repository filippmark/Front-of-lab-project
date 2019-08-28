import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import "./FilmCard.css";

class FilmCard extends Component{
    state = {

    }

    

    render(){
        return(
            <div className="filmCard">
                <div className="filmPoster">    
                    <Link to={{
                        pathname: `/filmCatalog/${this.props.data.original_title.split(" ").join("")}`,
                        state: this.props.data
                    }}>
                        <img src={`http://image.tmdb.org/t/p/w342/${this.props.data.poster_path}`} alt={this.props.data.title}/>
                    </Link>
                </div>
                <div className="filmName">     
                    <div>
                        <Link to={{
                            pathname: `/filmCatalog/${this.props.data.original_title.split(" ").join("")}`,
                            state: this.props.data
                        }}>
                            {this.props.data.title}
                        </Link>   
                    </div>
                </div>
            </div>
        )
    }
}

export default FilmCard;