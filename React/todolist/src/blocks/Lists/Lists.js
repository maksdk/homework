import React, {Component} from 'react';

import NamesLists from '../../components/NamesLists.js';
import Field from '../../components/Field.js';
import ColorPicker from '../../components/ColorPicker.js';
import Button from '../../components/Button.js';

import {
	ERROR__SAME__TITLE__LIST,
	ERROR__EMPTY__FIELD
} from '../../constants/index.js';
import './_lists.css';

export default class Lists extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			visibleColorPicker: null,
			visibleButtonAdd: null,
			selectedColor: null,
			error: null
		}
		this.textInput = React.createRef();
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
		this.textInput.textInput.style.color = color;
	}
	onClickaddList(){
		
		if (!this.textInput.textInput.value) {
			this.setState({
				error: ERROR__EMPTY__FIELD,
				visibleColorPicker: null
			});
			
			return;
		}
		let { allLists, addList } = this.props;
		let { selectedColor } = this.state;
		let newList =  this.textInput.textInput.value;

		let sameTitle = allLists.find(({list}) => list === newList);
		if (sameTitle) {
			this.setState({
				error: ERROR__SAME__TITLE__LIST
			})
		} else {
			addList({
				list: newList,
				color: selectedColor
			});
		}
		this.textInput.textInput.style.color = '#444445e6';
		this.textInput.textInput.value = '';
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
						ref={ input => this.textInput = input}
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
							onclick={() => this.onClickaddList()}
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

