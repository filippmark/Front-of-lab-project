import React, {Component} from 'react';
import './Scheme.css';
import RowsForUser from '../RowsForUser/RowsForUser';
import RowsForAdmin from '../RowsForAdmin/RowsForAdmin';

class Scheme extends Component{

    state = {

    }

    render(){
        let rows;
        console.log(this.props);
        if (this.props.isAdminRows){
            rows = <RowsForAdmin rows={this.props.rows} newType={this.props.newType}/>;
        }else{
            rows = <RowsForUser rows={this.props.rows}/>;
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