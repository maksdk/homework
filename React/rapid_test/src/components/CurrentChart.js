import React, { Component } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import { URL_WEBSOCKETS__GEMINI } from '../constants/constants.js';
import './styles/currentChart.css';

export default class CurrentChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			labelsChart:  [],
			dataChart: []
		}
		this.getCurrentValue = this.getCurrentValue.bind(this);
	}
	componentDidMount() {
		this.getCurrentValue();	
	}
	getCurrentValue() {
		const ws = new WebSocket(`${URL_WEBSOCKETS__GEMINI}/btcusd`);
		ws.onmessage = e => {
			let response = JSON.parse(e.data);
			if (response.socket_sequence) {
				let labels = this.state.labelsChart;
				let data = this.state.dataChart
				if (data.length > 20) {
					data.splice(0, data.length - 20);
					labels.splice(0, labels.length - 20)
				}
				let label = moment(response.timestamp).format('HH:mm:ss');
				this.setState({
					labelsChart:  [...labels, label],
					dataChart: [...data, response.events[0].price]
				})
			}
		}
	}
	render() {
		let { 	
			labelsChart, 
			dataChart
		} = this.state;
		return(
			<div className='currentChart'>
				<h3 
					className="currentChart__title"
					children="Current value"
				/>
				<Line
					data={{
			        	labels: [...labelsChart],
			        	datasets: [{
			            label: '# Line',
			            data: [...dataChart],
			        }]}}
				/>
			</div>
		)
	}	
} 
