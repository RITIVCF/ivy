import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class TinyMCE extends TrackerReact(React.Component) {
  constructor(props){
    super(props);

  }

	handleChange(content){
		this.props.onChange(content);
	}

	getId(){
		return this.props.id + "_tinymce";
	}

	initializeTinyMCE(){
		let id = this.getId();
		tinymce.init({
			selector: "#"+ id,
			theme: "modern",
			height: 300,
			plugins: "paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "",
			toolbar: ['bold italic underline strikethrough subscript superscript emoveformat'],
			browser_spellcheck: true,
			setup : (editor) => {
				editor.on('change', (e) => {
						try{
							this.handleChange(tinymce.get(id).getContent());
						}catch (err){
							console.log(err);
						}

				});
				editor.on('keyup', (e) => {
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

	removeTinyMCE(){
		let id = this.getId();
		tinymce.EditorManager.execCommand('mceRemoveEditor', true, id);
	}

  componentDidMount(){
		this.initializeTinyMCE();
  }

	componentWillUnmount(){
		this.removeTinyMCE();
	}

	// componentWillUpdate(nextProps){
	// 	if(nextProps.id != this.props.id){
	// 		// Switching modules
	// 		this.removeTinyMCE(this.props.id);
	// 	}
	// }
	//
	// componentDidUpdate(prevProps){
	// 	if(prevProps.id != this.props.id){
	// 		// Switching Modules
	// 		this.initializeTinyMCE(this.props.id);
	// 	}
	// }

	render() {
		let id = this.getId();
    return (
			<textarea id={id}>
			</textarea>
    )
  }

}
