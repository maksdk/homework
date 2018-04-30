import React from 'react';

export default ({
	views,
	points,
	commentCount
}) => (
	<div className='galleryList__post--stat'>
		<span 
			className='galleryList__post--views' 
			children={views}
		/>
		<span 
			className='galleryList__post--points' 
			children={points}
		/>
		<span 
			className='galleryList__post--comment' 
			children={commentCount}
		/>
	</div>
);