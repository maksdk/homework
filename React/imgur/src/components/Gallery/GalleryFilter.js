import React from 'react';
import './styles/galleryFilter.css';
import Select from './Select.js';

export default ({onchange}) => {
	return (
		<div className='galleryFilter'>
			<Select
				value={['Hot', 'Top', 'User']}
				type='section'
				label='Select section: '
				onchange={onchange}
			/>
			<Select
				value={['Viral', 'Top', 'Time']}
				type='sort'
				label='Select sort: '
				onchange={onchange}
			/>
			<Select
				value={['Day', 'Week', 'Month', 'Year']}
				type='period'
				label='Select time: '
				onchange={onchange}
			/>
		</div>
	);
}