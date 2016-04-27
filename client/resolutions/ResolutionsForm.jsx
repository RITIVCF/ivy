import React, {Component} from 'react';

export default class ResolutionsForm extends Component {

    addResolution(event) {
        event.preventDefault();
        console.log(this);
        var text = this.refs.resolution.value.trim();

        Meteor.call('addResolution', text, ()=>{
          this.refs.resolution.value="";
        });

        console.log(text);
    }

    render () {
        return (
            <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
                <input
                    type="text"
                    ref="resolution"
                    placeholder="Enter Resolution Here"
                />
            </form>
            )
    }

}
