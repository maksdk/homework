import React from 'react';
import { Link } from "react-router-dom";

import ToTopPage from '../../helpers/toTopPage.js';

export default ({
	id,
	cover
}) => (
	<Link 
		className='galleryList__post--link' 
		to={`gallery/${id}`}
		onClick={ToTopPage}
	>
		<img 
			className='galleryList__post--img' 
			src={`//i.imgur.com/${cover ? cover : id}b.jpg`}
			alt='Post'
		/>
	</Link> 
);