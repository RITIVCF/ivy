import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class tinyMCE extends React.Component {
  constructor(props){
    super(props);

  }

	handleChange(change){
		this.props.onChange(content);
	}

  componentDidMount(){
		let id = this.props.id;
		tinymce.init({
			selector: "#"+id,
			theme: "modern",
			height: 300,
			plugins: "paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "",
			toolbar: ['bold italic underline strikethrough subscript superscript emoveformat'],
			browser_spellcheck: true,
			setup : (editor) => {
				editor.on('change', function(e) {
						try{
							this.handleChange(tinymce.get(id).getContent());
						}catch (err){
							console.log(err);
						}

				});
				editor.on('keyup', function(e) {
					try{
						this.handleChange(tinymce.get(id).getContent());
					}catch (err){
						console.log(err);
					}
				});
		}
		});
		tinymce.get(id).setContent(this.props.content);
  }

	componentWillUpdate(nextProps){

	}

	render() {
		let id = this.props.id;
    return (
			<textarea id={id}>
			</textarea>
    )
  }

}
