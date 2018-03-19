import React, {Component} from 'react';

import './_content.css';
import AddData from './AddData.js'

class Main extends Component {
	render() {
		return (
			<div className="todo__content__main">
				<AddData
					className="main"
					children="задачу"
				/>
			</div>
		);
	}
}

export default Main;