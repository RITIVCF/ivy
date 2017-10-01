import React, {Component} from 'react';
import GroupWorkspace from './GroupWorkspace.jsx';
import EditGroupModal from './EditGroupModal.jsx';

export default class GroupsSingle extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };

		this.handleCloseModal = this.handleCloseModal.bind(this);

  }

  componentDidMount(){
    $('select').material_select();
  }

  edit(event){
    event.preventDefault();
    this.setState({open: true});
  }

	handleCloseModal(){
		this.setState({open: false});
	}

  getMembers(){
    return Meteor.users.find({_id: {$in: this.props.group.users}}).fetch();
  }

  getLeaders(){
    let leaderstring = "";
    let leaders = Meteor.users.find({_id: {$in: this.props.group.leader}}).fetch();
    leaderstring = leaders[0].name;
    for (var i = 1; i < leaders.length; i++) {
      leaderstring = leaderstring + ', ' + leaders[i].name;
    }
    return leaderstring;
  }

  render() {
    let isSG = this.props.group.type=="Small Group"||this.props.group.type=="Team";
    return (
      <div className="col s12 m6 l4">
        <div className={this.props.selected?"card left hoverable addBorderToCard":"card left"}
          style={{width: "100%"}} onClick={this.edit.bind(this)}>
          <div className="card-content">
            <span className="card-title">{this.props.group.name}</span>
            <p>{isSG&&<b>Leader:</b>}&nbsp;{isSG&&this.getLeaders()}</p>

          </div>
        </div>
				<Modal
					open={this.state.open}
					onClose={this.handleCloseModal}
				>
					<EditGroupModal
						group={this.props.group}
						onClose={this.handleCloseModal}
					/>
				</Modal>
      </div>

    )
  }
}
