import React from 'react';

import PostTitle from '../Gallery/PostTitle.js';
import PostNickName from '../Gallery/PostNickName.js';
import TogglePost from './TogglePost.js';

import './styles/homePageHeader.css';

export default ({
	title, 
	nickName, 
	idNextPost, 
	idPrevPost, 
	onClickNextOrPrevButton
}) => {
	return (
		<div className='homePage__header'>
			<PostTitle title={title}/>
			<PostNickName nickName={nickName}/>
			<div className= 'homePage__header--toggleButton' >
				{ idPrevPost && <TogglePost
					className='previous'
					id={idPrevPost}
					onClickNextOrPrevButton={onClickNextOrPrevButton}
				/>}
				{ idNextPost && <TogglePost
					className='next'
					id={idNextPost}
					onClickNextOrPrevButton={onClickNextOrPrevButton}
				/>}
			</div>
		</div>
	);
}