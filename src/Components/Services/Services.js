import React, {Component} from 'react';
import "./Services.css"
import Service from "../Service/Service";

class Services extends Component{

    state = {
        price: 0,
        selected: false,
        selectedObj: {},
        amount: ""
    }

    updatePriceHandler = (data) => {
        this.setState({
            price: data.price,
            selectedObj: data,
            selected: true,
        })
    } 

    handleChange = (event) => {
        let {name, value} =  event.target;
        this.setState({
            [name]: value
        });
    }

    addServiceBtnClickHandler = () => {
        let amount = parseInt(this.state.amount);
        console.log(this.state.amount);
        if((!isNaN(amount)) && (this.state.selected)){
            let sum = parseInt(this.state.selectedObj.price) * amount;
            this.props.updater({
                obj: this.state.selectedObj,
                amount,
                sum
            });
        }
    }

    render(){
        return(
            <ul className="servicesWrapper">
                    <li className="servicesWrapperItem"> 
                        <ul className="servicesList">
                            {
                                this.props.services.map((element) => {
                                    return <Service data={element} updater={this.updatePriceHandler}/>
                                })
                            }
                        </ul>
                    </li>
                    <li className="servicesSpacer">

                    </li>
                    <li className="servicesWrapperItem">
                        {`Цена за услугу: ${this.state.price}р.`}
                    </li>
                    <li className="servicesWrapperItem">
                        <input type="text" placeholder="количество" name="amount" onChange={this.handleChange}/>
                    </li>
                    <li className="servicesWrapperItem">
                        <button className="addServiceBtn" onClick={this.addServiceBtnClickHandler}>
                            Добавить
                        </button>
                    </li>
                </ul>
        )
    }

}

export default Services;