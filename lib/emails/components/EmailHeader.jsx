import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailHeader {
  getBannerImageURL() {
    return process.env.ROOT_URL + "email/biblebanner.jpg";
  }

  renderHTML() {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;">
        <tr>
          <td bgcolor="#222222" valign="middle" style="text-align: center; background-image: url(`+ process.env.ROOT_URL +`light-bl.svg), url(`+ process.env.ROOT_URL +`light-br.svg), url(` + this.getBannerImageURL() + `); background-repeat: no-repeat, no-repeat, no-repeat; background-position: bottom left, bottom right, center center; background-size: 12rem, 12rem, cover;">
            <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:680px;height:175px; background-position: center center !important;">
                        <v:fill type="tile" src="` + this.getBannerImageURL() + `" color="#222222" />
                        <v:textbox inset="0,0,0,0">
                        <![endif]-->
            <div>
              <!--[if mso]>
                            <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="500">
                            <tr>
                            <td align="center" valign="top" width="500">
                            <![endif]-->
              <table role="presentation" aria-hidden="true" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:500px; margin: auto;">
                <tr>
                  <td valign="middle" style="text-align: center; padding: 40px 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0"  style="min-width:100%;border-collapse:collapse">
                      <tbody>
                        <tr>
                          <td valign="top" style="text-align:center;background-color:#ffffff;background-color:rgba(255,255,255,0.8);">
                            <img align="center" alt="" src="`+ process.env.ROOT_URL +`images/ivcflogo.png" width="100%" style="max-width:360px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if mso]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
            </div>
            <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
          </td>
        </tr>
      </table>
      <table  role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" bgcolor="#ffffff" border="0" align="center" width="100%" style="max-width: 680px; background: #ffffff;">
        <tr><td>
        <table  role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" bgcolor="#ffffff" border="0" align="center" width="100%" style="max-width: 400px; margin: 10px auto !important; background: #ffffff;">
          <tr align="center">
            <td width="20%" align="center" style="text-align:center; max-width:40px;">
              <a href="http://www.facebook.com/ritivcf">
                <img src="`+ process.env.ROOT_URL +`icons/facebook-f_ivblue.png" aria-hidden="true" width="16" height="16" border="0" alt="facebook-f" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
              </a>
            </td>
            <td width="20%" align="center" style="text-align:center; max-width:40px;">
              <a href="http://www.instagram.com/ritivcf/?hl=en">
                <img src="`+ process.env.ROOT_URL +`icons/instagram_ivblue.png" aria-hidden="true" width="16" height="16" border="0" alt="instagram" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
              </a>
            </td>
            <td width="20%" align="center" style="text-align:center; max-width:40px;">
              <a href="mailto:ivcf@rit.edu">
                <img src="`+ process.env.ROOT_URL +`icons/envelope_ivblue.png" aria-hidden="true" width="16" height="16" border="0" alt="email" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
              </a>
            </td>
            <td width="20%" align="center" style="text-align:center; max-width:40px;">
              <a href="http://www.twitter.com/ritivcf">
                <img src="`+ process.env.ROOT_URL +`icons/twitter_ivblue.png" aria-hidden="true" width="16" height="16" border="0" alt="twitter" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
              </a>
            </td>
            <td width="20%" align="center" style="text-align:center; max-width:40px;">
              <a href="http://ivcf.rit.edu/">
                <img src="`+ process.env.ROOT_URL +`icons/link_ivblue.png" aria-hidden="true" width="16" height="16" border="0" alt="website" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
              </a>
            </td>
          </tr>
        </table>
        </td></tr>
      </table>

      `
    );
  }
}
