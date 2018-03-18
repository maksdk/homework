import React, {Component} from 'react';
import './css/Search.css';

class Search extends Component {
	render() {
		return (
			<input 
				type="search" 
				className="todo__header__search"/>
		);
	}
}


export default Search;