import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import HomePageHeader from './HomePageHeader.js';
import HomePageContent from './HomePageContent.js';
import HomePageComments from './HomePageComments.js';
import PostStatistic from '../Gallery/PostStatistic.js';
import BackToTop from '../BackToTop.js';
import BackToMainPage from '../BackToMainPage.js';
import asyncGetComments from '../../actions/asyncGetComments.js';
import onClickButtonToTop from '../../helpers/buttonToTop.js';

import './styles/homePage.css';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			replies: null
		}
		this.onClickReplies = this.onClickReplies.bind(this);
		this.findPrevAndNextPost = this.findPrevAndNextPost.bind(this);
		this.onClickNextOrPrevButton = this.onClickNextOrPrevButton.bind(this);
	}
	findCurrentPostInList = () => {
		let { galleryList, match } = this.props;
		return (
			galleryList.find(({id}) => (
				id === match.params.postId
		)));
	}
	onClickReplies(commentId) {
		let {replies} = this.state;
		if (replies === commentId) {
			this.setState({
				replies: null
			})
		} else {
			this.setState({
				replies: commentId
			})
		}	
	}
	onClickNextOrPrevButton = (button) => {
   		let { getComments } = this.props;
   		if (button === 'next') {
   			this.findPrevAndNextPost(this.idNextPost);
   			this.idNextPost && getComments(this.idNextPost);
   		} else if (button === 'previous') {
   			this.findPrevAndNextPost(this.idPrevPost);
   			this.idPrevPost && getComments(this.idPrevPost);
   		}
   	}
	findPrevAndNextPost= (id) => {
		let { galleryList} = this.props;
		let indexCurrentPost = findIndex(galleryList, { id: id });
		if (indexCurrentPost > 0) {
			this.idPrevPost = galleryList[indexCurrentPost - 1].id;
		} else if (indexCurrentPost === 0) {
			this.idPrevPost = null;
		}
		this.idNextPost = galleryList[indexCurrentPost + 1].id;
	}
	componentWillMount = () => {
		let { id } = this.findCurrentPostInList();
		this.findPrevAndNextPost(id);
		let { getComments } = this.props;
		getComments(id);
	}
	render () {
		let { 
			title, 
			account_url, 
			images, 
			type, 
			views, 
			points, 
			comment_count,
			mp4,
			description 
		} = this.findCurrentPostInList();
		let { comments} = this.props;
		let { replies } = this.state;
		console.log('============');
		// console.log(images);
		// console.log(type);
		console.log(this.props);
		console.log(mp4);
		return(
			<div className='homePage'>
				<HomePageHeader
					title={title}
					nickName={account_url}
					idNextPost={this.idNextPost}
					idPrevPost={this.idPrevPost}
					onClickNextOrPrevButton={this.onClickNextOrPrevButton}
				/>
				<HomePageContent
					images={images}
					type={type}
					mp4={mp4}
					description={description}
				/>
				<div
					className='homePage__stat'
					children={
						<PostStatistic
							views={views}
							points={points}
							commentCount={comment_count}
						/>}
				/>
				<HomePageComments
					comments={comments}
					replies={replies}
					onClickReplies={this.onClickReplies}
				/>
				<BackToMainPage/>
	            <BackToTop 
	                onclick={onClickButtonToTop}
	            />
			</div>
		);
	}	
}

const mapStateToStore = state => ({
	galleryList: state.galleryList,
    comments: state.comments
});

const mapDispatchToStore = dispatch => ({
	getComments: id => {
		dispatch(asyncGetComments(id))
    }
});

export default connect(
	mapStateToStore,
	mapDispatchToStore
)(HomePage);