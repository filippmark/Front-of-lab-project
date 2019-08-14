import React, {Component} from 'react';
import "./Login.css"
import { DEFAULT_ECDH_CURVE } from 'tls';

class Login extends Component{

    
    state = {
        userName: "",
        password: ""
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        console.log(this.state);
    }

    render(){
        
        return(
            <div className = "login">
                <form>
                    <label> Ваш email </label>
                    <div>
                        <input type = "text" id = "email" name = "userName"  onChange = {this.handleChange} required/>
                    </div>
                    <label> Пароль </label>
                    <input type ="password" id = "password" name = "password" onChange = {this.handleChange} required/>
                    <input type = "submit" id = "btn" value = "Войти" onClick = {this.handleSubmit}/>
                </form>
            </div>
        )    
    }
}

export default Login;