import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailHeader {
  getBannerImageURL() {
    return "https://img42.com/RNodv+"
    //return "http://localhost:3000/images/emailbanner.png";
  }

  renderHTML() {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;">
        <tr>
          <td style="text-align: center">
            <img src="` + this.getBannerImageURL() + `" aria-hidden="true" width="680" height="" alt="alt_text" border="0" align="center" class="fluid" style="width: 100%; max-width: 680px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;"
              class="g-img">
          </td>
        </tr>
      </table>`
    );
  }
}
