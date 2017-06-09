import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailFooter extends React.Component {
  render() {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;">
        <tr>
          <td style="padding: 40px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;" class="x-gmail-data-detectors">
            <webversion style="color:#cccccc; text-decoration:underline; font-weight: bold;">View as a Web Page</webversion>
            <br><br> Company Name<br>123 Fake Street, SpringField, OR, 97477 US<br>(123) 456-7890
            <br><br>
            <unsubscribe style="color:#888888; text-decoration:underline;">unsubscribe</unsubscribe>
          </td>
        </tr>
      </table>`
    );
  }
}
