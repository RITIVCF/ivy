import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Row from './EmailRow.jsx';

export default class EmailSummary extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      showDrafts: true,
      showStaged: true,
      showSent: true
    };


  }

  componentWillUnmount() {

  }

  toggleDrafts(){
    this.setState({showDrafts: !this.state.showDrafts});
  }

  toggleStaged(){
    this.setState({showStaged: !this.state.showStaged});
  }

  toggleSent(){
    this.setState({showSent: !this.state.showSent});
  }

  getDrafts(){
    return Emails.find({staged: false,sent: false}).fetch();
  }

  getStaged(){
    return Emails.find({staged: true,sent: false}).fetch();
  }

  getSent(){
    return Emails.find({sent: true}).fetch();
  }

  getRows(num){
    var array = [];
    for(i=0; i<=num; i++){
      array.push("");
    }
    return array;
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <h5 onClick={this.toggleDrafts.bind(this)}>
            Drafts <i className="small material-icons">{this.state.showDrafts?"expand_more":"chevron_left"}</i>
          </h5>
          <ul className={this.state.showDrafts?"collection":"collection hide-emails"}>
            {this.getDrafts().length!=0?this.getDrafts().map((email)=>{
              return <Row key={email._id} email={email} />
            }):<span style={{textAlign: "center"}}>No Drafts</span>}
          </ul>
          <h5 onClick={this.toggleStaged.bind(this)}>
            Staged<i className="small material-icons">{this.state.showStaged?"expand_more":"chevron_left"}</i>
          </h5>
          <ul className={this.state.showStaged?"collection":"collection hide-emails"}>
            {this.getStaged().length!=0?this.getStaged().map((email)=>{
              return <Row key={email._id} email={email} />
            }):<span style={{textAlign: "center"}}>No Staged</span>}
          </ul>
          <h5 onClick={this.toggleSent.bind(this)}>
            Sent Items<i className="small material-icons">{this.state.showSent?"expand_more":"chevron_left"}</i>
          </h5>
          <ul className={this.state.showSent?"collection":"collection hide-emails"}>
            {this.getSent().length!=0?this.getSent().map((email,i)=>{
              return <Row key={email} email={email} />
            }):<span style={{textAlign: "center"}}>No Sent</span>}
          </ul>
        </div>
      </div>
    )
  }
}
