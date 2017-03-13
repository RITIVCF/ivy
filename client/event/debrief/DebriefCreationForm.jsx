import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class DebriefCreationForm extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentWillUnmount(){
		tinymce.remove();
  }

	componentDidMount(){
		tinymce.init({
      selector: "#debriefcreationform",
      theme: "modern",
      height: 300,
			plugins: "table link textcolor colorpicker autolink paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "edit insert view format table",
      toolbar: [ ' paste copy cut | fontselect fontsizeselect',
        'undo redo | styleselect | bold italic underline strikethrough subscript superscript'+
        ' | bullist numlist | alignleft aligncenter alignright alignjustify | indent outdent | link | removeformat'],
			browser_spellcheck: true,
			setup : function(editor) {
        //console.log("State in Setup: ",state);
        //editor.setContent(state.notes);
        //editor.setContent("<b>This is a set content test.</b>");
				// editor.on('keyup', function(e) {
				// 		updateDraft(eid, tinymce.get("notespad").getContent());
        // });
    }
  	});
		tinymce.get("debriefcreationform").setContent(Options.findOne("debriefquestions").val);
	}

	submit(event){
		event.preventDefault();
		Meteor.call("setDebriefQuestions", tinymce.get("debriefcreationform").getContent(), function(error){
			if(error){
				Materialize.toast("Oops, something went wrong. Please try again.", 4000);
				console.log(error);
			}else{
				Materialize.toast("Successfully saved!", 4000);
			}
		});
		FlowRouter.go("/events/debrief");
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col s12">
						<textarea id="debriefcreationform" />
	        </div>
				</div>
				<div className="row">
					<div className="col s12">
						<form onSubmit={this.submit.bind(this)}>
							<button className="btn" >Save</button>
						</form>
					</div>
				</div>

		  </div>
		)
	}
}
