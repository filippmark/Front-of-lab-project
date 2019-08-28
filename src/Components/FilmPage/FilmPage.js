import React, {Component} from 'react';

import './FilmPage.css'
import Schedule from '../Schedule/Schedule';
import axios from 'axios';

class FilmPage extends Component{

    state = {
        filmName: "",
        data: {},
        tickets: []
    }

    componentDidMount(){
        this.setState({filmName: this.props.match.params.film});
        this.setState({data: this.props.location.state});
        console.log(this.state);
        axios.post( `http://localhost:8080/tickets`,
            {value: this.props.location.state.title}
        )
        .then((resp) => {
            console.log(resp.data);
            this.setState({
                tickets: resp.data.data
            });
        })
        .catch((err) => {
            console.log(err);
        })
        console.log();
    }

    bookTicketHandler = () => {
        window.scrollBy(0, window.innerHeight - 70);
    }    


    render(){
        return(
            <div className="filmPage">
                <div className="mainImg" style={{backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),
                url(http://image.tmdb.org/t/p/original/${this.state.data.backdrop_path})`}}>
                    <div className="filmDetails">
                        <div className="filmPagePoster">
                            <img src={`http://image.tmdb.org/t/p/original/${this.state.data.poster_path}`} alt={this.state.data.title}/>    
                            <div className="buyTickets" onClick={this.bookTicketHandler}>
                                <div>
                                    Забронировать билет
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
                <div className="ticketsWrapper">
                    {
                        this.state.tickets.map((element) => {
                            return <Schedule data={element}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FilmPage;