import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Checkbox from '../Checkbox.jsx';


export default class ContactFilter extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      statuses: ["Contact", "Crowd","Visitor","Member","Server","Leader","Multiplier"],
      filter: "",
      num: 10
    };

  }

  changeFilter(){
    let text = this.refs.filter.value;
    text = text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    Session.set("contactstatusfiltertext", text);
	}

  handleCheck(id){
    var array = Session.get("contactstatusfilter");
    if(array.includes(id)){
        array.splice(array.indexOf(id), 1);
    }else{
        array.push(id);
    }
    Session.set("contactstatusfilter", array);
  }

	render() {
    const statuses = Session.get("contactstatusfilter");
		return (
      <div className="row">
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
			</div>
  )
	}
}
