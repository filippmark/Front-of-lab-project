import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "./Login.css";

class Login extends Component{

    
    state = {
        email: "",
        password: "",
        logged: false,
        admin: false,
    }

    componentDidMount(){
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        
        //this.loginUpdate();
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/login",
            this.state
            )
            .then((res) => {
                console.log(res);
                let obj = res.data;
                console.log(obj);
                window.localStorage.setItem("logged", JSON.stringify(obj));  
                this.props.updateLog(true);
            })
            .catch((error) => {
                console.log(error.response);
               let errorDiv = document.getElementById("errorDiv");
                console.log(error.response);
                errorDiv.innerHTML = error.response.data.message;
            });
    }

    render(){
            if (this.props.logged){
                return(<Redirect to="/"/>)
            }else{
                return(
                    <div className = "login">
                        <form>
                            <label> Ваш email </label>
                            <div>
                                <input type = "text" id = "email" name = "email"  onChange = {this.handleChange} required/>
                            </div>
                            <label> Пароль </label>
                            <input type ="password" id = "password" name = "password" onChange = {this.handleChange} required/>
                            <div className="err" id="errorDiv"/>
                            <div className="inWrapper">
                                <input type = "submit" id = "btn" value = "Войти" onClick = {this.handleSubmit}/>
                            </div>
                        </form>
                    </div>
                )
            }
    }
}

export default  Login;