import React, {Component} from 'react';
import "./Reg.css"

class Reg extends Component{

    state = {
        email: "",
        userName: "",
        pass: "",
        pass2: "",
        error: false
    }

    handleInput = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        

        if ((!this.state.flag) && (this.state.pass !== this.state.pass2)){
            console.log("here");
            let passInpunt = document.getElementById("password");
            passInpunt.parentElement.innerHTML += "<div class = \"err\"> Пароли не совпадают </div>";
            this.setState({flag: true});

        }

        console.log(this.state);
    }

    render(){
        
        return(
            <div className = "reg">
                <form>
                    <label> Ваш email </label>
                    <div>
                        <input type = "email" id = "email" name = "email"  onChange = {this.handleInput} required/>
                    </div>
                    <label> Username </label>
                    <input type = "text" id = "userName" name = "userName" onChange = {this.handleInput} required/>
                    <div>
                        <label> Введите пароль </label>
                        <input type ="password" id = "password" name = "pass" onChange = {this.handleInput} required/>
                        <label> Подтвердите </label>
                        <input type ="password"  name = "pass2" onChange = {this.handleInput} required/>
                    </div>
                    <input type = "submit" id = "btn" value = "Зарегистрироваться" onClick = {this.handleSubmit}/>
                </form>
            </div>
        )    
    }
}

export default Reg;