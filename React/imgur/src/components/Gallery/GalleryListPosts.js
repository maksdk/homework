import React from 'react';
import GalleryPost from './GalleryPost.js';

const renderTile = galleryList => {
	return (
		galleryList.map(({
			id,
			title, 
			views, 
			downs, 
			comment_count, 
			points, 
			cover,
			account_url
		}, i) => (
			<GalleryPost
				key={id + i}
	            id={id}
	            cover={cover}
	            title={title}
	            views={views}
	            downs={downs}
	            commentCount={comment_count}
	            points={points}
	            nickName={account_url}
	         />
		))
	);
}

export default ({galleryList}) => {
	return (
		<div 
			className='galleryList'
			children={renderTile(galleryList)}
		/>      
	);
}