import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitiesForm from './EthnicitiesForm.jsx';
import EthnicitySelect from './EthnicitySelect.jsx';


Ethnicities = new Mongo.Collection("ethnicities");

export default class EthnicityWrapper extends TrackerReact(React.Component) {
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
                    return <EthnicitySelect key={ethnicity._id} ethnicity={ethnicity} />
                })}
            </select>
		</div>
		)
	}
}
