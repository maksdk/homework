import React from 'react';
import Select, { Option } from 'rc-select';

import 'rc-select/assets/index.css';
import './styles/galleryFilter.css';

export default  ({value, type, label, onchange}) => (
		<div className={`galleryFilter__select`}>
			<span 
				children={`${label}`}
				className='galleryFilter__select--label'
			/>
	  		<Select
		     		className='galleryFilter__select'
		         	defaultValue={value[0]}
		         	placeholder="placeholder"
		         	optionFilterProp="desc"
		        	onChange={onchange}
		         	animation="slide-up"
		    >
			   {
		      	value && value.map( (value, i) => (
		      		<Option 
		      			className='galleryFilter__select--option'
		      			key={i}
		      			value={value}
		      			children={value}
		      		/>
		      	))
			   }
	     	</Select> 
	   </div>
)