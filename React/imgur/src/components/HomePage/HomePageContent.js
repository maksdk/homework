import React from 'react';
import './styles/homePageContent.css';

const renderImg = images => (
	images.map(({link, description, id}) => (
		<div key={id} className='homePage__content--img'>
			<img 
				src={link}
				alt='Post'
			/>
			<div 
				className='homePage__content--description'
				children={description}
			/>
		</div>
	))
);

const renderVideo = (mp4, description) => (
	<div key={mp4} className='homePage__content--video'>
	
		<video
			preload='auto'
			autoPlay='autoplay'
			playsInline
		>
			<source src={mp4}/>
		</video>
		<div 
			className='homePage__content--description'
			children={description}
		/>
	</div>
);
export default ({images, type, mp4, description}) => (
	<div className='homePage__content'>
		{(images !== undefined) && renderImg(images)}
		{(type === 'image/gif' || type === 'image/mp4') 
			&& renderVideo(mp4, description)}
	</div>
)