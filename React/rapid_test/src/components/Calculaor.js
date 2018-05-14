import React, { Component } from 'react';
import axios from 'axios';

import Select from './Select.js';
import './styles/calculator.css';
import { 
	URL__CRYPTOCOMPARE,
	FIAT,
	COIN
} from '../constants/constants.js';

export default  class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scaleExchange: 1,
			selectedCoin: 'BTC',
			selectedFiat: 'USD',
			resultCalculate: null
		}
		this.setScaleExchange = this.setScaleExchange.bind(this);
		this.selectCoin = this.selectCoin.bind(this);
		this.selectFiat = this.selectFiat.bind(this);
		this.calculateCourse = this.calculateCourse.bind(this);
	}
	setScaleExchange(e){
		this.setState({
			scaleExchange: e.target.value,
		}, () => {
			this.calculateCourse();
		})
	}
	selectCoin(e){
		this.setState({
			selectedCoin: e.target.value,
		})
	}
	selectFiat(e){
		this.setState({
			selectedFiat: e.target.value,
		})
	}
	calculateCourse() {
		let { selectedCoin, selectedFiat, scaleExchange} = this.state;
		axios
			.get(`${URL__CRYPTOCOMPARE}price?fsym=${selectedCoin}&tsyms=${selectedFiat}`)
			.then( res => {
				let course = res.data[selectedFiat] ;
				let result = course * scaleExchange;
				this.setState({
					resultCalculate: result
				})
			})
	}
	render() {
		let { 
			selectedCoin,  
			scaleExchange, 
			selectedFiat, 
			resultCalculate 
		} = this.state;
		return (
			<div className='calculator'>
				<h3
					className='calculator__title'
					children='Calculator'
				/>
				<div className='calculator__selectCurrency'>
					<Select
						className='calculator__selectCurrency__coin'
						onChange={this.selectCoin}
						option={COIN}
					/>	
					<Select
						className='calculator__selectCurrency__fiat'
						onChange={this.selectFiat}
						option={FIAT}
					/>	
				</div>
				<div className='calculator__viewResult'>
					<input 
						type='text' 
						className='calculator__inputScale'
						onChange={this.setScaleExchange}
					/>
					{resultCalculate &&
						<span className='calculator__result'>
							{`${scaleExchange} ${selectedCoin} = ${resultCalculate} ${selectedFiat}`}
						</span>
					}
				</div>	
			</div>
		);
	}
} 

