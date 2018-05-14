import React from 'react';
export default ({
	option = [],
	className = '',
	onChange = () => {}
}) => (
	<select 
		onChange={onChange}
		className={className}
		>
		{'select'}
		{ option && option.map( (option, i) => (
			<option 
				key={i}
				value={option}
				children={option} 
			/>
		))}
	</select>
);