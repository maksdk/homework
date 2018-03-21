import React, {Component} from 'react';

class ListTasks extends Component {
	render() {
		let {data} = this.props
		return (
			<ul>Входящие
				{data.map(({id,value}) => {
					return (
						<li key={id}>{value}
							<span>X</span>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default ListTasks;