import React from 'react';
import './styles/galleryFilter.css';
import Select from './Select.js';

export default ({onChangeSelect}) => {
	return (
		<div className='galleryFilter'>
			<Select
				value={['Hot', 'Top', 'User']}
				type='section'
				label='Select section: '
				onChangeSelect={onChangeSelect}
			/>
			<Select
				value={['Viral', 'Top', 'Time']}
				type='sort'
				label='Select sort: '
				onChangeSelect={onChangeSelect}
			/>
			<Select
				value={['Day', 'Week', 'Month', 'Year']}
				type='period'
				label='Select time: '
				onChangeSelect={onChangeSelect}
			/>
		</div>
	);
}