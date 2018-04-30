import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import './styles/main.css';

import { findIndex } from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';

import List from './CenterContent/List.js';
import AddTask from './CenterContent/AddTask.js';
import Calendar from './LeftMenu/Calendar/Calendar.js';
import CursorImg from './CursorImg.js';


class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cursorImg: null,
			month: moment()
		}

		this.dragStart = this.dragStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.drag = this.drag.bind(this);
		this.dragEnter = this.dragEnter.bind(this);
		this.dragTaskRigth = this.dragTaskRigth.bind(this);
		this.dragTaskLeft =  this.dragTaskLeft.bind(this);
		this.findIndexChildInDOM =  this.findIndexChildInDOM.bind(this);
		this.selectPrevMonth =  this.selectPrevMonth.bind(this);
		this.selectNextMonth =  this.selectNextMonth.bind(this);
		this.selectDay =  this.selectDay.bind(this);
		this.renderCursorImage =  this.renderCursorImage.bind(this);
	}
	
	dragStart(e){
		let elemDrag = e.target.parentNode;
		let elemCoords = this.getCoords(elemDrag);
		this.deltaX = e.pageX - elemCoords.left;
	   this.deltaY = e.pageY - elemCoords.top;
	   
	   let indexStart = this.findIndexChildInDOM(e.target);
	   let { task, startDragTask }	= this.props;
	   	
   	startDragTask(
   		indexStart
   	);

   	this.setState({
   		cursorImg: {
				content: task[indexStart].content,
				width: elemDrag.offsetWidth,
				height: elemDrag.offsetHeight
			}
		})
	}

	dragEnter(e) {
		if (e.target.parentNode.classList.contains('hide')) return;
		console.log("dragEnter");
		
		let { task } = this.props;

		let indexStart = findIndex(task, {hide: true});
		let indexEnter =  this.findIndexChildInDOM(e.target);
		
		this.props.shiftTask(
			indexStart, 
			indexEnter
		);
	}

	dragTaskRigth(e) {
		let { task } = this.props;
		let indexStart = findIndex(task, {hide: true});
		let indexEnter = this.findIndexChildInDOM(e.target);

		if (indexStart !== indexEnter) return;
		if (!indexStart) return;

		let prevDepth = task[indexStart - 1].depth,
			thisDepth = task[indexStart].depth;
		if (prevDepth.length - thisDepth.length < 0) return;
		
		this.props.dragTaskRigth(
			indexStart
		); 
	}

	dragTaskLeft(e) {
		let { task } = this.props;
		let indexStart = findIndex(task, {hide: true});

		let listChildren = [...this.list.children];
		let indexEnter = findIndex(listChildren, e.target.parentNode);
		
		if (indexStart !== indexEnter) return;
		
		console.log("dragTaskLeft");
		
		this.props.dragTaskLeft(
			indexStart
		);
	}

	drag(e) {
		let { todolist } = this.props;
		let cursorImg = todolist.lastChild;
		cursorImg.style.left = e.pageX - this.deltaX + 'px';
		cursorImg.style.top = e.pageY - this.deltaY + 'px';
	}

	dragEnd(e) {
		let { task } = this.props;
		let indexDragElem = findIndex(task, {hide: true});
		
		this.props.endDrag(
			indexDragElem
		);

		this.setState({
			cursorImg: null
		});
	}

	renderCursorImage(cursorImg) {
		let { todolist} = this.props;
		return (
			ReactDOM.createPortal(
				<CursorImg 
					task={cursorImg.content}
					className='cursorImg'
					style={{
						width: cursorImg.width,
						height: cursorImg.height
					}}	
				/>,
				todolist
			)
		);
	}
	
	selectPrevMonth () {
		let { month } = this.state;
		this.setState({
			month: month.subtract(1, 'months')
		})
	}
	selectNextMonth () {
		let { month } = this.state;
		this.setState({
			month: month.add(1, 'months')
		})
	}

	selectDay() {
		console.log("selectDay");
	}

	findIndexChildInDOM(elem) {
		let listChildren = [...this.list.children],
			child = elem.parentNode.parentNode.parentNode;
		return findIndex(listChildren, child);
	}

	getCoords(elem) {
		let box = elem.getBoundingClientRect();
		return {
	      top: box.top,
	      left: box.left
	    };
	}

	render() {

		let { 
			addTask, 
			deleteTask, 
			hideOpenSubtask, 
			onClickDoneTask, 
			task
		} = this.props;
		let { 
			cursorImg, 
			month 
		} = this.state;
		console.log(task);
		return (
			<Fragment>
				<div className='leftMenu'>
					<Calendar 
						selectPrevMonth={this.selectPrevMonth}
						selectNextMonth={this.selectNextMonth}
						selectDay={this.selectDay}
						month={month}
					/>
				</div>
				<div className='content'>
					<List 
						ref={list => this.list = list}
						allTasks={task}
						deleteTask={deleteTask}
						hideOpenSubtask={hideOpenSubtask}
						onClickDoneTask={onClickDoneTask}
						dragTaskLeft={this.dragTaskLeft}
						dragStart={this.dragStart}
						dragEnd={this.dragEnd}
						drag={this.drag}
						dragEnter={this.dragEnter}
						dragTaskRigth={this.dragTaskRigth}
					/>
					<AddTask addTask={addTask}/>
				</div>
				{
					cursorImg && this.renderCursorImage(cursorImg)
				}
			</Fragment>	
		);
	}
}




const mapStateToProps = state => (
	{
		task: state.task
	}
);

const mapDispatchToProps = dispatch => ({
	addTask: task => {
		dispatch({
			type: 'ADD__TASK',
			payload: {
				content: task,
				depth: [],
				firstTask: true,
				creationDate: moment().format('DD.MM.YYYY'),
				exactCreationTime: moment().format('DD.MM.YYYY HH:mm:ss')
			}
		})
	},
	deleteTask: index => {
		dispatch({
			type: 'DELETE__TASK',
			payload: {
				index
			}
		})
	},
	onClickDoneTask: index => {
		dispatch({
			type: 'DONE__TASK',
			payload: {
				index
			}
		})
	},
	startDragTask: index => {
		dispatch({
			type: 'START__DRAG__TASK',
			payload: {
				index
			}
		})	
	},
	endDrag: index => {
		dispatch({
			type: 'END__DRAG__TASK',
			payload: {
				index
			}
		})	
	},
	shiftTask: (indexStart, indexEnter) => {
		dispatch({
			type: 'SHIFT__TASK',
			payload: {
				indexStart,
				indexEnter
			}
		})
	},
	dragTaskRigth: index => {
		dispatch({
			type: 'SHIFT__SUBTASK__RIGHT',
			payload: {
				index
			}
		})
	},
	dragTaskLeft: index => {
		dispatch({
			type: 'SHIFT__SUBTASK__LEFT',
			payload: {
				index
				
			}
		})
	},
	hideOpenSubtask: index => {
		dispatch({
			type: 'HIDE__OPEN__SUBTASK',
			payload: {
				index
			}
		})
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps	
)(TodoList);