import React, { Component } from 'react';
import Calculator from './Calculaor.js';
import Header from './Header.js';
import StaticChart from './StaticChart.js';
import CurrentChart from './CurrentChart.js';
import './styles/app.css';

export default class App extends Component {
	render() {
 		return(
			<div className='container'>
				<Header/>
				<Calculator/>
				<StaticChart/>
				<CurrentChart/>
			</div>
		)
	}
}