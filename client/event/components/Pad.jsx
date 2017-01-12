import React, {Component} from 'react';

var updWorkpad = _.throttle(
  function(eid, pad, value)
  {console.log("updWorkpad", value);
    Meteor.call("updateEventWorkpad", eid, pad, value);
    Meteor.call("EventWorkpadLock", eid, pad, true);
  },500);

var setWorkPadFalse = _.debounce(function(thiz, pad, eid){
  console.log("set false",thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("EventWorkpadLock", eid, pad, false);
}, 1000);

export default class Pad extends Component {
  constructor(props){
    super(props);
    this.state={
      editting: false
    }
  }

  componentDidMount(){
    var thiz = this;
    var id = "#"+this.props.pad.name.replace(" ","");
    console.log("Ref",this.refs[this.props.pad.name]);
    console.log("#"+this.props.pad.name.replace(" ",""));
    console.log(id);
    console.log($(id));
    console.log(this);
    tinymce.init({
			//selector: "#mytextarea",
      selector: "#"+this.props.pad.name.replace(" ","")+"pad",
      theme: "modern",
      height: 300,
			plugins: "table link textcolor colorpicker autolink paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "edit insert view format table",
      toolbar: [ ' paste copy cut | fontselect fontsizeselect',
        'undo redo | styleselect | bold italic underline strikethrough subscript superscript'+
        ' | bullist numlist | alignleft aligncenter alignright alignjustify | indent outdent | link | removeformat'],
			setup : function(editor) {
				editor.on('keyup', function(e) {
            //console.log(tinymce.activeEditor);
            thiz.setState({editting: true});
            //console.log('key event', e);
						updWorkpad(thiz.props.eid, thiz.props.pad.name, tinymce.get(thiz.props.pad.name.replace(" ","")+"pad").getContent());
				    ////console.log(this);
				    setWorkPadFalse(thiz, thiz.props.pad.name, thiz.props.eid);
            //
        });
    }
  	});
    tinymce.get(this.props.pad.name.replace(" ","")+"pad").setContent(this.props.pad.content);
    if(!this.props.editperm){
      tinymce.get(this.props.pad.name.replace(" ","")+"pad").setMode("readonly");
    }
    $('ul.tabs').tabs();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.pad.name!=prevProps.pad.name){
      tinymce.init({
  			//selector: "#mytextarea",
        selector: "#"+this.props.pad.name.replace(" ","")+"pad",
        theme: "modern",
        height: 300,
  			plugins: "table link textcolor colorpicker autolink fullscreen paste contextmenu hr searchreplace",
  			elementpath: false,
  			menubar: "edit insert view format table",
  			setup : function(editor) {
  				editor.on('keyup', function(e) {
              //console.log(tinymce.activeEditor);
              thiz.setState({editting: true});
              //console.log('key event', e);
  					  updWorkpad(thiz.props.eid, thiz.props.pad.name, tinymce.get(thiz.props.pad.name.replace(" ","")+"pad").getContent());
  				    ////console.log(this);
  				    setWorkPadFalse(thiz, thiz.props.pad.name, thiz.props.eid);
              //
          });
      }
    	});
    }
    console.log("DidUpdate");

  }

  shouldComponentUpdate(nextProps, nextState){
    //console.log(this.props.pad,nextProps.pad);
    if((this.props.pad.content==nextProps.pad.content)&&
        (this.props.pad.lock==nextProps.pad.lock)&&
        (this.state.editting==nextState.editting)){
          if(nextProps.editperm){
            tinymce.get(this.props.pad.name.replace(" ","")+"pad").setMode();
          }
          else{
            tinymce.get(this.props.pad.name.replace(" ","")+"pad").setMode("readonly");
          }
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState){
    console.log("Pad Name", this.props.pad.name);
    console.log("This state",this.state.editting);
    console.log("Next State",nextState.editting);
    if(!nextState.editting){
      console.log("setting content");
      tinymce.get(this.props.pad.name.replace(" ","")+"pad").setContent(nextProps.pad.content);
      if(nextProps.pad.lock){
        console.log(this.props.pad.name, "lock");
        tinymce.get(this.props.pad.name.replace(" ","")+"pad").setMode("readonly");
      }
      else{
        console.log(this.props.pad.name, "unlock?");
        tinymce.get(this.props.pad.name.replace(" ","")+"pad").setMode();
      }
      //tinymce.get(this.props.pad.name.replace(" ","")+"pad").selection.setCursorLocation(-1);
      tinyMCE.get(this.props.pad.name.replace(" ","")+"pad").selection.select(tinyMCE.get(this.props.pad.name.replace(" ","")+"pad").getBody(), true);
      tinyMCE.get(this.props.pad.name.replace(" ","")+"pad").selection.collapse(false);
    }

  }



  render(){
    let pad = this.props.pad;
    return(
      <div id={this.props.pad.name.replace(" ","")} ref={this.props.pad.name} className="col s12">
        <textarea id={this.props.pad.name.replace(" ","")+"pad"}>
        </textarea>
      </div>
    )
  }
}
