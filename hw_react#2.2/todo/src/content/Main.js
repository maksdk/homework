import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../styles/Content.css';
import AddData from './AddData.js';
import ListTasks from './ListTasks.js';
import DoneTask from './DoneTask.js';

class Main extends Component {
	render() {
		console.log(this.props);
		let {task} = this.props;
		return (
			<div className="todo__content__main">
				<ListTasks
					task={task.addTask}
				/>
				<AddData
					className="main"
					children="задачу"
				/>
				<DoneTask

				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({task:state});

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
export default connect(mapStateToProps) (Main);