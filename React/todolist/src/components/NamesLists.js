import React from 'react';

export default ({
	className, 
	allLists, 
	onclick, 
	activeList
}) => (
	<div className={`${className}__lists`}>
		{
			allLists.map( ({list, color}) => (
				<div
					key={list}
					className={`${className}__lists--body ${activeList === list ? 'activeList' : ''}`}
					onClick={() => onclick(list, color)}
				>
					<span  
						className={`${className}__lists--iconList`}
						style={{
							color: color
						}}
					>
						<i className='fa fa-list-alt' 
							aria-hidden="true"
						/>
					</span>
					<span 
						className={`${className}__lists--titleList`}
						children={list}
						style={{
							color: color
						}}
					/>	
				</div>
			))
		}
	</div>
);


