import React, {Component} from 'react';
import { connect } from 'react-redux';
import './style.css';

class List extends Component {
	constructor(props){
		super(props);
	}
	render(){
		console.log(this.props);
		let {somethingAdd} = this.props;
		return(
			<div 
				className='listTasks'
				onClick={() => somethingAdd("my name")}
			>List</div>
		);
	}
}

const mapStateToProps = state => ({
	allLists: state.task
});
const mapDispatchToProps = dispatch =>({
	somethingAdd: name => {
		dispatch({
			type:'ADD__TASK',
			payload: name
		})
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
