import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitiesForm from './EthnicitiesForm.jsx';
import EthnicitySingle from './ethnicitysingle.jsx';


Ethnicities = new Mongo.Collection("ethnicities");

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
	ethnicities() {
		return Ethnicities.find().fetch();
	}

	render() {

		return (
		<div>
			<h1>Ethnicities</h1>
            <EthnicitiesForm />
						<select className="ethnicities">
                {this.ethnicities().map( (ethnicity)=>{
                    return <EthnicitySingle key={ethnicity._id} ethnicity={ethnicity} />
                })}
            </select>
		</div>
		)
	}
}
