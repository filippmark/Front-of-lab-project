import React, {Component} from 'react';
import './Toolbar.css';
import { Link } from 'react-router-dom';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

class toolbar extends Component{
    state = {
        logged: false
    }

    exitClickHandler = () => {
        localStorage.clear();
        this.setState({
            logged: false
        })
    }

    componentDidMount(){
        let logged = window.localStorage.getItem("logged");
        if (logged !== null){
            this.setState({
                logged: true
            })
        }
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
                            {this.state.logged ? <li> <Link to = '/profile' activeStyle={{color: "#B5561C"}}> Профиль </Link></li> : <li> <Link to = '/login' activeStyle={{color: "#B5561C"}}> Войти </Link></li>}
                            {this.state.logged ? <li className="out" onClick={this.exitClickHandler}> Выйти </li>: ''}
                            {this.state.logged ? "" : <li className = "catalog">  <Link to = {'/registration'} activeStyle={{color: "#B5561C"}}> Регистрация </Link></li>}
                         </ul>
                    </div>
                </nav>
            </header>
        );        
    }
}
export default toolbar;