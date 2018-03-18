import React, {Component} from 'react';
import './css/Menu.css';

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
			</div>
		);
	}
}

export default Menu;