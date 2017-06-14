import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class TinyMCE extends TrackerReact(React.Component) {
  constructor(props){
    super(props);

  }

	handleChange(content){
		this.props.onChange(this.props.id, content);
	}

	initializeTinyMCE(id){
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

	removeTinyMCE(id){
		tinymce.EditorManager.execCommand('mceRemoveEditor', true, id);
	}

  componentDidMount(){
		this.initializeTinyMCE(this.props.id);
  }

	componentWillUnmount(){
		this.removeTinyMCE(this.props.id);
	}

	componentWillUpdate(nextProps){
		if(nextProps.id != this.props.id){
			// Switching modules
			this.removeTinyMCE(this.props.id);
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.id != this.props.id){
			// Switching Modules
			this.initializeTinyMCE(this.props.id);
		}
	}

	render() {
		let id = this.props.id;
    return (
			<textarea id={id}>
			</textarea>
    )
  }

}
