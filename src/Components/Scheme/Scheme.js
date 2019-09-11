import React, {Component} from 'react';
import './Scheme.css';
import RowsForUser from '../RowsForUser/RowsForUser';
import RowsForAdmin from '../RowsForAdmin/RowsForAdmin';

class Scheme extends Component{

    state = {

    }

    
    copyMatrix = (matrix) => {
        return matrix.map((row) => {
            return JSON.parse(JSON.stringify(row));
        })
    }

    render(){
        let rows;
        if (this.props.isAdminRows){
            rows = <RowsForAdmin rows={this.copyMatrix(this.props.rows)} newType={this.props.newType} handler={this.props.handler}/>;
        }else{
            rows = <RowsForUser rows={this.props.rows} addTicket={this.props.addTicket}/>;
        }
        return(
            <div className="scheme">
                <ul className="schemeList">
                    <li className="screenWrapper">
                        <div className="screen">
                                Экран
                        </div>
                    </li>
                    <li className="seatsWrapper">
                        {
                            rows
                        }
                    </li>
                </ul>
            </div>
        )
    }

}

export default Scheme;