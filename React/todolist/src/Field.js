import React, { Component } from 'react';
import FieldErrorMsg from './FieldErrorMsg.js';

export default class Field extends Component {
	render() {
		let { 
			error,
			className,
			placeholder,
			name,
			onfocus
		} = this.props;
		return (
			<div className={`${className}__inputData`}>
				<input 
					ref={ input => this.textInput = input}
					className={`${className}__inputData--field `}
					type='text'
					placeholder={placeholder}
					name={name}
					onFocus={onfocus}
				/>
				{error && 
					<FieldErrorMsg
						className={className}
						message={error}
				/>}
			</div>	
		);
	}
}

