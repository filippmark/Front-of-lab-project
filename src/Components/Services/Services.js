import React, {Component} from 'react';
import "./Services.css"
import Service from "../Service/Service";

class Services extends Component{

    state = {
        price: 0,
        selected: {}
    }

    updatePriceHandler = (data) => {
        this.setState({
            price: data.price,
            selected: data
        })
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
                        <button className="addServiceBtn">
                            Добавить
                        </button>
                    </li>
                </ul>
        )
    }

}

export default Services;