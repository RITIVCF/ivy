import React, {Component} from 'react';



export default class PreviewEvent extends Component {
	constructor(){
		super();

		this.state = {
			hovering: false
		};

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.goToEvent = this.goToEvent.bind(this);

	}

	handleMouseOver(){
		this.setState({hovering: true});
	}

	handleMouseLeave(){
		this.setState({hovering: false});
	}

  goToEvent(){
    FlowRouter.go("/events/attendance/"+this.props.event._id);
  }

  render(){
		const { hovering } = this.state;
    const { event } = this.props;
		const imgPath = event.pic ? event.pic : "/images/defaultEventSmall.png";
    return(
      <div className={hovering?"card addBorderToCard":"card"}
				onDoubleClick={this.goToEvent}>
				<span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
					<div className="eventImage" style={{...styles.image, backgroundImage: `url(${imgPath})`}}>
						<span className="card-title" style={styles.title}>{event.name}</span>
					</div>
					<div className="card-content">
						<p>{new moment(event.start.toISOString()).format("DD MMM @ h:mmA")}</p>
						<p>Attendees: {event.attendees.length}</p>
					</div>
				</span>
      </div>

    )
  }
}

const styles = {
	image: {
		height: "100px"
	},
	title: {
		fontSize: "18px",
  	width: "100%",
  	whiteSpace: "nowrap",
  	overflow: "hidden",
  	textOverflow: "ellipsis"
	}
};
