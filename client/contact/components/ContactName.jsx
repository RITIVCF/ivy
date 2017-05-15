import React, {Component} from 'react';



export default class ContactName extends Component {

  componentDidMount(){
    Materialize.updateTextFields();
  }

  updateName(event){
    event.preventDefault();
    var text= this.refs.name.value.trim();
    this.props.contact.setName(text);
  }

  handleNameChange(event){
    this.setState({name:event.target.value});
  }

  render(){
    return(
      <div className="input-field">
          <input type="text"
            ref="name"
            id="contact_name"
            disabled={this.props.disabled}
            onBlur={this.updateName.bind(this)}
            onChange={this.handleNameChange}
            value={this.props.contact.getName()}
          />
        <label htmlFor="contact_name">Name</label>
      </div>
    )
  }
}
