import React, {Component} from 'react';

import './FilmPage.css'
import Schedule from '../Schedule/Schedule';
import Slider from '../Slider/Slider';
import axios from 'axios';

class FilmPage extends Component{

    state = {
        filmName: "",
        data: {},
        tickets: [],
        dates: []
    }

    componentDidMount(){
        console.log(window.scrollY);
        this.setState({
            filmName: this.props.match.params.film,
            data: this.props.location.state
        });
        axios.post("http://localhost:8080/filmDates", 
            {value: this.props.location.state.title}
        )
        .then((resp) => {
            console.log(resp);
            this.availableTickets(resp.data.start);
            this.setState({
                start: resp.data.start,
                end: resp.data.end,
                dates: resp.data.dates
            })
        })
        .catch((err) => {
            console.log(err);
        })

        console.log();
    }

    bookTicketHandler = () => {
        window.scrollTo({
            top: window.innerHeight - 70,
            behavior: "smooth"
        });
    }    

    availableTickets = (date) => {
        console.log(date);
        axios.post( "http://localhost:8080/tickets",
            {
                movie: this.props.location.state.title,
                date: date
            }
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
    };

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
                    <Slider dates={this.state.dates} changeDate={this.availableTickets}/>
                    {
                        this.state.tickets.map((element) => {
                            return <Schedule data={element} key = {element.cinema._id}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FilmPage;