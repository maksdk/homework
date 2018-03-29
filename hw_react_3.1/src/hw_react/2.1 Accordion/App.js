import React, {Component} from 'react';

import './App.css';
import options from './options.js';

const Item = ({answer, question, onClick, id, active}) => (
	<div className="accordion">
		<span 
			className={`accordion__question ${active ? "down" : "up"}`}
			onClick={() => onClick(id)}
		>
			{question}
		</span>
		<p
			className={`accordion__answer ${active ? "visible" : "hidden"}`}
		>
			{answer}
		</p>
	</div>
);


class Accordion extends Component {
	state = {
		activeInd: null
	}
	onClickOpenAnswer(index) {
		const {activeInd} = this.state;
		this.setState({
			activeInd: activeInd === index ? null : index
		})
	}
	render() {
		return (
			<div>
				{
				options.map(({answer, question}, i) => (
					<Item 
						key={i}
						id={i}
						answer={answer}
						question={question}
						onClick={this.onClickOpenAnswer.bind(this)}
						active={this.state.activeInd === i}
					/>
				))
				}
			</div>
		);
  	}
}
export default Accordion;

