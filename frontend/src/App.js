import React, { Component } from 'react';
import SideBar from './components/SideBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Analysis from './pages/Analysis';
import NewProfile from './pages/NewProfile';

class App extends Component {

  constructor() {
    super();
    this.state = {
      sidebar: false
    }
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange() { 

    if(!this.state.sidebar)
    {
    this.setState({
      sidebar: true
    });
    }
    else
    {
      this.setState({
        sidebar: false
      });
    }

  }

  render() {
    return (
      <div className="App">
        <Router>
          <SideBar handlechange={this.handlechange} state={this.state}/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/api/directory" exact component={() => <Directory handlechange={this.handlechange} state={this.state}/>}/>
            <Route path="/api/analysis" exact component={Analysis} />
            <Route path="/api/newprofile" exact component={NewProfile} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
