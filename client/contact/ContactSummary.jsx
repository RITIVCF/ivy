import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ContactSingle from './ContactSingle.jsx';
import Checkbox from './Checkbox.jsx';
//import NewContactWrapper from './NewContactWindow.jsx';

export default class ContactSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      statuses: ["Crowd","Visitor","Member","Server","Leader","Multiplier"],
      filter: "",
      num: 10
    };

    if(Session.get("contactstatusfilter")===undefined){
      Session.set("contactstatusfilter",this.state.statuses);
    }


  }

  componentDidMount(){
    var thiz = this;
    $("#mainbox").scroll(function() {
      console.log("---------------------------------------------");
      console.log("Window-height: ", $(window).height());
      console.log("Mainbox-scrollTop: ", $("#mainbox").scrollTop());
      console.log("Document-height: ", $(document).height());
      console.log("Mainbox-height: ", $("#mainbox").height());
      console.log("scrollbox-scrollTop: ", $("#scrollbox").scrollTop());
      console.log("scrollbox-height: ", $("#scrollbox").height());
      var scrollboxHeight = $("#scrollbox").height();
      var mainboxscrollTop = $("#mainbox").scrollTop();
      console.log("(scrollbox-height)-(mainbox-scrollTop)", parseInt(scrollboxHeight)-parseInt(mainboxscrollTop));
      if((scrollboxHeight-mainboxscrollTop) < $("#mainbox").height()) {
        thiz.setState({num: thiz.state.num+20});
      }

    });
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
       dataString += contact.name + "," + contact.emails[0].address + "," + contact.phone  + ",";
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
    // if(this.state.filter!=""){
    //   return Contacts.find({name: { $regex : this.state.filter} },{sort: {name: 1}}).fetch();
    // }
    // else{
    //   return Contacts.find({},{sort: {name: 1}}).fetch();
    // }{$regex:this.state.textfilter, $options : 'i'}
    var query= {status: {$in: Session.get("contactstatusfilter")}};
    query.deleted = {$ne: true};
    let options = {sort: {name: 1}, limit: this.state.num};
    if(this.state.filter!=""){
      query.name={ $regex : this.state.filter, $options : 'i'};
    }

    return Meteor.users.find(query,options).fetch();
  }

  select(id){
    this.setState({selected: id});
  }

  handleCheck(id){
    var array = Session.get("contactstatusfilter");
    console.log(array);
    if(array.includes(id)){
        array.splice(array.indexOf(id), 1);
    }else{
        array.push(id);
    }
    Session.set("contactstatusfilter", array);
    // var state = {};
    // state[id]=!this.state[id];
    // this.setState(state);
  }

  unselect(){
    //this.setState({selected: ""});
    Session.set("conselected","");
  }




	render() {
    let perm = this.props.perm;
    let statuses = Session.get("contactstatusfilter");
		return (
      <div className="row" onClick={this.unselect.bind(this)} style={{height: "100%"}}>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col s12 m7 l7">

                    <p>Status Filter:
                    {this.state.statuses.map((status)=>{
                      return <Checkbox key={status}
                                        label={status}
                                        onChange={this.handleCheck.bind(this, status)}
                                        checked={statuses.includes(status)} />
                    })}
                  </p>
                  </div>
              <div className="input-field col s12 m5 l5">
                <input ref="filter" onChange={this.changeFilter.bind(this)} type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
              </div>
            </div>
          </div>
        </div>

                {/*}
                      <p>Count: {this.contacts().length}</p>
                      <p>{!this.state.subscription.Contacts.ready()?"Loading...":""}</p>*/}
                <div className="row" id="scrollbox">
                {Meteor.user().preferences.contacts_view=="Tile"?this.contacts().map( (contact, i) => {
                  return <ContactSingle key={contact._id} row={false} contact={contact}
                    selected={Session.get("conselected")==contact._id} perm={perm}
                    select={this.select.bind(this)} parent={this}/>
                }):
                <div className="card">
                    <table className="bordered highlight responsive-table" >
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
                </div>
                }
                </div>
          </div>


  )
	}
}
