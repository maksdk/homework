import React, {Component} from 'react';

import './_content.css';

import Btn from '../common/Btn.js';
import Editor from './Editor.js';


class AddData extends Component {
	state={}
	add = (e) =>{
		let editor = this.parent.children[0];
		editor.classList.toggle("hide");
	}
	render() {
		let {className, children} = this.props;
 		return (
			<div 
				className={`${className}__addData `}
				ref={(div) => { this.parent = div; }}
			>
				<Editor
					className={className}
					children={children}
				/>
				<Btn 
					className="main__addData--btn"
					handler={this.add}
					children={`Добавить ${children}`}
				/>
			</div>
		);
	}
}

export default AddData;