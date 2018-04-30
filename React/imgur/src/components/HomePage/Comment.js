import React from 'react';
import './styles/comment.css';

export default ({
	author, 
	comment, 
	points, 
	children, 
	commentId, 
	replies, 
	onClickReplies, 
	className
}) => (
	<div 
		className={`homePage__allComments__comment 
			${className === 'reply' ? 'reply' : ''} 
			${className ? 'openReply' : ''}`}
	>
		<div className='homePage__allComments__comment--author'>
			<span 
				className='galleryList__post--nickName'
				children={author}
			/>
		</div>
		<div className='homePage__allComments__comment--body'>
			<div 
				className='homePage__allComments__comment--text'
				children={comment}
			/>	
		</div>
		<span 
			className='galleryList__post--points' 
			children={points}
		/>
		{ children && children.length > 0 && 
			<div 
				className={`homePage__allComments__comment--replies 
							${className === true ? 'openReplies' : ''}`}
				children={`replies (${children.length})`}
				onClick={() => onClickReplies(commentId)}
			/>
		}

	</div>
);