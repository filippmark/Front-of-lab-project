import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  {Switch}  from 'react-router-dom';



import Toolbar from './Components/Toolbar/Toolbar';
import Login from './Components/Login/Login';
import Reg from "./Components/Registration/Reg";
import './App.css';
import Home from './Components/Home/Home';
import FilmPage from './Components/FilmPage/FilmPage';
import Admin from './Components/Admin/Admin';
import BookingPage from './Components/BookingPage/BookingPage';

class App extends Component{

  state = {
    sideDrawerOpen: false,
    scrolled: false,
    top: 0
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
        return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
    console.log("kek");
  };
    
  render(){
    let backDrop;

    return (
      <Router>
        <div className="App">
          <Toolbar classScroll = {this.state.scrolled ? "scrolled":"toolbar"} drawerClickHandler={this.drawerToggleClickHandler}/>  

          <Switch>
            <Route exact path = "/" component = {Home}/> 
            <Route path = "/admin"  component = {Admin}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/registration" component = {Reg}/>
            <Route path = "/filmCatalog/:film" component = {FilmPage}/>
            <Route path = "/reservation/:show" component = {BookingPage}/>
          </Switch>
        </div>
      </Router>
    );
  }  
}

export default App;
