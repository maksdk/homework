import React, {Component} from 'react';
import {connect} from 'react-redux';

import Btn from '../common/Btn.js';

class Editor extends Component {
	state = {
		input:""
	}
	cancel = () => {
		this.editor.classList.toggle("hide");
	}
	onChangeTask = (e) => {
		let inputValue = e.target.value;
		this.setState({
			input: inputValue
		})
	}
	render() {
		let {
			onClickSaveTask = () => {},
			className,
			children
		} = this.props;
		let {input} = this.state;
		return (
			<div 
				className={`${className}__addData__editor hide`}
				ref={(div) => { this.editor = div}}
			>
				<input 
					className={`${className}__addData__editor--input`}
					type="text"
					ref={(input) => {this.field = input}}
					onChange={this.onChangeTask}
				/>
				<button
					className={`${className}__addData__editor--save`}
					children={`Сохранить ${children}`}
					onClick={() => {
						input && onClickSaveTask(input);
						this.field.value = "";
						this.setState({
							input: ""
						});
					}}
				>
				</button>
				
				<Btn
					className={`${className}__addData__editor--cancel`}
					children="Отмена"
					handler={this.cancel}
				/>
			</div>
		);
	}
}

//мапим обьект store в props
const mapStateToProps = state => ({store:state});

//нужен для запуска actions
//dispatch - это метод store, к ней есть доступ через connect
const mapDispatchToProps = dispatch => ({
	onClickSaveTask: newTask => 
		dispatch({
			type: 'Add_task',
			payload:{
				value: newTask,
				id: Date.now()
			}
		})
});



export default connect(mapStateToProps,mapDispatchToProps) (Editor);

			