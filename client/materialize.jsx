import React from 'react';
import { Random } from 'meteor/random';

export {
	Row,
	Column,
	NavbarItem,
	Button
}

const TOOLTIP_DEFAULT_DELAY = 50;
const TOOLTIP_DEFAULT_TEXT = "This is a tooltip";
const TOOLTIP_DEFAULT_HTML = "";
const TOOLTIP_DEFAULT_POSITION = "BOTTOM";

Row = function({children, style}){
	return (
		<div className="row" style={style}>
			{children}
		</div>
	)
}

Column = function(props){
	let width = "s12";
	if(props.width){
		width = props.width;
	}
	return (
		<div className={"col " + width}>
			{props.children}
		</div>
	)
}

Button = function(props){
	let className = "btn ";
	if(props.color){
		className += props.color + " ";
	}
	if ( props.className ) {
		className += props.className + " ";
	}
	return (
		<button
			disabled={props.disabled}
			className={className}
			onClick={props.onClick}>
			{props.children}
		</button>
	)
}

Navbar = function(props) {
	return <ul style={props.style} className={props.right?"right":""}>
		{props.children}
	</ul>
}

class NavbarItem extends React.Component {
	constructor(props){
		super();

		this.state = {

		}

		if(props.tooltip){
			this.state.tooltipID = Random.id(5);
		}
	}

	componentDidMount(){
		if(this.props.tooltip){
			this.initializeTooltip();
		}
	}

	componentWillUnmount(){
		$('#'+this.state.tooltipID).tooltip('remove');
	}

	render(){
		const props = this.props;
		const hover = (props.onClick||props.href);
		const id = this.state.tooltipID ? this.state.tooltipID:"";
		const className = this.getClassName();
		return (
			<li className={className} onClick={props.onClick} id={id} >
				{
					hover ?
						<a href={props.href}>
							{props.children}
						</a>
					:
					props.children
				}
			</li>
		)
	}

	getClassName(){
		return this.props.className;
	}

	initializeTooltip(){
		let options = {
			delay: TOOLTIP_DEFAULT_DELAY,
			position: TOOLTIP_DEFAULT_POSITION
		};
		if(this.props.tooltip.text){
			options.tooltip = this.props.tooltip.text;
		} else if (this.props.tooltip.HTML) {
			options.html = this.props.tooltip.html;
		} else {
			options.tooltip = TOOLTIP_DEFAULT_TEXT;
		}

		$('#'+this.state.tooltipID).tooltip(options);
	}
}

Img = function(props) {
	return (
		<img src={props.src} className={props.className} style={props.style} />
	)
}

Card = function({ children, onClick, onDoubleClick, img, title, table }) {
	return (
		<div
			className="card"
			onClick={onClick}
			onDoubleClick={onDoubleClick}
		>
			{img&&<CardImage src={img} />}
			<CardContent title={title} >
				{children}
			</CardContent>
			{table&&table}
		</div>
	)
}

CardImage = function(props) {
	return (
		<div className="card-image">
			<Img src={props.src} className="circle" />
		</div>
	)
}

CardContent = function({ children, title }) {
	return (
		<div className="card-content">
			{title && <span className="card-title">{title}</span>}
			{children}
		</div>
	)
}


Chip = function(props) {
	const style = props.color && {backgroundColor: props.color};
	return (
		<div className="chip" style={style}>
			{props.image&&<img src={props.image.src} alt={props.image.alt} />}
			{props.children}
		</div>
	)
}
