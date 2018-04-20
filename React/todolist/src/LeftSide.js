import React, {Component} from 'react';

import ChangeSize from './ChangeSize.js';

class LeftSide extends Component {
	render() {
		return (
			<div 
				className='leftside'
			>
				Входящие
				<ChangeSize 
					className='changeWidth'
					size="width"
				/>
			</div>
		);
	}
}

export default LeftSide;