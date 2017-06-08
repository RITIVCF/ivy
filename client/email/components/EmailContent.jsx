import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EmailBanner from './EmailBanner.jsx';
import EmailUpcoming from './EmailUpcoming.jsx';
import EmailBody from './EmailBody.jsx';
import EmailFooter from './EmailFooter.jsx';

export default class EmailContent extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {

      }
    };


  }

  componentWillUnmount() {

  }



  render() {
    return (
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="margin:0;padding:0;background-color:#fafafa;height:100%!important;width:100%!important">
        <tbody>
          <tr>
            <td align="center" valign="top" style="border-collapse:collapse">
              <table border="0" cellpadding="10" cellspacing="0" width="600" style="background-color:#fafafa">
                <tbody>
                  <tr>
                    <td valign="top" style="border-collapse:collapse">
                      <table border="0" cellpadding="10" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td valign="top" style="border-collapse:collapse">
                              <div style="color:#505050;font-family:Arial;font-size:10px;line-height:100%;text-align:left">
                              </div>
                            </td>
                            <td valign="top" width="190" style="border-collapse:collapse">
                              <div style="color:#505050;font-family:Arial;font-size:10px;line-height:100%;text-align:left">
                                <div style="text-align:right;color:#505050;font-family:Arial;font-size:10px;line-height:100%">
                                  <a href="#" style="color:#336699;font-weight:normal;text-decoration:underline" target="_blank" data-saferedirecturl="#">View in browser</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="600" style="border:1px solid #dddddd;background-color:#ffffff">
                <tbody>
                  <tr>
                    <td align="center" valign="top" style="border-collapse:collapse">
                      <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff;border-bottom:0">
                        <tbody>
                          <tr>
                            <td style="border-collapse:collapse;color:#202020;font-family:Arial;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle">
                              <EmailBanner />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
