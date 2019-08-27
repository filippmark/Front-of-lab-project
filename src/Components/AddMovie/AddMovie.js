import React, {Component} from 'react';
import axios from 'axios';

class AddMovie extends Component{
    state = {
        
        filmName: "",
        start: "",
        end: "",
        description: "",
    }

    componentDidMount(){
        window.onchange = (e) => {
            const {name, value} = e.target;
            this.setState({
                [name]: value
            });
        }
    }


    addFilm = (event) => {
        axios.post("http://localhost:8080/newFilm", {
            name: this.state.filmName,
            start: this.state.start,
            end: this.state.end,
            description: this.state.description 
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
                <input type="text" name="filmName"/>
                <label> Начало проката </label>
                <input type="text" name="start" placeholder="YYYY-MM-DD"/>
                <label> Конец проката</label>
                <input type="text" name="end" placeholder="YYYY-MM-DD"/>
                <label> Описание</label>
                <textarea name="description"/>
                <input type="submit" value="Добавить фильм" onClick={this.addFilm}/>
            </div>
        )
    }
}

export default AddMovie;