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
import UserPage from './Components/UserPage/UserPage';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

class App extends Component{

  state = {
    sideDrawerOpen: false,
    scrolled: false,
    top: 0, 
    logged: false
  }

  componentDidMount(){
    let logged = window.localStorage.getItem("logged");
    if (logged !== null){
        let object = JSON.parse(logged);
        console.log(object);
        this.setState({
            logged: true
        });
    }
  }
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
        return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
    console.log("kek");
  };

  updateLog = (newState) => {
    this.setState({
      logged: newState
    })
  }
    
  render(){
    let backDrop;

    return (
      <Router>
        <ScrollToTop>
          <div className="App">
            <Toolbar classScroll = {this.state.scrolled ? "scrolled":"toolbar"} drawerClickHandler={this.drawerToggleClickHandler} logged={this.state.logged} updateLog={this.updateLog}/>  
            <Switch>
              <Route exact path = "/" render = {() =>  <Home logged={this.state.logged}/>}/> 
              <Route path = "/admin"  component = {Admin}/>
              <Route path = "/login" render = {() => <Login updateLog={this.updateLog} logged={this.state.logged}/>}/>
              <Route path = "/registration" component = {Reg}/>
              <Route path = "/filmCatalog/:film" component = {FilmPage}/>
              <Route path = "/reservation/:show" component = {BookingPage}/>
              <Route path = "/profile" render = {() => <UserPage logged={this.state.logged}/>}/>
            </Switch>
          </div>
        </ScrollToTop>
      </Router>
    );
  }  
}

export default App;
