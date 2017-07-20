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
    return Emails.find({status: "draft"}).fetch();
  }

  getStaged(){
    return Emails.find({status: "staged"}).fetch();
  }

  getSent(){
    return Emails.find({status: "sent"}).fetch();
  }

  getRows(num){
    var array = [];
    for(i=0; i<=num; i++){
      array.push("");
    }
    return array;
  }

  render() {
		let drafts = this.getDrafts();
		let staged = this.getStaged();
		let sent = this.getSent();
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <h5 onClick={this.toggleDrafts.bind(this)}>
                <a className="btn-flat" style={{padding: 0}}><i className="small material-icons">{this.state.showDrafts?"expand_more":"chevron_right"}</i></a> Drafts
              </h5>
              <ul style={drafts.length==0?{textAlign: "center"}:{}} className={this.state.showDrafts?"collection":"collection hide-emails"}>
                {drafts.length!=0?this.getDrafts().map((email)=>{
                  return <Row key={email._id} email={email} isSelected={Session.get("selectedEmail")==email._id} />
                }):<span>No Drafts</span>}
              </ul>
              <h5 onClick={this.toggleStaged.bind(this)}>
                <a className="btn-flat" style={{padding: 0}}><i className="small material-icons">{this.state.showStaged?"expand_more":"chevron_right"}</i></a> Staged
              </h5>
              <ul style={staged.length==0?{textAlign: "center"}:{}} className={this.state.showStaged?"collection":"collection hide-emails"}>
                {staged.length!=0?this.getStaged().map((email)=>{
                  return <Row key={email._id} email={email} isSelected={Session.get("selectedEmail")==email._id} />
                }):<span style={{textAlign: "center"}}>No Staged</span>}
              </ul>
              <h5 onClick={this.toggleSent.bind(this)}>
                <a className="btn-flat" style={{padding: 0}}><i className="small material-icons">{this.state.showSent?"expand_more":"chevron_right"}</i></a> Sent Items
              </h5>
              <ul style={sent.length==0?{textAlign: "center"}:{}} className={this.state.showSent?"collection":"collection hide-emails"}>
                {sent.length!=0?this.getSent().map((email,i)=>{
                  return <Row key={email} email={email} isSelected={Session.get("selectedEmail")==email._id} />
                }):<span style={{textAlign: "center"}}>No Sent</span>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
