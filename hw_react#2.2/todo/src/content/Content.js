import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../styles/Content.css';
import Task from './Task.js';
import InputData from './InputData.js';
import AddTaskBtn from './AddTaskBtn.js';
import DoneTask from './DoneTask.js';

class Content extends Component {
	render() {
		let {onClickSaveTask, onClickChangeTask, store} = this.props;
		return (
			<div className="content__main">
				<Task
					data={store}
					onClickChangeTask = {onClickChangeTask}
				/>
				<div className="content__addTask">
					<InputData
						className="content"
						onClickSaveTask = {onClickSaveTask}
					/>
					<AddTaskBtn/>
				</div>
				<DoneTask/>
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
		}),
	onClickChangeTask: newTask => 
		dispatch({
			type: 'Change_task',
			payload:{
				value: newTask,
				id: Date.now()
			}
		})
});

export default connect(mapStateToProps, mapDispatchToProps) (Content);
