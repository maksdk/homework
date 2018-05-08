import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Calendar from '../Calendar/Calendar.js';
import NamesLists from '../../components/NamesLists.js';
import Button from '../../components/Button.js';
import Field from '../../components/Field.js';
import Priority from '../../components/Priority.js';
import Tag from '../../components/Tag.js';

import { addTask, saveDueDate } from '../../actions/actions.js';
import { 
	ALL__TASKS, 
	INBOX__TASKS,
	ERROR__EMPTY__FIELD
} from '../../constants/index.js';
import './_addtask.css';

class AddTask extends Component{
	constructor(props){
		super(props);
		this.state = {
			month:moment(),
			openBlock: null,
			selectedDate: undefined,
			selectedList: undefined,
			selectedPriority: undefined,
			error: null
		}

		this.textInput = React.createRef();
		this.openBlock = this.openBlock.bind(this);
		this.selectDueDate = this.selectDueDate.bind(this);
		this.selectList = this.selectList.bind(this);
		this.selectPriority = this.selectPriority.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
		this.saveTask = this.saveTask.bind(this);
		this.onFocusInput = this.onFocusInput.bind(this);
	}
	onFocusInput() {
		this.setState({
			openBlock: null,
			error: null
		})
	}
	openBlock(block) {
		this.setState({
			openBlock: block,
			error: null
		})
	}
	selectPriority(color, childrenPriority) {
		this.childrenPriority = childrenPriority;
		this.setState({
			openBlock: null,
			selectedPriority: {
				color: color,
				child: childrenPriority	
			}
		})
	}
	selectDueDate(date) {
		this.setState({
			openBlock: null,
			selectedDate: date
		})
	}
	selectList(list, color) {
		this.setState({
			openBlock: null,
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
		if (!this.textInput.textInput.value == true) {
			this.setState({
				error: ERROR__EMPTY__FIELD
			});
			return;
		}
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
			openBlock: null,
			error: null
		})
		
		if (list === ALL__TASKS) {
			list = INBOX__TASKS;
		}
		
		let colorList = 
			selectedList 
			? selectedList.color 
			: activeList.color;
		console.log(list);
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
		let { 
			month, 
			selectedDate, 
			selectedPriority, 
			selectedList,
			openBlock,
			error
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
					error={error}
					onfocus={this.onFocusInput}
				/>
				<div className='addTask--icons'>
					<Button
						className={`addTask--selectDate ${openBlock === 'openCalendar'? 'colorOpenIcons' : ''}`}
						classNameIcon="fa fa-calendar"
						title='Установить дату'
						onclick={() => this.openBlock('openCalendar')}
					/>
					<Button
						className={`addTask--selectPriority ${openBlock === "openPriority" ? 'colorOpenIcons' : ''}`}
						children='!!!'
						title='Установить приоритет'
						onclick={() => this.openBlock('openPriority')}
					/>
					<Button
						className={`addTask--selectList ${openBlock === "openList" ? 'colorOpenIcons' : ''}`}
						classNameIcon="fa fa-list-alt"
						title='Добавить в список'
						onclick={() => this.openBlock('openList')}
					/>
					<Button
						className='addTask--saveTask'
						classNameIcon="fa fa-plus"
						title='Сохранить задачу'
						onclick={this.saveTask}
					/>
					{openBlock === 'openCalendar' && 
					<Calendar 
						className='addTask--dropdownCalendar'
						selectDay={this.selectDueDate}
						month={month}
					/>}
					{openBlock === "openPriority" && 
						<Priority
							className='addTask--dropdownPriority'
							onclick={this.selectPriority}
					/>}
					{openBlock === "openList" && 
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