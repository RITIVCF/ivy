import React, {Component} from 'react';

export default class Contact extends Component {
  remove(event){
    event.preventDefault();
    this.props.ch.removeContact(this.props.contact._id);
    
  }


  render(){
    let contact = this.props.contact;
    return (
      <tr>
        <td>{contact.getName()}</td>
        <td>{contact.getEmail()}</td>
        <td><i className="material-icons right">close</i></td>
      </tr>
    )
    // return(
    //   <div className="col s12 m6 l4">
    //     <div className="card-panel left">
    //       <div className="card-content">
    //         <span className="card-title">{this.props.contact.name}</span>
    //         <p>{this.props.contact.emails[0].address}</p>
    //       </div>
    //       <div className="card-action">
    //           <a className="waves-effect waves-light btn red"
    //             onClick={this.remove.bind(this)}>Remove</a>
    //         </div>
    //     </div>
    //   </div>
    // )
  }
}
