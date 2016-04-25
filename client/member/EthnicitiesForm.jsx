import React, {Component} from 'react';

export default class EthnicitiesForm extends Component {
  addEthnicity(event) {
    event.preventDefault();
    var name = this.refs.ethnicity.value.trim();

    Meteor.call('addEthnicity', name, ()=>{
      this.refs.ethnicity.value="";
    })
  }
  render() {
    return (
      <form className="new-ethnicity" onSubmit={this.addEthnicity.bind(this)}>
        <input type="text" ref="ethnicity" placeholder="New Ethnicity" />
      </form>
    )
  }
}
