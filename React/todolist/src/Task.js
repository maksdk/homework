import React, { Component } from 'react';

import Button from './Button.js';
import Drag from './Drag.js';
import TaskContent from './TaskContent.js';
import HideSubtask from './HideSubtask.js';

export default class Task extends Component {
	render() {
		let heightBackTask = this.task && this.task.offsetHeight;
		let {
				deleteTask, 
				content, 
				classHide,
				depth,
				dragStart, 
				dragEnd, 
				drag, 
				shiftSubtaskRigth, 
				dragEnterTask,
				shiftSubtaskLeft,
				opacity,
				parent,
				index,
				lastTask
			} = this.props;
			
		return (
			<div className="wrapperTask">
				{ 
					depth && depth.map((item, i) => {
						// console.log("==============");
						// console.log(depth.length);
						// console.log(i === depth.length - 1);
						// console.log(item);
						if (i === depth.length - 1) {
							item = lastTask ? 'lineHalfUpHalfRight' : 'lineFullVerticalHalfRight';
							//console.log("TASK DEPTH", i);
						}
						return (
							<span 
								key={i} 
								className={`linePureBox ${item}`}
								onDragEnter={shiftSubtaskLeft}
							></span>
						);
					})
				}
				
				{// <HideSubtask 
												// 	index={index}
												// 	parent={parent}
												// 	lastTask={lastTask}
												// />
											}
				
			
				<div
					className={`backTask ${ opacity ? 'opacity' : ''}`}
					ref={(div) => this.backTask = div}
					style={{height: heightBackTask}}		
				>	

					<div 
						className={`task ${classHide}`}
						ref={(div) => this.task = div}
					>	
						<Drag 
							className='listTasks__task--drag'
							dragStart={dragStart}
							dragEnd={dragEnd}
							drag={drag}
							dragEnter={dragEnterTask}
						/>
						<TaskContent 
							className='listTasks__task--text'
							dragEnter={shiftSubtaskRigth}
							content={content}
						/>
						
						<Button 
							className='listTasks__task--delete'
							children='x'
							onclick={() => deleteTask()}
						/>
						<Button 
							className='listTasks__task--menu'
							children='...'
						/>
					</div>
					{	
						// subtask && subtask.map(({content, subtask}, i) => {

						// 	return (
						// 		<div 
						// 			className="subtask"
						// 			key={i}
						// 		>
						// 			<Task 
						// 				key={i} 
						// 				classHide={classHide}
						// 				content={content}
						// 				//subtask={subtask}
						// 				deleteTask={() => deleteTask(i)}
						// 				dragStart={this.dragStart}
						// 				dragEnd={this.dragEnd}
						// 				drag={this.drag}
						// 				dragEnterTask={this.dragEnterTask}
						// 				shiftSubtaskRigth={this.shiftSubtaskRigth}
						// 			/>
						// 		</div>
						// 	);
						// })
						
					}
						
				</div>	
			</div>
		);
	}
}