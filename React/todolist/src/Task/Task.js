import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	find as _find, 
	findIndex as _findIndex 
} from 'lodash';

import Button from '../Button.js';
import TaskDrag from './TaskDrag.js';
import Checkbox from '../Checkbox';
import TaskDepth from './TaskDepth.js';
import DropDownSubtask from './DropDownSubtask.js';
import TaskText from './TaskText.js';
import ColorList from './ColorList.js';
import Tag from '../Tag.js';

import { 
	CLASS__DRAGGING__ELEM, 
	CLASS__DRAGGING__DARK__BACK ,
	SHOW__TOGGLE
} from '../constants/index.js';

import { 
	doneTask, 
	dragEnterTask,
	dragEnterTaskRight,
	dragEnterTaskLeft,
	dragStartTask,
	dragEndTask,
	deleteTask,
	dropDownSubtask,
	findTaskByDate
} from '../actions/actions.js';

import './_styles.css';

class Task extends Component {
	constructor(props) {
      super(props);
      this.state = {
      	hoverCheckbox: false
      }

      this.hoverOnCheckbox = this.hoverOnCheckbox.bind(this);
      this.hoverOffCheckbox = this.hoverOffCheckbox.bind(this);
      this.getCoords = this.getCoords.bind(this);
      this.getTask = this.getTask.bind(this);
      this.removeTask = this.removeTask.bind(this);
      this.dropDownSubTask = this.dropDownSubTask.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnter = this.dragEnter.bind(this);
      this.drag = this.drag.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragEnterRight = this.dragEnterRight.bind(this);
      this.dragEnterLeft = this.dragEnterLeft.bind(this); 
      this.dontDo = this.dontDo.bind(this); 

   } 

   hoverOnCheckbox () {
   	let { done } = this.props.task;
   	if(done) return;
   	this.setState ({
   		hoverCheckbox: true
   	})
   }

   hoverOffCheckbox () {
   	let { done } = this.props.task;
   	if(done) return;
   	this.setState ({
   		hoverCheckbox: false
   	})
   }

   onClickCheckbox (task, e) {
   	let { doneTask } = this.props;
   	doneTask(task);
   }

    dragStart(e){
		let { renderCursorImg, task, dragStartTask, activeList} = this.props;
		let { priority, list, dueDate, text, id, colorList } = task;
		
		let cursorImg = {
			priority: priority,
			list: list,
			dueDate: dueDate,
			text: text,
			id: id,
			colorList: colorList
		}
		
		dragStartTask( id, activeList.list);
		renderCursorImg(cursorImg, activeList);
		
		this.taskStart = this.getTask(e.target);
		let elemCoords = this.getCoords(this.taskStart);
		this.deltaX = e.pageX - elemCoords.left;
	    this.deltaY = e.pageY - elemCoords.top;
		this.taskStartParent = this.taskStart.parentNode;
		this.taskStart.classList.add(CLASS__DRAGGING__ELEM);
		this.taskStartParent.classList.add(CLASS__DRAGGING__DARK__BACK);
	}

	dragEnter(e) {
		let { dragEnterTask, draggingTask, task, activeList } = this.props;
		if (draggingTask.id === task.id) return;
		
		dragEnterTask(
			task.id,
			draggingTask.id,
			activeList.list
		);
	}

	dragEnterRight(e) {
		let { dragEnterTaskRight, draggingTask, task, lists, activeList } = this.props;
		let findList = _find(lists, {list: activeList.list});
		let indexStart= _findIndex(findList.tasks, {id: draggingTask.id});
		
		if (indexStart === 0 ) return;
		if (draggingTask.id !== task.id) return;

		let depthTaskStart = findList.tasks[indexStart].depth.length;
		let depthTaskPrev = findList.tasks[indexStart - 1].depth.length;
		if ((depthTaskPrev - depthTaskStart) < 0) return;
		
		dragEnterTaskRight(indexStart, activeList.list);
	}

	dragEnterLeft(e){
		let {dragEnterTaskLeft, task, draggingTask, activeList} = this.props;
		if (draggingTask.id !== task.id) return;
		dragEnterTaskLeft(draggingTask.id, activeList.list);
	}

	drag(e){
		let cursorImg = document.body.lastChild;
		cursorImg.style.left = e.pageX - this.deltaX + 'px';
		cursorImg.style.top = e.pageY - this.deltaY + 'px';
	}

	dragEnd(e) {
		let { removeCursorImg , dragEndTask, task, activeList} = this.props;
		dragEndTask(task.id, activeList.list);
		removeCursorImg();
		this.taskStart.classList.remove(CLASS__DRAGGING__ELEM);
		this.taskStartParent.classList.remove(CLASS__DRAGGING__DARK__BACK);
	}
	dropDownSubTask(e){
		let {dropDownSubtask, task, activeList} = this.props;
		dropDownSubtask(task.id, activeList.list);
	}
	removeTask(e) {
		let { deleteTask, task,  allLists } = this.props;
		deleteTask(task.id, allLists);
	}
	getTask(elem) {
		return elem.parentNode.parentNode;
	}
	dontDo() {
		console.log('еще не готово');
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
			task, 
			classNameCursorImg = '',
			activeList,
			activeDate
		} = this.props;
		let { 
			text,
			depth,
			lastTask,
			done = false,
			priority,
			list,
			dueDate,
			id,
			draggingOpacity,
			parent,
			hiddenSubtasks = [], 
			colorList
		} = task;
		let { hoverCheckbox } = this.state;
		
		//console.log('====RENDER TASK====');
		//console.log(this.props);
		
		return (
			<div className={`task__wrapper ${classNameCursorImg} ${draggingOpacity}`}>
				{depth &&
					depth.map( (item, i) => {
						if (i === depth.length - 1) {
							item = lastTask
									? 'lineHalfUpHalfRight' 
									: 'lineFullVerticalHalfRight';
						}
						return (
							<TaskDepth
								key={i} 
								className={item}
								onDragEnter={this.dragEnterLeft}
							/>
						);
					}) 	
				}
				<div className='task__darkback'>	
						<div className='task__body'>
							<ColorList
								title0='Цвет листа'
								color={colorList}
							/>	
							<div className='task__body--dragAndDropdown'>
								<TaskDrag 
									className='task__body--drag'
									dragStart={this.dragStart}
									dragEnd={this.dragEnd}
									drag={this.drag}
									dragEnter={this.dragEnter}
								/>
								<DropDownSubtask
									className={`task__body--dropdownSubtask ${parent || hiddenSubtasks.length ? SHOW__TOGGLE : ''}`}
									onclick={this.dropDownSubTask}
								/>
							</div>
							<Checkbox
								className='task__body--checkbox'
								onclick={() => this.onClickCheckbox(task)}
								hover={hoverCheckbox}
								checked={done}
								onDragEnter={this.dragEnterRight}
								onMouseEnter={this.hoverOnCheckbox} 
	           					onMouseLeave={this.hoverOffCheckbox}
							/>
							<TaskText
								dragEnter={this.dragEnterRight}
								text={text}
							/>
							<Button
								className={`task__body--priority ${priority.color}`}
								onclick={this.dontDo}
								children={priority.child}
								title='Установить приоритет'
							/>
							<div className='task__body--calendarAndList'>
								<Button
									className='task__body--list'
									onclick={this.dontDo}
									children={
										<Tag
											classNameIcon="fa fa-list-alt"
											children={list}
											className='task__body--list--tag'
										/>
									}
									title='Установить список'
								/>
								<Button
									className='task__body--calendar'
									onclick={this.dontDo}
									children={
										<Tag
											classNameIcon="fa fa-calendar"
											children={dueDate}
											className='task__body--calendar--tag'
										/>
									}
									title='Установить дату'
								/>	
							</div>
							
							<Button 
								className='task__body--more'
								onclick={this.dontDo}
								classNameIcon="fa fa-ellipsis-v"
								title='Больше настроек'
							/>
							<Button 
								className='task__body--delete'
								onclick={this.removeTask}
								classNameIcon="fa fa-times"
								title='Удалить задачу'
							/>
						</div>
				</div>	
			</div>
		);
	}
}

const mapStateToProps = state => ({
	lists: state.lists
})

const mapDispatchToProps = dispatch => ({
	doneTask: task => {
		dispatch(doneTask(task))
	},
	dragEnterTask:(idEnterTask, idStartTask, activeList ) => {
		dispatch(dragEnterTask(idEnterTask, idStartTask, activeList ))
	},
	dragEnterTaskRight:(indexStart, activeList) => {
		dispatch(dragEnterTaskRight(indexStart, activeList))
	},
	dragEnterTaskLeft: (idStartTask, activeList) => {
		dispatch(dragEnterTaskLeft(idStartTask, activeList))
	},
	dragStartTask:( id, activeList, lists) => {
		dispatch(dragStartTask(id, activeList, lists))
	},
	dragEndTask: ( id, activeList) => {
		dispatch(dragEndTask( id, activeList))
	},
	deleteTask: (id, allLists) => {
		dispatch(deleteTask(id, allLists))
	},
	dropDownSubtask: (id, activeList) => {
		dispatch(dropDownSubtask(id, activeList))
	},
	findTaskByDate: date => {
		dispatch(findTaskByDate(date))
	}
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Task);