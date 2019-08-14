import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  {Switch}  from 'react-router-dom';


import Toolbar from './Components/Toolbar/Toolbar';
import Login from './Components/Login/Login';
import Reg from "./Components/Reg/Reg";
import './App.css';

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
            <Route path = "/login" component = {Login}/>
            <Route path = "/registration" component = {Reg}/>
          </Switch>
        </div>
      </Router>
    );
  }  
}

export default App;
