import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { findIndex } from 'lodash';

import Task from './Task.js';
import CursorImg from './CursorImg.js';
import AddTask from './AddTask.js';


class MainContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cursorImg: null
		}
		
		this.dragStart = this.dragStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.drag = this.drag.bind(this);
		this.dragEnterTask = this.dragEnterTask.bind(this);
		this.shiftSubtaskRigth = this.shiftSubtaskRigth.bind(this);
		this.shiftSubtaskLeft =  this.shiftSubtaskLeft.bind(this);
		this.findIndexChild =  this.findIndexChild.bind(this);
	}
	
	dragStart(e){
		let elementStart = e.target.parentNode;
		let indexStart = this.findIndexChild(e.target); 
		
		let	dragStartCoords = this.getCoords(elementStart);
		this.deltaX = e.pageX - dragStartCoords.left;
	    this.deltaY = e.pageY - dragStartCoords.top;
	   
	   	let { task, startDragTask }	= this.props;
	   	
	   	startDragTask(
	   		indexStart
	   	);

	   	this.setState({
	   		cursorImg: {
				content: task[indexStart].content,
				width: elementStart.offsetWidth,
				height: elementStart.offsetHeight
			}
		})
	}

	dragEnterTask(e) {
		let { task } = this.props;
		let indexStart = findIndex(task, {hide: true});
		let indexEnter =  this.findIndexChild(e.target);
		

		//console.log(indexStart === indexEnter);
		if (indexStart === indexEnter) return;
		console.log("dragEnterTask");
		this.props.shiftTask(
			indexStart, 
			indexEnter
		);
	}

	shiftSubtaskRigth(e) {
		let { task } = this.props;
		let indexStart = findIndex(task, {hide: true});
		let indexEnter = this.findIndexChild(e.target);

		if (indexStart !== indexEnter) return;
		if (!indexStart) return;

		let prevDepth = task[indexStart - 1].depth,
			thisDepth = task[indexStart].depth;
		if (prevDepth.length - thisDepth.length < 0) return;
		
		this.props.shiftSubtaskRigth(
			indexStart
		); 
	}

	shiftSubtaskLeft(e) {
		let { task } = this.props;
		let indexStart = findIndex(task, {hide: true});

		let listChildren = [...this.list.children];
		let indexEnter = findIndex(listChildren, e.target.parentNode);

		if (indexStart !== indexEnter) return;
		console.log("shiftSubtaskLeft");
		this.props.shiftSubtaskLeft(
			indexStart
		);
	}
	drag(e) {
		let cursorImg = this.container.lastChild;
		cursorImg.style.left = e.pageX - this.deltaX + 'px';
		cursorImg.style.top = e.pageY - this.deltaY + 'px';
	}

	dragEnd(e) {
		let { task } = this.props;
		let indexDragElem = findIndex(task, {hide: true});
		
		this.props.endDragTask(
			indexDragElem
		);

		this.setState({
			cursorImg: null
		});

	}

	findIndexChild(elem) {
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

	findAmountChildren(index) {
		let { task } = this.props,
			depthTask = task[index].depth.length,
			amountChildren = 0;
			
		for (let i = index + 1; i < task.length; i++) {
			let dapthSubtask = task[i].depth.length;
			if (depthTask >= dapthSubtask) break;
			amountChildren = i - index;
		}
		return amountChildren ;
	}
	
	render() {
		console.log("===== RENDER =====");
		console.log(this.props);
		
		let { addTask, deleteTask, task} = this.props;
		let { cursorImg } = this.state;
		
		return (
			<div 
				className='mainContent'
				ref={ main => {
					main ? this.container = main.parentNode
						 :  this.container = main;
				}}
			>
				<div 
					className='list'
					ref={(list) => this.list = list}
				>
					{
						task.map( ({content, depth, opacity, parent, lastTask, hide}, i) => {
							
							return (
							<Task 
								key={i} 
								classHide={hide ? "hide" : ""}
								content={content}
								index={i}
								lastTask={lastTask}
								depth={depth}
								opacity={opacity}
								parent={parent}
								shiftSubtaskLeft={this.shiftSubtaskLeft}
								deleteTask={() => deleteTask(i)}
								dragStart={this.dragStart}
								dragEnd={this.dragEnd}
								drag={this.drag}
								dragEnterTask={this.dragEnterTask}
								shiftSubtaskRigth={this.shiftSubtaskRigth}
							/>
						)})
					}
					<AddTask  addTask={addTask}/>
				</div>
				
				{
					cursorImg && 
						ReactDOM.createPortal(
							<CursorImg 
									task={cursorImg.content}
									className='cursorImg'
									style={{
										width: cursorImg.width,
										height: cursorImg.height
									}}	
								/>,
							document.getElementById('todolist')
							
						)
				}
			</div>	
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
				children: 0
			}
		})
	},
	deleteTask: index => {
		dispatch({
			type: 'DELETE__TASK',
			payload: index
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
	endDragTask: index => {
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
	shiftSubtaskRigth: index => {
		dispatch({
			type: 'SHIFT__SUBTASK__RIGHT',
			payload: {
				index
			}
		})
	},
	shiftSubtaskLeft: index => {
		dispatch({
			type: 'SHIFT__SUBTASK__LEFT',
			payload: {
				index
				
			}
		})
	}

});
export default connect(
	mapStateToProps,
	mapDispatchToProps	
)(MainContent);