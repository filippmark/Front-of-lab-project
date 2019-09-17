import React, {Component} from 'react';
import axios from 'axios';

class AddMovie extends Component{
    state = {
        
        name: "",
        start: "",
        end: "",
        description: "",
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }


    addFilm = (event) => {
        axios.post("http://localhost:8080/films", {
            name: this.state.name,
            start: this.state.start,
            end: this.state.end,
            overview: this.state.overview,
            poster_path: this.state.poster_path,
            backdrop_path: this.state.backdrop_path,
            vote_average: this.state.vote_average
        })
        .then((resp) => {

        })
        .catch((err) => {

        })
    }

    render(){
        return(
            <div className="addMovie">
                <label> Название фильма</label>
                <input type="text" name="name" onChange={this.handleChange}/>
                <label> Начало проката </label>
                <input type="text" name="start" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                <label> Конец проката</label>
                <input type="text" name="end" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                <label> Рейтинг </label>
                <input type="text" name="vote_average" onChange={this.handleChange}/>
                <label> Описание</label>
                <textarea name="overview" onChange={this.handleChange}/>
                <label> Постер </label>
                <input type="text" name="poster_path" onChange={this.handleChange}/>
                <label> Фон </label>
                <input type="text" name="backdrop_path" onChange={this.handleChange}/>
                <input type="submit" value="Добавить фильм" onClick={this.addFilm}/>
            </div>
        )
    }
}

export default AddMovie;