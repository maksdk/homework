import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import Select from './Select.js';
import './styles/staticChart.css';
import { 
	URL__CRYPTOCOMPARE,
	FIAT,
	COIN, 
	PERIOD 
} from '../constants/constants.js';

export default class StaticChart extends Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedCoin: 'BTC',
			selectedFiat: 'USD',
			selectedPeriod: 'hour',
			selectedLimit: 23,
			dataChart: {},
			labelsChart: {}
		}
		this.getDataStaticChart = this.getDataStaticChart.bind(this);
		this.selectCoin = this.selectCoin.bind(this);
		this.selectFiat = this.selectFiat.bind(this);
		this.selectPeriod = this.selectPeriod.bind(this);
	}
	componentDidMount() {
		this.getDataStaticChart();
	}
	selectCoin (e) {
		this.setState({
			selectedCoin: e.target.value
		}, () => { 
		    this.getDataStaticChart()
		});
	}
	selectFiat (e) {
		this.setState({
			selectedFiat: e.target.value
		}, () => { 
		    this.getDataStaticChart()
		});
	}
	selectPeriod (e) {
		let period = e.target.value;
		let limit;
		if (period === 'month') {
			limit = 30;
			period = 'day';
		} else if (period === 'year') {
			limit = 364;
			period = 'day';
		} else {
			limit = 23;
			period = 'hour';
		} 
		this.setState({
			selectedPeriod: period,
			selectedLimit: limit
		}, () => { 
		    this.getDataStaticChart()
		});
	}
	getDataStaticChart(){
		let { 
			selectedPeriod, 
			selectedCoin, 
			selectedFiat, 
			selectedLimit 
		} = this.state;
		
		axios
			.get(`${URL__CRYPTOCOMPARE}histo${selectedPeriod}?fsym=${selectedCoin}&tsym=${selectedFiat}&limit=${selectedLimit}`)
			.then( res => {
				let allData = res.data.Data;
				let dataChart = [];
				let labelsChart = [];
				let format = selectedPeriod === 'hour' ? 'DD/MM HH:mm' : 'DD/MM/YYYY';
				let date = moment().subtract(this.limit, selectedPeriod);
				
				allData.map( ({high, time}) => {
					let label = date.add(1, selectedPeriod).format(format);
					dataChart.push(high);
					labelsChart.push(label);
				})
				this.setState({
					dataChart: dataChart,
					labelsChart: labelsChart
				})
			})
	}
	render() {
		let { dataChart, labelsChart } = this.state;
		return (
			<div className='staticChart'>
				<h3 
					className="staticChart__title"
					children="History value"
				/>
				<div className='staticChart__header'>
					<Select
						className='staticChart__select__coin'
						onChange={this.selectCoin}
						option={COIN}
					/>
					<Select
						className='staticChart__select__fiat' 
						onChange={this.selectFiat}
						option={FIAT}
					/>
					<Select
						className='staticChart__header__period'
						onChange={this.selectPeriod}
						option={PERIOD}
					/>
				</div>
				<Line
					data={{
			        	labels: [...labelsChart],
			        	datasets: [{
			            label: 'Line chart',
			            data: [...dataChart],
			        }]}}
				/>
			</div>
		)
	}
}