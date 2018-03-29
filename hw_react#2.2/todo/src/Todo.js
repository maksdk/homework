import React, {Component} from 'react';

import './styles/Todo.css';
import Header from './header/Header.js';
import Content from './content/Content.js';
import LeftMenu from './leftmenu/LeftMenu.js';

class Todo extends Component {
	render() {
		return (
			<div className="todo">
				<Header/>
				<div className="content">
					<LeftMenu/>
					<Content/>
				</div>
			</div>
		);
	}
}

export default Todo;
