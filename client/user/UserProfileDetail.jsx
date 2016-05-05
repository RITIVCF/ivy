import React, {Component} from 'react';

export default class UserProfileDetail extends Component {
  updateName(event){
    event.preventDefault();
    var text= this.refs.userdetail.value.trim();
    Meteor.call('updateName', text);
    console.log(text);
    this.state.value = text;
  }

  render() {
    console.log(this.props.userdetail);
    console.log(this.props.userdetail.profile.name);
    return (
      <div>
        <div class="header">
          <h1>My Profile</h1>
        </div>
        <div class="row">
          <div class="c 6">
            <form>
              <input
                type="text"
                ref="userdetail"
                onChange={this.updateName.bind(this)}
                value={this.props.userdetail.profile.name}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
