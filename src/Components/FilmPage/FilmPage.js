import React, {Component} from 'react';

import './FilmPage.css'

class FilmPage extends Component{

    state = {
        filmName: "",
        data: ""
    }

    componentDidMount(){
        this.setState({filmName: this.props.match.params.film});
        this.setState({data: this.props.location.state});
    }


    render(){
        return(
            <div className="filmPage">
                <div className="leftPart">
                    <div className="filmDescription">
                        <h1>
                            {this.state.data.title}
                        </h1>

                        <p>
                            {this.state.data.overview}    
                        </p>
                    </div>
                </div>
                <div className="rightPart">
                    <div className="filmPic">
                        <img src={`http://image.tmdb.org/t/p/original/${this.state.data.poster_path}`}/>
                    </div>
                    <div className="filmDetails">
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default FilmPage;