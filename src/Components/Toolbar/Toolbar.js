import React from 'react';
import './Toolbar.css';
import { Link } from 'react-router-dom';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

const toolbar = props => (
    <header className={props.classScroll} id = "nav">
        <nav className="toolbar_navigation">
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo">
                <Link to = {'/'}> Filimon-Booking </Link>
            </div>
            <div className="spacer"/>
            <div className="toolbar_navigation_items">
                 <ul className = "mainList">
                     <li> <Link to = '/login' activeStyle={{color: "#B5561C"}}> Войти </Link></li>
                     <li className = "catalog">  <Link to = {'/registration'} activeStyle={{color: "#B5561C"}}> Регистрация </Link></li>
                 </ul>
            </div>
        </nav>
    </header>
)

export default toolbar;