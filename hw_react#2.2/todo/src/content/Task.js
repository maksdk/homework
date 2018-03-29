import React, {Component} from 'react';

import ChangeTask from './ChangeTask.js';

class Task extends Component {
	render(){
		console.log("Task props");
		console.log(this.props);
		let {data} = this.props;
		return(
			<div className="content__tasks">
				<h3>Входящие</h3>
				<div>
					{data.addTask.map(({id, value}) => {
						return (
							<div key={id}>
								<ChangeTask/>
								<div>
									<span>0</span>
									<span>{value}</span>
									<button>Редакт</button>
									<button>Удалить</button>
								</div>
								
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Task;