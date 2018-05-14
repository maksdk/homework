import React, { Component } from 'react';
import axios from 'axios';

import Select from './Select.js';
import './styles/header.css';
import { 
	FIAT,
	COIN,
	URL__CRYPTOCOMPARE
} from '../constants/constants.js';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quiclyCourse: []
		}
		this.onChangeSelect = this.onChangeSelect.bind(this);
		this.getQuiclyCourse = this.getQuiclyCourse.bind(this);
	}
	componentDidMount() {
		this.getQuiclyCourse();
	}
	getQuiclyCourse (fiat = 'USD') {
		axios
			.get(`${URL__CRYPTOCOMPARE}price?fsym=${fiat}&tsyms=${COIN}`)
			.then( res => {
				this.setState({
					quiclyCourse: res.data
				})
			})

	}
	onChangeSelect(e) {
		this.getQuiclyCourse(e.target.value);
	}
	render() {
		let { quiclyCourse } = this.state;
		return(
			<div className='header'>
				<Select
					className='header__select'
					onChange={this.onChangeSelect}
					option={FIAT}
				/>		
				<div className='header__viewPrice'>
					{Object.keys(quiclyCourse).map( (item, i) => (
						<div 
							key={i}
							className='header__viewPrice__item'
						>	
							<span children={item} />
							<span children={quiclyCourse[item]}/>
						</div>
					))}
				</div>
			</div>
		)
	}
}