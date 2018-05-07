import React, { Component } from 'react';

import Button from '../Button.js';
import Drag from './DragTask.js';
import TaskContent from './TaskContent.js';
import DoneTask from './DoneTask.js';

import './styles/task.css';

export default class Task extends Component {
	constructor(props) {
      super(props);
      this.list = React.createRef();
    } 
	render() {
		let heightBackTask = this.task && this.task.offsetHeight;
		let {
				deleteTask,
				drag, 
				dragEnd, 
				dragEnter,
				dragStart, 
				//classHide,
				dragTaskLeft,
				dragTaskRigth,
				hideOpenSubtask,
				onClickDoneTask, 
				index,
				task
			} = this.props;
			let { depth, lastTask, parent, hiddenChildren, opacity, doneTask, content, hide } = task;
		return (
			<div 
				className="wrapperTask"
				ref={(list) => this.list = list}
			>
				{	depth && depth.map((item, i) => {
						if (i === depth.length - 1) {
							item = lastTask ? 'lineHalfUpHalfRight' : 'lineFullVerticalHalfRight';
						}
						if (i === 0) {
							item = 'firstPureBox';
						}
						return (
							<span 
								key={i} 
								className={`linePureBox ${item}`}
								onDragEnter={dragTaskLeft}
							>
								{
									parent &&  (i === depth.length - 1)  &&
									<Button
										className={
											`listTasks__toggle 
											${
												hiddenChildren 
												? 'listTasks__toggle--plus' 
												: 'listTasks__toggle--minus'
											}`
										}
										onclick={hideOpenSubtask}
										index={index}
									/>
									//expand
									//collapse
								}
							</span>
						);
					})
				}
				 
				<div
					className={`backTask ${ opacity ? 'opacity' : ''}`}
					//ref={(div) => this.backTask = div}
					style={{height: heightBackTask}}		
				>	
					<div 
						className={`task ${hide ? 'hide' : ''}`}
						//ref={(div) => this.task = div}
					>	
						<Drag 
							className='listTasks__task--drag'
							dragStart={dragStart}
							dragEnd={dragEnd}
							drag={drag}
							dragEnter={dragEnter}
						/>
						<DoneTask
							doneTask={doneTask}
							index={index}
							onClickDoneTask={onClickDoneTask}
						/>
						<TaskContent 
							doneTask={doneTask}
							dragEnter={dragTaskRigth}
							content={content}
						/>
						<Button 
							className='listTasks__task--delete'
							children='x'
							onclick={deleteTask}
							index={index}
						/>
						<Button 
							className='listTasks__task--menu'
							children='...'
						/>
					</div>
				</div>	
			</div>
		);
	}
}