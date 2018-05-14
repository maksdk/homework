import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API_KEY = "2935ff6750c539db79a4598c169967c0";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.getWeather = this.getWeather.bind(this);
  }
  getWeather(e){
    console.log(e.target);
    // fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    //   .then( res => res.json())
    //   .then( data => console.log(data))
  }
  render() {
    return (
      <div>
        <button
          children='get'
          onClick={this.getWeather}
        />
      </div>
    );
  }
}

export default App;
