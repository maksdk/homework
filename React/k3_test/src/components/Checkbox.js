import React, { Component } from 'react';
import './styles/checkbox.css';

export default class Checkbox extends Component {
	constructor(props){
		super(props);
		this.textInput = React.createRef();
	}
	render() {
		let { 
			onChange, 
			checked, 
			index, 
			className
		} = this.props;
		return(
			<div className="checkbox__wrap">
				<input
					ref={"checkbox_" + index}
					type="checkbox"
					className={`checkbox__wrap__input ${className}`}
					onChange={onChange}
					checked={checked}
				/>
				<label className="checkbox__wrap__label" />
			</div>
		);
	}
} 
	


