import React, {Component} from 'react';


export default class SelectContactForm extends Component {
  selectContact(event){
    event.preventDefault();
    console.log(this);


    //Meteor.call('addMember');
    }

    render() {
      return (
        <div>
        <h1>Select Contact</h1>
        <h2>Type your name and select from drop down menu:</h2>
        <form className="publicForm" onSubmit={this.selectContact.bind(this)}>
          <input type="text" ref="name" />
          <input type="submit"></input>
        </form>
        <a href="/about"><button>Cancel</button></a>
      </div>
      )
    }
  }
