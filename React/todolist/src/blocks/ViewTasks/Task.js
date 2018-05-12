import React from 'react';

import TaskDrag from './TaskDrag.js';
import TaskDepth from './TaskDepth.js';
import TaskText from './TaskText.js';
import ColorList from './ColorList.js';
import DropDownSubtask from './DropDownSubtask.js';

import Button from '../../components/Button.js';
import Checkbox from '../../components/Checkbox.js';
import Tag from '../../components/Tag.js';

export default ({}) => (
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
							onclick={() => this.dropDownSubTask(index)}
						/>
					</div>
					<Checkbox
						className='task__body--checkbox'
						onclick={() => this.onClickCheckbox(index)}
						hover={hoverCheckbox}
						checked={done}
						onDragEnter={this.dragEnterRight}
						onMouseEnter={this.hoverOnCheckbox} 
       					onMouseLeave={this.hoverOffCheckbox}
					/>
					<TaskText
						className={done ? 'doneTaskText' : ''}
						dragEnter={this.dragEnterRight}
						text={text}
					/>
					<Button
						className={`task__body--priority ${priority.color}`}
						onclick={() => this.setDataTask('priority')}
						children={priority.child}
						title='Установить приоритет'
					/>
					<div className='task__body--calendarAndList'>
						<Button
							className='task__body--list'
							onclick={() => this.setDataTask('list')}
							children={
								<Tag
									classNameIcon="fa fa-list-alt"
									children={list}
									className='task__body--list--tag'
									style={{
										color: colorList
									}}
								/>
							}
							title='Установить список'
						/>
						<Button
							className='task__body--calendar'
							onclick={() => this.setDataTask('calendar')}
							children={
								<Tag
									classNameIcon="fa fa-calendar"
									children={done ? 'Сделано' : dueDate}
									className='task__body--calendar--tag'
								/>
							}
							title='Установить дату'
						/>	
					</div>
					
					<Button 
						className='task__body--more'
						onclick={() => this.setDataTask('additional settings')}
						classNameIcon="fa fa-ellipsis-v"
						title='Больше настроек'
					/>
					<Button 
						className='task__body--delete'
						onclick={() => this.removeTask(index)}
						classNameIcon="fa fa-times"
						title='Удалить задачу'
					/>
				</div>
		</div>	
	</div>
);
