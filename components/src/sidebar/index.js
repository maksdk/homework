import React, {Component} from 'react';
import './style.css';

let items = ['Item', 'Item', 'Item', 'Item', 'Item'];

export default class Sidebar extends Component{
	constructor(props){
		super();
		this.state = {
			isShowed:false
		};
		this.wasDowned = false;
		this.startX = null;
		this.minX = 5;
		this.sidebar = React.createRef();
	}
	toggleVisible(){
		let {isShowed} =this.state;
		this.setState({isShowed:!isShowed})
	}
	hide(e){
		if(e){
			e.preventDefault();
			e.stopPropagation();
		}
		this.wasDowned = false;
		this.startX = null;
		this.sidebar.current.style.left = 0;
		this.setState({isShowed:false});
	}
	onDownSidebar(e){
		e.stopPropagation();
		this.wasDowned = true;
		this.startX = e.clientX;

		document.addEventListener('mousemove',(e) => this.onMoveSidebar(e), false);
	}
	onUpSidebar(e){
		e.stopPropagation();
		this.wasDowned = false;
		this.startX = null;
		
		document.removeEventListener('mousemove',() => this.onMoveSidebar());
	}
	onMoveSidebar(e){
		e.stopPropagation();
		if(!this.wasDowned) return;

		let delta = this.startX - e.clientX;
		if(delta > 10 ){
			this.sidebar.current.style.left = -delta + 'px';
		} else {
			this.sidebar.current.style.left = 0;
		}

		if(delta >= 150 || e.clientX <= this.minX) {
			this.hide()
		} 
	}


	render(){
		let {isShowed} = this.state;
		return(
			<div 
				className='sidebar'
				onMouseDown={(e) => this.hide(e)}
			>
				<div 
					className={`sidebar_left ${isShowed ? 'sidebar_left_visible' : ''}`}
					onMouseDown={(e) => this.onDownSidebar(e)}
					onMouseUp={(e) => this.onUpSidebar(e)}
					ref={this.sidebar}
				>
					<div 
						onClick={(e) => this.toggleVisible(e)}
						children='X'
						className='sidebar_closeBtn'
					/>
					{items && items.map((item, i) => {
						return(
							<div
								key={i}
								className='sidebar_item'
								children={`${item}_${i}`}
							/>
						)
					})}
				</div>
			</div>	
		);
	}
}