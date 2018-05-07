import React from 'react';
import ProjectItem from './ProjectItem.js';
import './styles/projectList.css';

export default ({
	allLists = [], 
	selectProject,
	activeProject
}) => (
	<div className='project__list'> 
		{	allLists.length > 0 && 
				allLists.map( title => {
					console.log(allLists);
					console.log(title);
					return ( 
						<ProjectItem
							key={title}
							titleProject={title}
							//dateOfCreation={dateOfCreation}
							activeProject={activeProject === title}
							selectProject={selectProject}
						/>);
				})
		}
	</div>
	
);