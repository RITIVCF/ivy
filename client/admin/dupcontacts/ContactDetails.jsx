import React, {Component} from 'react';

export default class ContactDetails extends Component {
  constructor(){
    super();
    this.state = {
      name: false,
      email: false,
      phone: false,
      major: false,
      bio: false,
      news: false
    }
  }

  handleNameChange(event){
    this.setState({name: !this.state.name});
  }

  handleEmailChange(event){
    this.setState({email: !this.state.email});
  }

  handlePhoneChange(event){
    this.setState({phone: !this.state.phone});
  }

  handleMajorChange(event){
    this.setState({major: !this.state.major});
  }

  handleBioChange(event){
    this.setState({bio: !this.state.bio});
  }

  handleNewsChange(event){
    this.setState({news: !this.state.news});
  }

  getContact(){
    return Meteor.users.findOne(this.props.cid);
  }

  render() {
    var contact = this.getContact();
    var d = !(!this.props.mergec);
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            {contact.name}
          </span>
          <p><input type="checkbox" id="name"  ref="name"  checked={this.state.name} disabled={d} onClick={this.handleNameChange.bind(this)} />
            <label htmlFor="name">Name:</label> {contact.name}</p>
          <p><input type="checkbox" id="email" ref="email" checked={this.state.email} disabled={d} onClick={this.handleEmailChange.bind(this)} />
            <label htmlFor="email">Email:</label> {contact.emails[0].address}</p>
          <p><input type="checkbox" id="phone" ref="phone" checked={this.state.phone} disabled={d} onClick={this.handlePhoneChange.bind(this)} />
            <label htmlFor="phone">Phone:</label> {contact.phone}</p>
          <p><input type="checkbox" id="major" ref="major" checked={this.state.major} disabled={d} onClick={this.handleMajorChange.bind(this)} />
            <label htmlFor="major">Major:</label> {contact.major}</p>
          <p><input type="checkbox" id="bio"   ref="bio"   checked={this.state.bio} disabled={d} onClick={this.handleBioChange.bind(this)} />
            <label htmlFor="bio">Bio:</label> {contact.bio}</p>
          <p><input type="checkbox" id="news"  ref="news"  checked={this.state.news} disabled={d} onClick={this.handleNewsChange.bind(this)} />
            <label htmlFor="news">Newsletter:</label> {contact.newsletter?"Yes":"No"}</p>
        </div>
      </div>
    )
  }
}
