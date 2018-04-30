import React, { Component } from 'react';

import Button from '../Button.js';
import './styles/addTask.css'

export default class AddTask extends Component {
	constructor(props) {
		super(props);
		this.handleSaveTask = this.handleSaveTask.bind(this);
	}
	handleSaveTask(e) {
		this.input.value && this.props.addTask(this.input.value);
		this.input.value = '';
		this.input.focus();
	}

	componentDidMount() {
		this.input.focus();
	}

	render() {
		return (
			<div className='addTask'>
				<div  className='addTask__inputData'>
					<input
						type='text'
						className='addTask__fieldInput'
						ref={input => this.input = input}
					/>
					<Button
						className='addTask--btnSave'
						children='+'
						onclick={this.handleSaveTask}
					/>
					{
						// <Button
						// 	className='addTask--btnCancel'
						// 	children='x'
						// 	onclick={() => this.input.value=''}
						// />
					}
				</div>
			</div>
		);
	}
	
}