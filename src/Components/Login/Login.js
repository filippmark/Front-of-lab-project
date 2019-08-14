import React, {Component} from 'react';
import "./Login.css"

class Login extends Component{

    
    state = {
        name: "",
        pass: ""
    }

    render(){
        

        return(
            <div className = "login">
                <form>
                    <label> Ваш логин или email </label>
                    <input type = "text" id = "userName"/>
                    <label> Пароль </label>
                    <input type ="password" id = "password"/>
                    <input type = "submit" id = "btn" value = "Войти"/>
                </form>
            </div>
        )    
    }
}

export default Login;