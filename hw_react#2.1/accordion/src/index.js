import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import options from './options.js';

const Box = ({handler, data}) => {
	let {question, answer} = data;
	return (
		<div className="accordion">
	    	<a 
	    		className="accordion__question"
	    		onClick={handler}
	    	>
	    		{question}
	    	</a>
	    	<p className="accordion__answer">
	    		{answer}
	    	</p>
	   </div>
	);
};

class Accordion extends Component {
	state = {
		show: false
	}
	clickQuestion = (e) => {
		if (e.target.classList.contains('active')) {
			document.querySelector('.open').classList.remove('open');
			e.target.classList.remove('active');
			this.setState({
				show: false
			})
			return;
		} else if (this.state.show) {
			document.querySelector('.open').classList.remove('open');
			document.querySelector('.active').classList.remove('active');
		}
		e.target.classList.add('active');
		e.target.nextElementSibling.classList.add('open');
		this.setState({
			show: true
		})
	}
	render() {
		let {props} = this.props,
			handler = this.clickQuestion;
		return (
			<div className="container">
			<h2>Популярні питання</h2>
				{props.map( (data, i) => 
					<Box key={i} handler={handler} data={data}/>)
				}
			</div>
		);
  	}
}

ReactDOM.render(
	<Accordion props = {options}/>,
	document.querySelector(".root")
);
