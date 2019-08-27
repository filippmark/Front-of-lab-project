import React, {Component} from 'react';
import './Toolbar.css';
import { Link } from 'react-router-dom';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

class toolbar extends Component{
    state = {

    }

    exitClickHandler = () => {
        localStorage.clear();
    }

    render(){
        return(
            <header className={this.props.classScroll} id = "nav">
                <nav className="toolbar_navigation">
                    <div className="toolbar_toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                    </div>
                    <div className="toolbar_logo">
                        <Link to = {'/'}> Filimon-Booking </Link>
                    </div>
                    <div className="spacer"/>
                    <div className="toolbar_navigation_items">
                         <ul className = "mainList">
                            <li> <Link to = '/login' activeStyle={{color: "#B5561C"}}> Войти </Link></li>
                            <li className="out" onClick={this.exitClickHandler}> Выйти </li>
                            <li className = "catalog">  <Link to = {'/registration'} activeStyle={{color: "#B5561C"}}> Регистрация </Link></li>
                         </ul>
                    </div>
                </nav>
            </header>
        );        
    }
}
export default toolbar;