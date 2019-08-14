import React, {Component} from 'react';
import "./Reg.css"

class Reg extends Component{

    state = {
        email: "",
        name: "",
        pass: "",
        pass2: ""
    }

    render(){
        
        return(
            <div className = "reg">
                <form>
                    <label> Ваш email </label>
                    <input type = "email" id = "email"/>
                    <label> Username </label>
                    <input type = "text" id = "userName"/>
                    <label> Введите пароль </label>
                    <input type ="password" id = "password"/>
                    <label> Подтвердите </label>
                    <input type ="password" id = "password"/>
                    <input type = "submit" id = "btn" value = "Зарегистрироваться"/>
                </form>
            </div>
        )    
    }
}

export default Reg;