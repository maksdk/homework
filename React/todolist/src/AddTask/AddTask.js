import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Calendar from '../Calendar/Calendar.js';
import Button from '../Button.js';
import Tag from '../Tag.js';
import NamesLists from '../NamesLists.js';
import Field from '../Field.js';
import Priority from '../Priority.js';
import { addTask, saveDueDate } from '../actions/actions.js';
import { ALL__TASKS, INBOX__TASKS} from '../constants/index.js';
import './_styles.css';

class AddTask extends Component{
	constructor(props){
		super(props);
		this.state = {
			month:moment(),
			downShift: null,
			selectedDate: undefined,
			selectedList: undefined,
			selectedPriority: undefined
		}

		this.textInput = React.createRef();
		this.downShift = this.downShift.bind(this);
		this.selectDueDate = this.selectDueDate.bind(this);
		this.selectList = this.selectList.bind(this);
		this.selectPriority = this.selectPriority.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
		this.saveTask = this.saveTask.bind(this);
	}

	downShift(openBlock) {
		this.setState({
			downShift: openBlock
		})
	}
	selectPriority(color, childrenPriority) {
		this.childrenPriority = childrenPriority;
		this.setState({
			downShift: null,
			selectedPriority: {
				color: color,
				child: childrenPriority	
			}
		})
	}
	selectDueDate(date) {
		this.setState({
			downShift: null,
			selectedDate: date
		})
	}
	selectList(list, color) {
		this.setState({
			downShift: null,
			selectedList: {
				list: list,
				color: color
			}
		})
	}
	deleteTag(tag) {
		this.setState({
			[tag]: null
		})
	}
	saveTask(){
		let { addTask, activeList, activeDate, saveDueDate } = this.props;
		let { selectedDate, selectedPriority, selectedList } = this.state;
		
		let dueDate = selectedDate ? selectedDate : activeDate;
		let list = selectedList ? selectedList.list : activeList.list;
		let text = this.textInput.textInput.value;

		this.textInput.textInput.value = '';
		this.textInput.textInput.focus();

		this.setState({
			selectedDate: undefined,
			selectedList: undefined,
			selectedPriority: undefined,
			downShift: null
		})
		
		if (list === ALL__TASKS) {
			list = INBOX__TASKS;
		}
		
		
		let colorList = selectedList ? selectedList.color : activeList.color;
		
		addTask(
			text,
			dueDate,
			list,
			selectedPriority,
			colorList
		);
		if (!dueDate) return;
		saveDueDate(dueDate);
	}
	componentDidMount() {
		this.textInput.textInput.focus();
	}
	render(){
		let activeDate
		// console.log("====RENDER ADDTASK=====");
		// console.log(this.props);
		let { 
			month, 
			selectedDate, 
			selectedPriority, 
			selectedList,
			downShift 
		} = this.state;
		let { 
			allLists
		} = this.props;
		return(
			<div className='addTask'>
				<Field
					ref={input => this.textInput = input}
					className='addTask' 
					placeholder=" Добавить задачу..."
					name='addTask'
				/>
				<div className='addTask--icons'>
					<Button
						className={`addTask--selectDate ${downShift === 'openCalendar'? 'colorOpenIcons' : ''}`}
						classNameIcon="fa fa-calendar"
						title='Установить дату'
						onclick={() => this.downShift('openCalendar')}
					/>
					<Button
						className={`addTask--selectPriority ${downShift === "openPriority" ? 'colorOpenIcons' : ''}`}
						children='!!!'
						title='Установить приоритет'
						onclick={() => this.downShift('openPriority')}
					/>
					<Button
						className={`addTask--selectList ${downShift === "openList" ? 'colorOpenIcons' : ''}`}
						classNameIcon="fa fa-list-alt"
						title='Добавить в список'
						onclick={() => this.downShift('openList')}
					/>
					<Button
						className='addTask--saveTask'
						classNameIcon="fa fa-plus"
						title='Сохранить задачу'
						onclick={this.saveTask}
					/>
					{downShift === 'openCalendar' && 
					<Calendar 
						className='addTask--dropdownCalendar'
						selectDay={this.selectDueDate}
						month={month}
					/>}
					{downShift === "openPriority" && 
						<Priority
							className='addTask--dropdownPriority'
							onclick={this.selectPriority}
					/>}
					{downShift === "openList" && 
						<NamesLists
							className='addTask'
							onclick={this.selectList}
							allLists={allLists}
					/>}
				</div>
				{selectedDate && 
					<Tag
						classNameIcon="fa fa-times"
						className='addTask--tag' 
						children={selectedDate}
						onclick={() => this.deleteTag('selectedDate')}
				/>}
				{selectedPriority && 
					<Tag
						classNameIcon="fa fa-times"
						className='addTask--tag'
						styleChildren={{
							color: selectedPriority
						}}
						children={this.childrenPriority }
						onclick={() => this.deleteTag('selectedPriority')}
				/>}
				{selectedList && 
					<Tag
						classNameIcon="fa fa-times"
						className='addTask--tag' 
						children={selectedList.list}
						onclick={() => this.deleteTag('selectedList')}
				/>}
			</div>
		);
	}
} 

const mapStateToProps = state => ({
	lists: state.lists
});

const mapDispatchToProps = dispatch => ({
	addTask: (text, dueDate, list, priority, colorList) => {
	
		dispatch(addTask(text, dueDate, list, priority, colorList));
	},
	saveDueDate: dueDate => {
		dispatch(saveDueDate(dueDate))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddTask)