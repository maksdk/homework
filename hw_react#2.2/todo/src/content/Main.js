import React, {Component} from 'react';
import {connect} from 'react-redux';

import './_content.css';
import AddData from './AddData.js'
import ListTasks from './ListTasks.js'

class Main extends Component {
	render() {
		console.log("this.props");
		console.log(this.props);
		let {task} = this.props;
		return (
			<div className="todo__content__main">
				<ListTasks
					data={task}
				/>
				<AddData
					className="main"
					children="задачу"
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({task: state });
const mapDispatchToProps = dispatch => ({
	onClickAddTask: newItem => 
	dispatch({
		type: 'Add task',
		payload:{
			value:newItem,
			id: Date.now()
		}
	})
})

export default connect(mapStateToProps, mapDispatchToProps) (Main);