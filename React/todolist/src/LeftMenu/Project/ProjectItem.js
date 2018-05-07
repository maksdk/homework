import React from 'react';

export default ({
	titleProject,
	//dateOfCreation,
	activeProject,
	selectProject

}) => (
	<div 
		onClick={() => selectProject(titleProject)}
		className={`project__list__body ${activeProject ? 'activeProject' : ''}`}
		title={titleProject}
	>
		<span className="project__list__body--iconFolder">
			<i 
				className="fa fa-folder-open-o" 
				aria-hidden="true"
			/>
		</span>
		<span 
			children={titleProject}
			className="project__list__body--titleProject"
			//data-date={dateOfCreation}
			title={titleProject}
		/>
	</div>
);