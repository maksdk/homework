import React, {Component} from 'react';

import './_content.css';
import AddData from './AddData.js';

class Menu extends Component {
	render() {
		return (
			<div className="todo__content__menu">
				Menu
				<ul className="menu__period">
					<li>Входящие</li>
					<li>Сегодня</li>
					<li>Следующие 7 дней</li>
				</ul>
				<div>
					Проекты
				</div>
				<AddData
					className="menu"	
					children="проект"			
				/>
			</div>
		);
	}
}

export default Menu;