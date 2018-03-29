import React, {Component} from 'react';

class AddTaskBtn extends Component {
	render(){
		return(
			<button 
				className="content__btnAddTask"
				children="Добавить задачу"
				onClick={(e) => {
					this.inputData.parentNode.children[0].classList.toggle('hide');
				}}
				ref={(button) => {this.inputData = button}}
				
			/>
		);
	}
}

export default AddTaskBtn;