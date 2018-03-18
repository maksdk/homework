import React, {Component} from 'react';

import './css/Main.css';
import AddTask from './AddTask.js'

class Main extends Component {
	render() {
		return (
			<div className="todo__content__main">
				<AddTask/>
			</div>
		);
	}
}

export default Main;