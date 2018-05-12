import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	find as _find, 
	findIndex as _findIndex 
} from 'lodash';

import TaskDrag from './TaskDrag.js';
import TaskDepth from './TaskDepth.js';
import TaskText from './TaskText.js';
import ColorList from './ColorList.js';
import DropDownSubtask from './DropDownSubtask.js';

import Button from '../../components/Button.js';
import Checkbox from '../../components/Checkbox.js';
import Tag from '../../components/Tag.js';

import { 
	CLASS__DRAGGING__ELEM, 
	CLASS__DRAGGING__DARK__BACK ,
	SHOW__TOGGLE,
	ALL__TASKS
} from '../../constants/index.js';

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
} from '../../actions/actions.js';

import './_task.css';

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
      this.setDataTask = this.setDataTask.bind(this); 

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

   onClickCheckbox (index) {
	   	let { doneTask, task } = this.props;
	   	doneTask(task, index);
    }

    dragStart(e){
		let { renderCursorImg, task, dragStartTask, activeList, lists} = this.props;
		let { priority, list, dueDate, text, id, colorList } = task;
		
		let cursorImg = {
			priority: priority,
			list: list,
			dueDate: dueDate,
			text: text,
			id: id,
			colorList: colorList
		}
		dragStartTask( id, activeList.list, lists);
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
		
		if (activeList.list === ALL__TASKS) return;
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
	dropDownSubTask(index){
		let {dropDownSubtask, task} = this.props;
		dropDownSubtask(task, index);
	}
	removeTask(index) {
		let { deleteTask, task } = this.props;
		deleteTask(index, task);
	}
	getTask(elem) {
		return elem.parentNode.parentNode;
	}
	setDataTask(block) {
		console.log(block);
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
			activeDate,
			index
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
		return (
			<div className='viewtasks'>
				<div className='listTasks__header'>
					<span
						className='listTasks__titleList'
						children={`#${titleList}`}
						style={{
							color: colorTitleList
						}}
					/>
				</div>
				<AddTask
					activeList={activeList}
					activeDate={activeDate}
					allLists={allLists}
				/>
				{currentList && 
					currentList.map( (task, index) => (
						<Task
							index={index}
							draggingTask={draggingTask}
							key={task.id}
							task={task}
							allLists={allLists}
							activeList={activeList}
							activeDate={activeDate}
							renderCursorImg={this.renderCursorImg}
							removeCursorImg={this.removeCursorImg}
						/>
					))
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	lists: state.lists
})

const mapDispatchToProps = dispatch => ({
	doneTask: (task, index) => {
		dispatch(doneTask(task, index))
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
	deleteTask: (index, task) => {
		dispatch(deleteTask(index, task))
	},
	dropDownSubtask: (task, index) => {
		dispatch(dropDownSubtask(task, index))
	},
	findTaskByDate: date => {
		dispatch(findTaskByDate(date))
	}
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Task);