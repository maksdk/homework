import React from 'react';
import './App.css';

var options = [{
      title: 'Show Courses',
      number: 12,
      header: 'Learn React',
      description: 'React is a fantastic new front end library for rendering web pages. React is a fantastic new front end library for rendering web pages.',
      imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
    },{
      title: 'Show Courses',
      number: 25,
      header: 'Learn Gulp',
      description: 'Gulp will speed up your development workflow.  Gulp will speed up your development workflow.  Gulp will speed up your development workflow.',
      imageUrl: 'http://brunch.io/images/others/gulp.png'
    },{
      title: 'Show Courses',
      number: 12,
      header: 'Learn React',
      description: 'React is a fantastic new front end library for rendering web pages. React is a fantastic new front end library for rendering web pages.',
      imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
    },{
      title: 'Show Courses',
      number: 12,
      header: 'Learn React',
      description: 'React is a fantastic new front end library for rendering web pages. React is a fantastic new front end library for rendering web pages.',
      imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
    },{
      title: 'Show Courses',
      number: 12,
      header: 'Learn React',
      description: 'React is a fantastic new front end library for rendering web pages. React is a fantastic new front end library for rendering web pages.',
      imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
    }];



const Button = ({title, number}) => {
	return (
		<button className="thandnail__button">{title}
			<span className="thandnail__button--num">{number}</span>
		</button>
	);
}

const Thandnail =({header, description, imageUrl, ...rest}) => {
	return (
		<div className="thandnail">
			<img src={imageUrl} className="thandnail__img"/>
			<h3 className="thandnail__header">{header}</h3>
			<p className="thandnail__description">{description}</p>
			<Button {...rest}/>
		</div>
	);
	
}

const ThandnailList = props => {
	return (
		<div className="thandnailList">
			{options.map((item, i) => (
				<Thandnail key={i} {...item}/>
			))}
		</div>
	);
}
	
export default ThandnailList;