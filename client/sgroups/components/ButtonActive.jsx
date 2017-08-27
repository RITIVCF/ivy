import React, {Component} from 'react';



export default class ButtonActive extends Component {

  toggleActiveSG(event){
		event.preventDefault();
		Meteor.call("toggleActiveSG", this.props.gid, this.props.active);
	}

  render(){
    return(
      <div>
				{this.props.active ?
					<button
						onClick={this.toggleActiveSG.bind(this)}
						ref="togglePublish"
						value={true} >
						Make Inactive
					</button>
        :
        <button
          ref="togglePublish"
          onClick={this.toggleActiveSG.bind(this)}
          value={false} >
          Make Active
        </button>
				}
			</div>
    )
  }
}
