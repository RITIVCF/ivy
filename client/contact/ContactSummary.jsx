import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SubHeader from '../layouts/SubHeader.jsx';
import ContactSingle from './ContactSingle.jsx';
import ContactPreview from './ContactPreview.jsx';
import InfoBar from '../InfoBar.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
//import NewContactWrapper from './NewContactWindow.jsx';

export default class ContactSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Contacts: Meteor.subscribe("allContacts", "All", "Name"),
        Events: Meteor.subscribe("EventAttendees")
      },
      filter: ""
    };


  }

  componentWillUnmount() {
    this.state.subscription.Contacts.stop();
    this.state.subscription.Events.stop();
  }

  newContact(event){
		event.preventDefault();
  	//this.refs.newcontactoverlay.openOverlay();
    FlowRouter.go("/forms/contacts/new");
  }

  changeFilter(){
		//this.state.filter = this.refs.filter.value;
		//this.setState({filter: this.refs.filter.value});
    // //console.log("filter change");
    // //console.log(this.refs.filter.value);
    // //console.log(this.refs.sort.value);
    // this.state.subscription.Contacts.stop();
    // this.state.subscription.Contacts = Meteor.subscribe("allContacts", this.refs.filter.value, this.refs.sort.value);
    //this.setState({subscription: {Contacts: Meteor.subscribe("allContacts", this.refs.filter.value, this.refs.sort.value)}});
    let text = this.refs.filter.value;
    text = text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    this.setState({filter: text});
	}

  changeSort(){
		//this.state.sort = this.refs.sort.value;
		//this.setState({sort: this.refs.sort.value});
    //console.log("sort change");
    this.state.subscription.Contacts.stop();
    this.state.subscription.Contacts = Meteor.subscribe("allContacts", this.refs.filter.value, this.refs.sort.value);
	}

  export(){
    // var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
    // var csvContent = "data:text/csv;charset=utf-8,";
    // data.forEach(function(infoArray, index){
    //
    //    dataString = infoArray.join(",");
    //    csvContent += index < data.length ? dataString+ "\n" : dataString;
    //
    // });
    // var encodedUri = encodeURI(csvContent);
    // var link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "my_data.csv");
    // document.body.appendChild(link); // Required for FF
    //
    // link.click(); // This will download the data file named "my_data.csv".
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name, Email, Phone, Newsletter, How Hear, Status\n";
     this.contacts().forEach(function(contact){
       //console.log(contact);
       var dataString = "";
       dataString += contact.name + "," + contact.email + "," + contact.phone  + ",";
       dataString += contact.newsletter ? "Yes":"No";
       dataString += ",";
       dataString += contact.howhear ? contact.howhear:"";
       dataString += ",";
       //dataString += contact.member ? "Member":"Contact";
       dataString += contact.status
       dataString += "\n";
       csvContent += dataString;
     });
     //console.log(csvContent);
     var encodedUri = encodeURI(csvContent);
     //console.log("encoded");
     var link = document.createElement("a");
     //console.log("document created");
     //console.log(link);
     link.setAttribute("href", encodedUri);
     //console.log("href set");
     link.setAttribute("download", "All Contacts.csv");
     //console.log("filename set");
     document.body.appendChild(link); // Required for FF
     //console.log("appended");

     link.click(); // This will download the data file named "my_data.csv".
     //console.log("clicked");
  }


  contacts(){
    // if(this.state.filter == "All"){
    //   return Contacts.find({},{sort: {name: 1}}).fetch();
    // }
    // return Contacts.find({status: this.state.filter},{sort: {name: 1}}).fetch();
    if(this.state.filter!=""){
      return Contacts.find({name: { $regex : this.state.filter} },{sort: {name: 1}}).fetch();
    }
    else{
      return Contacts.find({},{sort: {name: 1}}).fetch();
    }
  }

  select(id){
    this.setState({selected: id});
  }

  unselect(){
    //this.setState({selected: ""});
    Session.set("conselected","");
  }


	render() {
    if(!this.state.subscription.Contacts.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("contacts")){
      return <NoPerm />
    }
    document.title="Ivy - Contact Dashboard";
    var status;
    var perm = checkPermission("ticket");
		return (
      <div className="row" onClick={this.unselect.bind(this)} style={{height: "100%"}}>
        <SubHeader />
          <div className="main-box col s12">
            <div className="row">
              <div className="col s12 m7 l7">
                <h1></h1>
              </div>
              <div className="input-field col s12 m5 l5">
                <input ref="filter" onChange={this.changeFilter.bind(this)} type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
              </div>
            </div>
            <div className="divider"></div>
                {/*}
                      <p>Count: {this.contacts().length}</p>
                      <p>{!this.state.subscription.Contacts.ready()?"Loading...":""}</p>*/}
                      <div className="row">
                      {Session.get("view")=="Tile"?this.contacts().map( (contact, i) => {
                        return <ContactSingle key={contact._id} row={false} contact={contact}
                          selected={Session.get("conselected")==contact._id} perm={perm}
                          select={this.select.bind(this)} parent={this}/>
                      }):
                      <table className="bordered highlight" >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Newsletter</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.contacts().map( (contact)=>{
                            return <ContactSingle key={contact._id} row={true} contact={contact}
                              selected={Session.get("conselected")==contact._id} perm={perm}
                              select={this.select.bind(this)} parent={this}/>
                          })}
                        </tbody>
                      </table>
                      }
                      </div>

          </div>
          <InfoBar content={<ContactPreview cid={Session.get("conselected")} />} />
          </div>


  )
	}
}
