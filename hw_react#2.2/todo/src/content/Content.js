import React, {Component} from 'react';
import './css/Content.css';

import Menu from './Menu.js';
import Main from './Main.js';

class Content extends Component {
	render() {
		return (
			<div className="todo__content">
				<Menu/>
				<Main/>
			</div>
		);
	}
}

export default Content;
