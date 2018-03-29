import React, {Component} from 'react';

//import './_content.css';
//import AddData from './AddData.js';

class LeftMenu extends Component {
	render() {
		return (
			<div className="content__leftMenu">
				Menu
				<ul className="leftMenu__period">
					<li>Входящие</li>
				</ul>
				<div>
					Проекты
				</div>
				
			</div>
		);
	}
}

export default LeftMenu;