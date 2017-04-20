import React, {Component} from 'react';



export default class ContactBio extends Component {

  componentDidMount(){
    $('textarea').trigger('autoresize');
  }

  updateBio(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.bio.value.trim();
    this.props.contact.setBio(text);
  }

  handleBioChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  render(){
    return(

          <textarea
            ref="bio"
            className="materialize-textarea"
            rows="4"
            disabled={this.props.disabled}
            onBlur={this.updateBio.bind(this)}
            onChange={this.handleBioChange}
            value={this.props.contact.getBio()}
            placeholder="Type here to write bio..."
          />

    )
  }
}
