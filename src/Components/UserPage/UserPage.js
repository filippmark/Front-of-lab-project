import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './UserPage.css';
import BookedTicket from '../BookedTicket/BookedTicket';
import axios from 'axios';

class UserPage extends Component{
    state = {
        bookedTickets: [],
        lastBtn: '',
        user: {}
    }

    componentDidMount(){
        if (this.props.logged){
            let logged = JSON.parse(window.localStorage.getItem("logged"));
            console.log(logged);
            let element = document.getElementById('activeBtn');
            this.setState({
                user: logged.user
            }, () => {element.click();});
        }
    }


    clickHandler = (event) => {
        console.log(event.target.id);
        let previousBtn = document.getElementById(this.state.lastBtn);
        if(previousBtn !== null){
            previousBtn.style.background = 'rgb(37, 13, 173)';
        }
        let btn = document.getElementById(event.target.id);
        btn.style.background = '#4CAF50';
        this.setState({
            lastBtn: event.target.id
        })
        axios.post('http://localhost:8080/bookedTickets',
        {
            active: event.target.id === 'activeBtn',
            userId: this.state.user._id
        })
        .then((resp) => {
            console.log(resp);
            this.setState({
                bookedTickets: resp.data
            }, () => {console.log(this.state.bookedTickets)});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        if (this.props.logged){
            return(
                <div className="userPageWrapper">
                    <div className="userDetails">
                        <div className="userPhotoWrapper">
    
                        </div>
                        <div className="userInfo">
                            {this.state.user.email}
                        </div>
                        <ul className="bookedTicketsControllers">
                            <li className="bookedTicketsControllersItem">
                                <button className="bookedTicketsBtn" id="activeBtn" onClick={this.clickHandler}>
                                    Активные
                                </button>    
                            </li>
                            <li>
                                <button className="bookedTicketsBtn" id="pastBtn" onClick={this.clickHandler}>
                                    Старые
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="userBookedTicketsWrapper">
                        <ul className="userBookedTicketsList">
                            {
                                this.state.bookedTickets.map((element) => {
                                    return <BookedTicket data={element} key={element._id}/>
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/login"/>
        }
    }
}

export default UserPage;