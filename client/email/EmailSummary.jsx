import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailSummary extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {

      }
    };


  }

  componentWillUnmount() {

  }

  getDrafts(){
    return Emails.find({staged: false,sent: false}).fetch();
  }

  getStaged(){
    return Emails.find({staged: true,sent: false}).fetch();
  }

  getSent(){
    return Emails.find({sent: true}).fetch();
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>To</th>
                <th>From</th>
                <th>Template</th>
                <th>When</th>
              </tr>
            </thead>
          </table>
          <table className="bordered striped">
            <thead>
              <tr>
                <th colSpan="5">Drafts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subject 1</td>
                <td>To 1</td>
                <td>From 1</td>
                <td>Template 1</td>
                <td>When 1</td>
              </tr>
              <tr>
                <td>Subject 1</td>
                <td>To 1</td>
                <td>From 1</td>
                <td>Template 1</td>
                <td>When 1</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan="5">Staged</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{textAlign: "center"}}>No Staged</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan="5">Sent Items</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subject 1</td>
                <td>To 1</td>
                <td>From 1</td>
                <td>Template 1</td>
                <td>When 1</td>
              </tr>
              <tr>
                <td>Subject 1</td>
                <td>To 1</td>
                <td>From 1</td>
                <td>Template 1</td>
                <td>When 1</td>
              </tr>
              <tr>
                <td>Subject 1</td>
                <td>To 1</td>
                <td>From 1</td>
                <td>Template 1</td>
                <td>When 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
