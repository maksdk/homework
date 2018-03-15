import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import options from './options.js';

const Box = ({handler, data}) => {
	let {question, answer} = data;
	return (
		<div className="box">
	    	<a 
	    		className="box__question"
	    		onClick={handler}
	    	>
	    		{question}
	    	</a>
	    	<p className="box__answer">
	    		{answer}
	    	</p>
	   </div>
	);
};

class Accordion extends Component {
	state = {
		checked: false
	}
	clickQuestion = (e) => {
		if (e.target.classList.contains('active')) {
			document.querySelector('.open').classList.remove('open');
			e.target.classList.remove('active');
			this.setState({
				checked: false
			})
			return;
		} else if (this.state.checked) {
			document.querySelector('.open').classList.remove('open');
			document.querySelector('.active').classList.remove('active');
		}
		e.target.classList.add('active');
		e.target.nextElementSibling.classList.add('open');
		this.setState({
			checked: true
		})
	}
	render() {
		let {props} = this.props,
			handler = this.clickQuestion;
		return (
			<div className="container">
				{props.map( (data, i) => 
					<Box key={i} handler={handler} data={data}/>)
				}
			</div>
		);
  	}
}

ReactDOM.render(
	<Accordion props = {options}/>,
	document.getElementById("root")
);
