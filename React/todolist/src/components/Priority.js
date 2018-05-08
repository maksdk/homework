import React from 'react';
import Button from './Button.js';

export default ({className, onclick}) => (
	<div className={className}>
		<Button
			className={`${className}__red`}
			onclick={() => onclick('red', '!!!')}
			children='!!!'
		/>
		<Button
			className={`${className}__orange`}
			onclick={() => onclick('orange', '!!')}
			children='!!'
		/>
		<Button
			className={`${className}__blue`}
			onclick={() => onclick('blue', '!')}
			children='!'
		/>
		{
			// <Button
			// 	className={`${className}__grey`}
			// 	onclick={() => onclick('grey', '!')}
			// 	children='!'
			// />
		}
	</div>
);