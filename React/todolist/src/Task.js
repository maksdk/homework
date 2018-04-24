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
				lastTask,
				hideOpenSubtask,
				hiddenChildren
			} = this.props;
		return (
			<div className="wrapperTask">
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
								onDragEnter={shiftSubtaskLeft}
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