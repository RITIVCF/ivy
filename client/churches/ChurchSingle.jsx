import React, {Component} from 'react';
import ButtonActive from './components/ButtonActive.jsx';
import ChurchesWorkspace from './ChurchesWorkspace.jsx';

export default class ChurchSingle extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };

		this.closeModal = this.closeModal.bind(this);
  }

  select(event){
    event.stopPropagation();
    Session.set("chselected",this.props.church._id);
  }

  edit(event){
    event.stopPropagation();
    this.setState({open: true});
  }

	closeModal(){
		this.setState({open: false});
	}

  render() {

    return (
      <div className="col s12 m6 l4">
        <div className={this.props.selected?
					this.props.church.isActive()?
					"card left addBorderToCard":"card left grey addBorderToCard"
				:
				this.props.church.isActive()?
					"card left"
				:"card grey left"}
          onClick={this.select.bind(this)} onDoubleClick={this.edit.bind(this)} >

          <div className="card-image">
            <img
              src={"/images/defaultChurch.png"} style={{width: "100%"}} />
          </div>
          <div className="card-content">
            <span className="card-title">{this.props.church.getName()}</span>
          </div>
        </div>
				<Modal
					open={this.state.open}
					onClose={this.closeModal}
				>
					<ChurchesWorkspace ch={this.props.church}
						onDelete={this.closeModal}
						onToggle={this.closeModal}
					/>
				</Modal>

      </div>
    )
  }
}
