import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import "./Home.css";
import FilmCatalog from '../FilmCatalog/FilmCatalog';
import Variant from './Variant';

class Home extends Component{

    state = {
        amount: 0,
        page: 0,
        totalPages: 0,
        data: [],
        town: "",
        cinema: "",
        day: "",
        film: "",
        amountPlaces: "",
        previous:"",
        variants: [],
    };


    componentDidMount(){
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=77b3d8be3013c77ba5e037900d67013b&language=ru&page=1',
        )
        .then((resp) => {
            this.setState({data: resp.data.results, amount: resp.data.results.length, page: 1});
            this.setState({totalPages: resp.data.total_pages});
        })
        .catch((err) => {
            console.error(err);  
        })
    }

    searchHandler = (event) => {
        event.preventDefault();
        console.log("kekekk");
        axios.post("http://localhost:8080/search", {
            town: this.state.town,
            cinema: this.state.cinema,
            day: this.state.day,
            film: this.state.film,
            amount: this.state.amountPlaces
        })
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    variantClickHandler = (e) => {
        console.log(e.target.innerHTML);
        document.getElementById(e.target.id).parentElement.style.display ="none";
        const value = e.target.innerHTML;
        console.log(e.target.id);
        let name = e.target.id.slice(0, e.target.id.length - 2);
        console.log(name);
        this.setState({
            [name]: value
        });
        let input = document.getElementById(`in_${this.state.previous}`);
        console.log(input);
        input.value = value;
    }

    changeHandleWithouHints = (e) => {
        let {name, value} = e.target;
        if (this.state.previous !== ""){
            document.getElementById(this.state.previous).style.display = "none";
            this.setState({
                variants: []
            })
        }
        this.setState({
            [name]: value
        });
    }


    changeHandle = (e) => {
        const {name, value} = e.target;
        console.log(name);
        if ((this.state.previous !== "") && (this.state.previous !== name)){
            console.log("kek");
            document.getElementById(this.state.previous).style.display = "none";
            this.setState({
                variants: []
            })
        }
        if (value !== ""){
            this.setState({
                [name]: value
            });
            console.log(this.state.previous);
            let element = document.getElementById(name);
            element.style.display = "block";
            axios.post(`http://localhost:8080/search/${name}`,
                {
                    value
                }
            )
            .then((resp) => {
                console.log(resp);
                this.setState({
                    variants: resp.data.variants,
                    previous: name,
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    variants: [],
                    previous: name,
                })
            })
        }else{
            this.setState({
                variants: []
            })
        }
    }
    
    
    uploadFilmsHandle = () => {    
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=77b3d8be3013c77ba5e037900d67013b&language=ru&page=${this.state.page + 1}`
        )
        .then((resp) => {
            this.setState({data: this.state.data.concat(resp.data.results), amount: this.state.amount + resp.data.results.length, page: this.state.page + 1});
            if (this.state.page === this.state.totalPages){
                let el = document.getElementById("uploadBtn");
                el.style.display = "none";
            }
            
        })
        .catch((err) => {
            console.error(err);  
        })
    }

    

    render(){
        if (window.localStorage.getItem("logged") !== null){
            return(
                <div className="homePage">
                    <div className="filter">
                        <div  className = "town">
                            <label> Город: </label>
                            <input type="text" name="town" id="in_town" onChange={this.changeHandle}/>
                            <div className="results" id="town">
                                {this.state.variants.map(element => {
                                    return <Variant data={element.town} handler={this.variantClickHandler} id = {"town_v"}/>
                                })}
                            </div>
                        </div>
                        <div className="cinema">
                            <label> Кинотеатр: </label>
                            <input type="text" name="cinema" id="in_cinema" onChange={this.changeHandle}/>
                            <div className="results" id="cinema">
                                {this.state.variants.map(element => {
                                    return <Variant data={element.name} handler={this.variantClickHandler} id = {"cinema_v"}/>
                                })}
                            </div>
                        </div>
                        <div className="date">
                            <label> День: </label>
                            <input type="text" placeholder="YYYY-MM-DD" name="day" onChange={this.changeHandleWithouHints}/>
                        </div>
                        <div className="name">
                            <label> Название фильма: </label>
                            <input type="text" name="film" id="in_film" onChange={this.changeHandle}/>
                            <div className="results" id="film">
                                {this.state.variants.map(element => {
                                    return <Variant data={element.name} handler={this.variantClickHandler} id = {"film_v"}/>
                                })}
                            </div>
                        </div>
                        <div className="amount">
                            <label> Количество мест </label>   
                            <input type="text" name="amountPlaces" onChange={this.changeHandleWithouHints}/>
                        </div>
                        <div className="btn">
                            <input type="submit" value="поиск" onClick={this.searchHandler}/>
                        </div>
                    </div>
                    <FilmCatalog data={this.state.data.slice()}/>
                    <div className="uploadBtn" id="uploadBtn" onClick={this.uploadFilmsHandle}>
                        <div>
                            upload
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/login"/>
        }                
    }

}

export default Home;