import {combineReducers} from 'redux';

import galleryList from './galleryList.js';
import comments from './comments.js';

export default combineReducers({
	galleryList,
	comments
});