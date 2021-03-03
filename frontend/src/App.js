import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ItemList from './components/ItemList';


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <ItemList/>
      </div>
    )
  }
}

export default App;
