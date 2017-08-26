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

Navbar = function(props) {
	return <ul className={props.right?"right":""}>
		{props.children}
	</ul>
}

NavbarItem = function(props) {
	return (
		<li onClick={props.onClick}><a href={props.href}>{props.children}</a></li>
	)
}

Card = function(props) {
	return (
		<div
			className="card"
			onClick={props.onClick}
			onDoubleClick={props.onDoubleClick}
		>
			{props.img&&<CardImage src={props.img} />}
			<CardContent title={props.title} >
				{props.children}
			</CardContent>
		</div>
	)
}

CardImage = function(props) {
	return (
		<div className="card-image">
			<img src={props.src} className="circle" />
		</div>
	)
}

CardContent = function(props) {
	return (
		<div className="card-content">
			<span className="card-title">{props.title}</span>
			{props.children}
		</div>
	)
}
