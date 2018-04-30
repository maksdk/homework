import React, {Fragment} from 'react';
import Comment from './Comment.js';

const renderComments = (comments, onClickReplies, replies) => (
	comments.map(({
		author, 
		children, 
		comment, 
		points, 
		id
	}) => (
		<Fragment key={id}>
			<Comment
				key={id}
				className={id === replies}
				commentId={id}
				children={children}
				author={author}
				comment={comment}
				points={points}
				onClickReplies={onClickReplies}
			/>
			{ id === replies &&
				children.map( ({id, author, comment, points, children}) => (
					<Comment
						className='reply'
						key={id}
						commentId={id}
						author={author}
						comment={comment}
						points={points}
						onClickReplies={onClickReplies}
					/>
				))
			}
		</Fragment>
	))
);

export default ({comments, onClickReplies, replies}) => (
	<div className='homePage__allComments' >
		<div 
			className='homePage__allComments--commentsCount'
			children={`${comments.length} COMMENTS`}
		/>
		{comments.length && renderComments(comments, onClickReplies, replies)}
	</div>
)

