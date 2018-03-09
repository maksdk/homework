let options = [{
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

   
class Thumbnail extends React.Component {
	render(){
		let {props} = this.props;
		return (
			  <div className="container">
		        {props.map(item => 
		        	<div className="thumbnail">
		        		<img
			        		className="thumbnail__img" 
			        		src={item.imageUrl}/>
		        		<h3
		        			className="thumbnail__header">
		        			{item.header}
		        		</h3>
		        		<p 
		        			className="thumbnail__discr">
		        			{item.description}
		        		</p>	
			        	<button 
			        		className="thumbnail__btn">
			        		{item.title}
			        		<span
			        			className="thumbnail__num">
			        			{item.number}
			        		</span>
			        	</button>
		        	</div>
		        )}
		    </div>
		);
	}
}
ReactDOM.render(
  <Thumbnail  props={options}/>,
  document.body
)

 