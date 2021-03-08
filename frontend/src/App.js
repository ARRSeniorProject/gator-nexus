import React, { Component } from 'react';
import SideBar from './components/SideBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemList from './components/ItemList';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Analysis from './pages/Analysis';
import NewProfile from './pages/NewProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SideBar />
          <Switch>
            <Route path="/" exact component={ItemList} />
            <Route path="/api/directory" exact component={Directory} />
            <Route path="/api/analysis" exact component={Analysis} />
            <Route path="/api/newprofile" exact component={NewProfile} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
