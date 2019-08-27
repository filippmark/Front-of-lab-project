import React, {Component} from 'react';

import "./FilmCatalog.css";
import FilmCard from '../FilmCard/FilmCard';

class FilmCatalog extends Component{
    state = {

    }

    render(){
        return(
                <div className = "filmCatalog">
                    {
                        this.props.data.map((element) => {
                            return <FilmCard data={element} key={element.id} />
                        })
                    }
                </div>
                
        )
    }
}

export default FilmCatalog;