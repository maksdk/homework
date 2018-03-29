import React, {Component} from 'react';

class ListTasks extends Component {
	render() {
		let {task} = this.props;
		return (
			<ul>Входящие
				{task.map(({id, value}) => {
					return <li key={id}>{value}</li>;
				})}
			</ul>
		);
	}
}

export default ListTasks;

