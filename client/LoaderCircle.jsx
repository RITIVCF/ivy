
export default function LoaderCircle(props){
	console.warn("Hitting loader circle");
	const style = props.style?props.style:{paddingTop:"50px"};
	return (
		<div className="center-align" style={style}>
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-blue-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
						<div className="circle"></div>
					</div><div className="circle-clipper right">
						<div className="circle"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
