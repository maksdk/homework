import React, {Component} from 'react';

import NamesLists from '../../NamesLists.js';
import Field from '../../Field.js';
import ColorPicker from '../../ColorPicker.js';
import Button from '../../Button.js';
import {ERROR__SAME__TITLE__LIST} from '../../constants/index.js';
import './styles/project.css';

export default class Lists extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			visibleColorPicker: null,
			visibleButtonAdd: null,
			selectedColor: null,
			error:null
		}
		this.onFocusField = this.onFocusField.bind(this);
		this.selectColor = this.selectColor.bind(this);
		this.onClickaddList = this.onClickaddList.bind(this);	
	}
	onFocusField(e) {
		this.setState({
			visibleColorPicker: true,
			visibleButtonAdd: true,
			error:null
		})
	}
	selectColor(color) {	
		this.setState({
			selectedColor: color,
			visibleColorPicker: null
		})
		this.inputText.textInput.style.color = color;
	}
	onClickaddList(input){
		let { allLists, addList } = this.props;
		let { selectedColor } = this.state;
		let newList =  input.textInput.value;

		let sameTitle = allLists.find(({list}) => list === newList);
		if (sameTitle) {
			this.setState({
				error: ERROR__SAME__TITLE__LIST,
			})
		} else {
			addList({
				list: newList,
				color: selectedColor
			});
		}
		input.textInput.style.color = '#444445e6';
		input.textInput.value = '';
		this.setState({
			visibleButtonAdd: null,
			selectedColor: null,
			visibleColorPicker: null
		})	
	}
	render() {
		//console.log('==RENDER==');
		let { visibleColorPicker, visibleButtonAdd, error} = this.state;
		let { allLists, selectList, activeList } = this.props;
		//console.log(allLists);
		return (
			<div className='leftside__project'>
				<div className='lists__header'>
					<span 
						className='lists__header--title'
						children="Списки задач:"
					/>
				</div>
				<NamesLists 
					className='leftside'
					onclick={selectList}
					allLists={allLists}
					activeList={activeList}
					
				/>
				<div className='lists__addList'>
					<Field
						ref={ input => this.inputText = input}
						error={error}
						className='lists'
						placeholder=" Добавить список..."
						title='Добавить список'
						onfocus = {this.onFocusField}
					/>
					{visibleButtonAdd &&
						<Button
							classNameIcon="fa fa-plus"
							className='lists__btnAddList'
							onclick={() => this.onClickaddList(this.inputText)}
						/>
					}
					{visibleColorPicker && 
						<ColorPicker
							className='lists__addList--colorPicker'
							title='списка'
							onclick={this.selectColor}
						/>
					}
				</div>
				
			</div>
		);
	}
}

