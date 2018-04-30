import React from 'react';

import PostTitle from './PostTitle.js';
import PostNickName from './PostNickName.js';
import PostStatistic from './PostStatistic.js';
import PostImg from './PostImg.js';

export default ({
		title,
		views,
		commentCount,
		points,
		id,
		cover,
		nickName
	}) => {
		return(
			<div className='galleryList__post'>
				<PostImg 
					id={id}
					cover={cover}
				/>
				<PostTitle title={title}/>
				<PostNickName nickName={nickName}/>
				<PostStatistic 
					views={views}
					points={points}
					commentCount={commentCount}
				/>
			</div>
		);
}

