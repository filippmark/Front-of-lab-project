import React, {Component} from 'react';
import './Service.css';

class Service extends Component{
    
    clickHandler = () => {
        this.props.updater(this.props.data);
    }

    render(){
        return(
            <li className="serviceItem" onClick={this.clickHandler}>
                <img className="serviceItemImg" src={process.env.PUBLIC_URL + "/" + this.props.data.type + ".png"}/>
            </li>
        );
    }
}

export default Service;