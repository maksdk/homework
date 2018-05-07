import React, { Component } from 'react';
import Task from './Task.js';

export default class List extends Component {
	constructor(props) {
      super(props);
      this.list = React.createRef();
      this.renderTask = this.renderTask.bind(this);
   }

   renderTask() {
   	let { allTasks, ...handlers } = this.props;
      return (
   		allTasks.map((task, i) => {
   			return (
   				<Task 
   					key={task.exactCreationTime}
                  index={i}
   					task={task}
   					{...handlers}
   				/>
   			);
   		})
   	);
   }

   render(){
   	return(
   		<div 
   			className='listTasks'
   			children={this.renderTask()}
   			ref={list => this.list = list}
   		/>
   	);
   }
}