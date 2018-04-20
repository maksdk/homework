import React, {Component} from 'react';

export default class ChangeSize extends Component {
	state = {
		clickDouw: false
	}
	mouseDown(e) {
		e.stopPropagation();
   		e.nativeEvent.stopImmediatePropagation();
   		this.outBlock = e.target.parentNode;
   		this.startClientX = e.clientX;
   		this.width = e.target.parentNode.offsetWidth;
   		this.size = this.props.size;
   		//console.log(this.size);
   		//console.log(this.width);
		this.setState({
   			clickDouw: true
   		})
   	}
    mouseMove(e) {
    	if(!this.state.clickDouw) return;
    	e.stopPropagation();
   		e.nativeEvent.stopImmediatePropagation();
   		//console.log(this.width - (this.startClientX - e.clientX));
   		//this.outBlock.style.width = this.width - (this.startClientX - e.clientX) + "px";
   	}
    mouseUp(e){
    	this.setState({
    		clickDouw: false
    	})
    }
	render() {
		let {children, className} = this.props;
		return (
			<div
				className={`changeSize ${className}`}
				onMouseDown={this.mouseDown.bind(this)}
				onMouseMove={this.mouseMove.bind(this)}
				onMouseUp={this.mouseUp.bind(this)}
			>
			{children}
			</div>
		);
	}
} 