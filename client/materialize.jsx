export {
	Row,
	Column,
	NavbarItem,
	Button
}

Row = function(props){
	return (
		<div className="row">
			{props.children}
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
	return (
		<button
			className={className}
			onClick={props.onClick}>
			{props.children}
		</button>
	)
}

NavbarItem = function(props) {
	return (
		<li><a href={props.href}>{props.children}</a></li>
	)
}
