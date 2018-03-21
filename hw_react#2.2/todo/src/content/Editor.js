import React, {Component} from 'react';

import Field from '../common/Field.js';
import Btn from '../common/Btn.js';

class Editor extends Component {
	state = {}
	save = () => {
		console.log(this);
	}
	cancel = () => {
		this.parent.classList.toggle("hide");
	}
	render() {
		let {className, children} = this.props;
		return (
			<div 
				className={`${className}__addData__editor hide`}
				ref={(div) => { this.parent = div; }}
			>
				<Field 
					className={`${className}__addData__editor--input`}
					type="text"
				/>
				<Btn
					className={`${className}__addData__editor--save`}
					children={`Сохранить ${children}`}
					handler={this.save}
				/>
				<Btn
					className={`${className}__addData__editor--cancel`}
					children="Отмена"
					handler={this.cancel}
				/>
			</div>
		);
	}
}

export default Editor;

				