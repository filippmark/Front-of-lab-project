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
                <div className="mainImg" style={{backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),
                url(http://image.tmdb.org/t/p/original/${this.state.data.backdrop_path})`}}>
                    <div className="filmDetails">
                        <div className="filmPagePoster">
                            <img src={`http://image.tmdb.org/t/p/original/${this.state.data.poster_path}`} alt={this.state.data.title}/>    
                            <div className="buyTickets">
                                <div>
                                    Купить билет
                                </div>
                            </div>
                        </div>
                        <div className="filmDescription">
                                <h1> {this.state.data.title} </h1>
                                <h2 className="rating">
                                    {`Рейтинг фильма: ${this.state.data.vote_average}`}
                                </h2>
                                <article>
                                    <h2> Обзор: </h2>
                                    {this.state.data.overview}
                                </article>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilmPage;