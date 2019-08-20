import React, {Component} from 'react';

import "./Reg.css"
import axios from 'axios';

class Reg extends Component{

    state = {
        email: "",
        pass: "",
        pass2: ""
    }

    handleInput = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var error = false;

        let errorDiv  = document.getElementById("errorDiv");
        errorDiv.innerText = "";
        
        if ((this.state.pass !== this.state.pass2)){
            const errorStr = "Пароли не совпадают";
            errorDiv.innerText = errorStr;
            error = true;
        }

        if((!error) && (this.state.pass.length < 0)){
            const errorStr = "Недостаточная длина пароля";
            errorDiv.innerText = errorStr;
            error = true;
        }

        if(!error){
            axios.post('http://localhost:8080/reg', this.state
              )
              .then(res => {
                console.log(res);
                if (res.status === 200){
                    if (res.data === "oke") {
                        this.props.history.push('/login');
                    } else {
                        if (!this.state.error){
                            const errorStr = `${res.data}`
                            errorDiv.innerText = errorStr;
                        }
                    }
                } 
              })
              .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
              });
        }
    }

    render(){
        
        return(
            <div className = "reg">
                <form>
                    <label> Ваш email </label>
                    <div>
                        <input type = "email" id = "email" name = "email"  onChange = {this.handleInput} required/>
                    </div>
                    <label> Введите пароль </label>
                    <input type ="password" id = "password" name = "pass" onChange = {this.handleInput} required/>
                    <label> Подтвердите </label>
                    <input type ="password"  name = "pass2" onChange = {this.handleInput} required/>
                    <div className = "err" id = "errorDiv">
                    </div>
                    <input type = "submit" id = "btn" value = "Зарегистрироваться" onClick = {this.handleSubmit}/>
                </form>
            </div>
        )    
    }
}

export default Reg;