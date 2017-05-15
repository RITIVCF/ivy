import React, {Component} from 'react';



export default class ContactMajor extends Component {

  componentDidMount(){
    Materialize.updateTextFields();
  }

  updateMajor(event){
    event.preventDefault();
    var text= this.refs.major.value.trim();
    this.props.contact.setMajor(text);
  }

  handleMajorChange(event){
    this.setState({name:event.target.value});
  }

  render(){
    return(
      <div className="input-field">
        <input type="text"
          ref="major"
          id="contact_major"
          disabled={this.props.disabled}
          onBlur={this.updateMajor.bind(this)}
          onChange={this.handleMajorChange}
          value={this.props.contact.getMajor()}
        />
      <label htmlFor="contact_major">Major</label>
      </div>
    )
  }
}
