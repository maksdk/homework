import React from 'react';
import { COLOR__LIST } from './constants/index.js';
import Button from './Button.js';
import './styles/colorPicker.css';

export default ({
	onclick, 
	className = '',
	title
}) => (
	<div
		className={`colorPicker__container ${className}`}
	>	
		<span
			className='colorPicker__container--title'
			children={`Выберите цвет ${title}`}
		
		/>
		{ COLOR__LIST.map( color => (
				<Button
					key={color}
					onclick={() => onclick(color)}
					className={`colorPicker__item `}
					style={{
						backgroundColor:`${color}`
					}}  
				/>
			))
		}
	</div>
);