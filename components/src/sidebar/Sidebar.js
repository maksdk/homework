import React, {Component} from 'react';

let items = new Array(10);

export default class Sidebar extends Component{
	constructor(props){
		super();
		this.state = {
			isShowed:false
		};
	}
	toggleVisible(e){
		e.preventDefault();
		e.stopPropagation();
		
		let {isShowed} = this.state;
		this.setState({isShowed:!isShowed});
	}
	render(){
		let {isShowed} = this.state;
		return(
			<div className='sidebar'>
				<div className={`sidebar_left ${isShowed ? 'sidebar_left_visible' : ''}`}>
					<div 
						onClick={(e) => this.toggleVisible(e)}
						children='X'
						className='sidebar_closeBtn'
					/>
					<div className='sidebar_title'></div>
					{items && items.map((item, i) => {
							return(
								<div
									className='sidebar_item'
									children={`Item_${i}`}
								/>
							)
					})}
				</div>
			</div>	
		);
	}
}