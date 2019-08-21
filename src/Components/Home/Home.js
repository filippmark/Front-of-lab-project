import React, {Component} from 'react';
import axios from 'axios';

import "./Home.css";
import FilmCatalog from '../FilmCatalog/FilmCatalog';

class Home extends Component{

    state = {
        amount: 0,
        page: 0,
        totalPages: 0,
        data: []
    };

    uploadFilmsHandle = () => {
        
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=77b3d8be3013c77ba5e037900d67013b&language=ru&page=${this.state.page + 1}`
        )
        .then((resp) => {
            console.log(resp);
            console.log(resp.data.results);
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

    componentDidMount(){
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=77b3d8be3013c77ba5e037900d67013b&language=ru&page=1',
        )
        .then((resp) => {
            console.log(resp);
            console.log(resp.data.results);
            this.setState({data: resp.data.results, amount: resp.data.results.length, page: 1});
            this.setState({totalPages: resp.data.total_pages});
        })
        .catch((err) => {
            console.error(err);  
        })
    }

    render(){
        
        return(
            <div className="homePage">
                <FilmCatalog data={this.state.data.slice()}/>
                <div className="uploadBtn" id="uploadBtn" onClick={this.uploadFilmsHandle}>
                    <div>
                        upload
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;