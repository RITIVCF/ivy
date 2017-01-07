import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Option extends TrackerReact(React.Component) {
	constructor(){
		super();

	}




	render() {
		return (
			<div className="col s4">
				<div className="card left">
					<div className="card-content">
						<span className="card-title">{this.props.option._id}</span>
						{!this.props.option.vals ? <p>Value: {this.props.option.val}</p>:
							this.props.option.vals.map((value,i)=>{
								if(value.tag){
									return <div key={i}>{value.tag}</div>
								}
								if(value.label){
									return <div key={i}>{value.label}</div>
								}
								return <div key={i} >{value}</div>
						})
					}
					</div>
				</div>
			</div>

		)
	}
}
