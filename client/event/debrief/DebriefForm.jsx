import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Rating from './Rating.jsx';

var updateDraft = _.debounce(function(eid, notes){

  Meteor.call("updateDebriefDraft", eid, notes);
}, 2000);

export default class DebriefForm extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);
		var debriefs = Debriefs.find({eid: props.ev._id, uid: Meteor.userId()}).fetch();
		if(debriefs.length==1){
			var debrief = debriefs[0];
			this.state = {
				notes: debrief.notes,
				"0":debrief.questions["0"],
				"1":debrief.questions["1"]
			};
		}
		else{
			Meteor.call("insertDebriefDraft", props.ev._id);
			this.state = {
				notes: Options.findOne("debriefquestions").val
			};
		}
    console.log(this.state.notes);

  }

  componentWillUnmount(){
    tinymce.remove();
  }


	save(){

	}

	submit(event){
		event.preventDefault();
    var thiz = this;
		console.log("0: ", this.refs["0"].state.selected);
		console.log("1: ", this.refs["1"].state.selected);
		console.log("Notes: ", tinymce.get("notespad").getContent());
    Meteor.call("submitDebriefDraft", thiz.props.ev._id, function(error){
      if(error){
        console.log(error);
      }else{
        Materialize.toast("Debrief submitted successfully", 4000);
        FlowRouter.go("/events/debrief");
      }
    });

	}

	componentDidMount(){
		var eid = this.props.ev._id;
    console.log("Notes: ",this.state.notes);
    var state = this.state;
		tinymce.init({
      selector: "#notespad",
      theme: "modern",
      height: 300,
			plugins: "table link textcolor colorpicker autolink paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "edit insert view format table",
      toolbar: [ ' paste copy cut | fontselect fontsizeselect',
        'undo redo | styleselect | bold italic underline strikethrough subscript superscript'+
        ' | bullist numlist | alignleft aligncenter alignright alignjustify | indent outdent | link | removeformat'],
			setup : function(editor) {
        console.log("State in Setup: ",state);
        //editor.setContent(state.notes);
        //editor.setContent("<b>This is a set content test.</b>");
				editor.on('keyup', function(e) {
						updateDraft(eid, tinymce.get("notespad").getContent());
        });
    }
  	});
    console.log("Mounted, tinymce initialized");
    console.log("State: ", this.state);
    //tinymce.activeEditor.setContent("<b>This is a set content test.</b>");
		tinymce.get("notespad").setContent(this.state.notes);
    //tinymce.get("notespad").setContent("<b>This is a set content test.</b>");
	}


	render() {
		return (
			<div className="row">
				<form onSubmit={this.submit.bind(this)}>
					<div className="col s12">
						<Rating eid={this.props.ev._id} rid={"0"} ref="0" defaultValue={this.state["0"]}
							title="How would you rate this event as a succes?"  subtitle="(1=Not very succesful, 5=Very Successful)" />
            <Rating eid={this.props.ev._id} rid={"1"} ref="1" defaultValue={this.state["1"]}
							title="How would you rate the amount of joy from this event?"  subtitle="(1=Little, 5=Much)" />
					</div>
					<div className="col s12">
						<label>Notes</label>
						<textarea id={"notespad"} />
					</div>
					<div className="col s12">
						<button className="btn" >Submit</button>
					</div>
				</form>
		  </div>
		)
	}
}
