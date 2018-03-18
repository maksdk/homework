import React, {Component} from 'react';

import './css/Main.css';

class AddTask extends Component {
	state = {

	}
	add = (e) =>{
		console.log(this);
		return (
			<div>
				<input type="text"/>
				<button>Добавить</button>
				<button>Отмена</button>
			</div>
		);
	}
	render() {
		return (
			<button 
				className="addTask"
				onClick={this.add}
			>
				Добавить задачу
			</button>
		);
	}
}

export default AddTask;