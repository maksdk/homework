import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import { find as _find } from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';

import AddTask from './AddTask/AddTask.js';
import Calendar from './Calendar/Calendar.js';
import Project from './LeftMenu/Project/Project.js';
import Task from './Task/Task.js';
import Downshift from './Downshift.js';
import { 
	findTaskByDate, 
	dropDownSubtask,
	addNewListInStore,
	getValueAllTasks
} from './actions/actions.js';
import { ALL__TASKS, INBOX__TASKS } from './constants/index.js';

import './styles/main.css';


class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDate: undefined,
			
			activeList: {
				list:INBOX__TASKS,
				color: '#887575'
			},
			
			allLists:[{
				list:ALL__TASKS,
				color:'#887575'
			},{
				list:INBOX__TASKS,
				color:'#887575'
			}],
			month: moment(),
			draggingTask: {
				list: null,
				id: null
			},

			cursorImg: null,
			//error: null,
			//setDate:'',
			
		}
		this.selectList = this.selectList.bind(this);
		this.addList = this.addList.bind(this);
		this.renderCursorImg = this.renderCursorImg.bind(this);
		this.removeCursorImg = this.removeCursorImg.bind(this);
		this.selectDay = this.selectDay.bind(this);
		this.quickSearchTask = this.quickSearchTask.bind(this);
		
	}
	

	selectDay(date) {
		let { lists, findTaskByDate} = this.props;
		let list = _find(lists, {list: ALL__TASKS});
		findTaskByDate(date, list);
		this.setState({
			activeDate: date
		})
	}
	addList(list) {
		let { allLists } = this.state;
		let { addNewListInStore } = this.props;
		addNewListInStore(list.list);
		this.setState({
			allLists: [...allLists, list]
		})
		
		
	}
	selectList(list, color) {
		let { activeList} = this.state;
		if (activeList.list === list) return;
		this.setState({
			activeDate: undefined,
			activeList: {
				list: list,
				color: color
			}
		})
	}
	quickSearchTask(task) {
	// console.log(task);
		//  let { activeDate, activeList } = this.state;
		// if (activeDate) {
		// 	let { calendar } = this.props;
		// 	currentList = calendar.tasks;
		// 	downshift = calendar.downshift;
		// } else {
		// 	let list = _find(lists, {list: activeList.list});
		// 	currentList =list.tasks;
		// 	downshift = list.downshift;
		// }
	}
	renderCursorImg(task, activeList) {
		this.setState({
			cursorImg: {
				task: task,
				activeList:activeList
			},
			draggingTask: {
				list: task.list,
				id: task.id
			}
		})
	}
	removeCursorImg () {
		this.setState({
			cursorImg: null
		})
	}
	render() {
		let { lists, dueDate } = this.props;
		let { 
			draggingTask,
			activeDate,
			activeList,
			allLists,
			month,
			cursorImg
		} = this.state;

		let currentList;
		let downshift;
		if (activeDate) {
			let { calendar } = this.props;
			currentList = calendar.tasks;
			downshift = calendar.downshift;
		} else {
			let list = _find(lists, {list: activeList.list});
			currentList =list.tasks;
			downshift = list.downshift;
		}
		
		
		if (cursorImg) {
			this.body = document.body;
		}
		return (
			<Fragment>
				<div className='leftside'>
					<Calendar 
						selectDay={this.selectDay}
						month={month}
						activeDate={activeDate}
						dueDate={dueDate}
					/>
					<Project
						addList={this.addList}
						allLists={allLists}
						selectList={this.selectList}
						activeList={activeList}
						//error={error}
					/>
				</div>
				<div className='content'>
					<div className='listTasks__header'>
						{
						<span
							className='listTasks__titleList'
							children={`#${activeList.list}`}
						/>
						}
						{
							// <Downshift
							// 	items={downshift}
							// 	onChange={selectedItem => this.quickSearchTask(selectedItem)}
							// />
						}
						
					</div>
					
					<div className='listTasks'>
						<AddTask
							activeList={activeList}
							activeDate={activeDate}
							allLists={allLists}
						/>
						{currentList && 
							currentList.map( (task, index) => (
									<Task
										draggingTask={draggingTask}
										key={task.id}
										task={task}
										allLists={allLists}
										//index={index}
										activeList={activeList}
										activeDate={activeDate}
										renderCursorImg={this.renderCursorImg}
										removeCursorImg={this.removeCursorImg}
									/>
								)
							)
						}
					</div>
				</div>
				{ cursorImg &&
					ReactDOM.createPortal(
						<Task 
							activeList={cursorImg.activeList}
							task={cursorImg.task}
							classNameCursorImg='cursorImg'
						/>,
						this.body
					)
				}
			</Fragment>	
		);
	}
}


const mapStateToProps = state => ({
		lists: state.lists,
		dueDate: state.dueDate,
		calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
	findTaskByDate: (date, list) => {
		dispatch(findTaskByDate(date, list))
	},
	dropDownSubtask: (id, activeList) => {
		dispatch(dropDownSubtask(id, activeList))
	},
	addNewListInStore: list => {
		dispatch(addNewListInStore(list))
	},
	getValueAllTasks: (selectedList, allLists) => {
		dispatch(getValueAllTasks(selectedList, allLists))
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);