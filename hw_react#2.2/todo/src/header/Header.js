import React, {Component} from 'react';
import './_header.css';

import Logo from './Logo.js';
import Search from './Search.js';
import QuickAdd from './QuickAdd.js';

class Header extends Component {
	render() {
		return (
			<header className="todo__header">
				<Logo/>
				<Search/>
				<QuickAdd/>
			</header>
		);
	}
}


export default Header;