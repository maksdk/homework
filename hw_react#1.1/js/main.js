class Button extends React.Component {
	state = {
		mainColor: "#004080"
	}
	clickButton = (e)  => {
		let parent = e.target.parentNode;
		parent.classList.add("active");
		
		setTimeout(function() {
			parent.classList.remove("active");
			parent.classList.add("finished");
		}, 2000);
		
		setTimeout(function() {
			parent.classList.remove("finished");
		}, 4000);
	}
	watchColorPicker = (e) => {
		let getColor = e.target.value;
		this.setState(({color}) => ({
			mainColor: getColor
	    }))
	}
	render(){
		return (
			<div className="container">
				<label
					className="label"
				>
					Choose color:
					<input
						className="label--inputColor"
						onChange={this.watchColorPicker}
						type="color"
						value={`${this.state.mainColor}`}
					/>
				</label>
				<button 
					className="button"
					style={{backgroundColor:`${this.state.mainColor}`}}
				>
				<span 
					className="button__submit"
					onClick={this.clickButton}
				>
					click me
				</span>
				<span 
					className="button__progress"
				>
				</span>
				<span 
					className="button__loading"
				>
				</span>
				<span 
					className="button__checked"
				>
				</span>
				</button>
			</div>
		);
	}
}

ReactDOM.render(
  <Button />,
  document.body
)