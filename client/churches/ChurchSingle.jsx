import React, {Component} from 'react';
import ButtonActive from './components/ButtonActive.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';

export default class ChurchSingle extends Component {
  constructor() {
    super();
    // this.state = {
    //   editting: false
    // };
  }

  componentDidMount(){
    $('.modal').modal();
  }

  edit(event){
    event.preventDefault();
    //this.setState({editting: true});
    $('.modal').modal();
    $("#"+this.props.church._id).modal('open');
  }

  close(event){
    event.preventDefault();
    //this.setState({editting: false});
    $("#"+this.props.church._id).modal('close');
  }

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    /* <div className="panel default">
      <a href={"/churches/workspace/" + this.props.church._id}>
        <div>{this.props.church.name}</div>
        <div>{this.props.church.url}</div>
      </a>
      {this.props.showActiveBtn ?
      <ButtonActive active={this.props.church.active} cid={this.props.church._id} /> : "" }
    </div>

    <button onClick={this.close.bind(this)}>Close Edit</button>
    {/*onMouseLeave={this.close.bind(this)} */

    return (
      <div className="col s12 m6 l4">
        <div className={this.props.church.active?"card left hoverable":"card grey left hoverable"}
          onClick={this.edit.bind(this)}>
          <div className="card-image">
            <img
              src={"/images/defaultChurch.png"} style={{width: "100%"}} />
          </div>
          <div className="card-content">
            <span className="card-title">{this.props.church.name}</span>
            {/*}<p className="truncate">{this.props.church.url}</p>*/}
          </div>
        </div>





        <div id={this.props.church._id} className="modal modal-fixed-footer">
          <div className="modal-content">
            <ChurchWorkspace ch={this.props.church} />
          </div>
          <div className="modal-footer">
              <a onClick={this.close.bind(this)}
                className="modal-action modal-close waves-effect waves-blue btn-flat">Close</a>
          </div>
        </div>
      </div>
    )
  }
}
