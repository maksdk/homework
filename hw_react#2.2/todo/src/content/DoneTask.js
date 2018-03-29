import React, {Component} from 'react';

class DoneTask extends Component {
	render() {
		let {task} = this.props;
		return (
			<div className="content__done">
				<h3>Выполнено</h3>
			</div>
		);
	}
}

export default DoneTask;