import React, {Component} from 'react';

import './Todo.css';
import Header from './header/Header.js';
import Content from './content/Content.js';

class Todo extends Component {
	render() {
		return (
			<div className="todo">
				<Header/>
				<Content/>
			</div>
		);
	}
}

export default Todo;
