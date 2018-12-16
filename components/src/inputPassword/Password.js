import React, {Component} from 'react';
import './style.css';

export default class Password extends Component{
	constructor(props){
		super();
		this.state = {
			isPasswordVisible:false
		};
		this.fieldPassword = React.createRef();
	}
	onChangeField(e){

	}
	toggleVisiblePassword(e){
		let {isPasswordVisible} = this.state;
		this.setState({isPasswordVisible:!isPasswordVisible})
	}
	render(){
		let {isPasswordVisible} = this.state;
		return(
			<div className='password'>
				<input 
					className='password_field'
					placeholder='Password'
					type={`${isPasswordVisible ? 'text' : 'password'}`}
					ref={this.fieldPassword}
					onChange={(e) => this.onChangeField(e)}
				/>
				{!isPasswordVisible && 
					<span 
						className='password_field_closedEye'
						onClick={(e) => this.toggleVisiblePassword(e)}
					/>
				}
				{isPasswordVisible && 
					<span 
						className='password_field_openedEye'
						onClick={(e) => this.toggleVisiblePassword(e)}
					/>
				}
			</div>	
		);
	}
}