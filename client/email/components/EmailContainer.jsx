import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import EmailHeader from './EmailHeader.jsx';
import EmailBody from './EmailBody.jsx';
import EmailFooter from './EmailFooter.jsx';

export default class EmailContainer {
  constructor(){

    this.EmailHeader = new EmailHeader();
    this.EmailBody = new EmailBody();
    this.EmailFooter = new EmailFooter();

  }

  getEmailTitle() {
    return "title";
  }

  renderHTML() {

    return (
      `<!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>` + this.getEmailTitle() + `</title>

        <!-- Web Font / @font-face : BEGIN -->
        <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

        <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
        <!--[if mso]>
              <style>
                  * {
                      font-family: sans-serif !important;
                  }
              </style>
          <![endif]-->

        <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
        <!--[if !mso]><!-->
        <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
        <!--<![endif]-->

        <!-- Web Font / @font-face : END -->

        <!-- CSS Reset -->
        <style>

          html,
          body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
          }

          * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }

          div[style*="margin: 16px 0"] {
            margin: 0 !important;
          }

          table,
          td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
          }

          table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
          }

          table table table {
            table-layout: auto;
          }

          img {
            -ms-interpolation-mode: bicubic;
          }

          *[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
          }

          .x-gmail-data-detectors,
          .x-gmail-data-detectors *,
          .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
          }

          .a6S {
            display: none !important;
            opacity: 0.01 !important;
          }

          img.g-img+div {
            display: none !important;
          }

          .button-link {
            text-decoration: none !important;
          }

          @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            .email-container {
              min-width: 375px !important;
            }
          }
        </style>

        <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->

        <!-- Progressive Enhancements -->
        <style>

          .button-td,
          .button-a {
            transition: all 100ms ease-in;
          }

          .button-td:hover,
          .button-a:hover {
            background: #555555 !important;
            border-color: #555555 !important;
          }

          @media screen and (max-width: 480px) {

            .fluid {
              width: 100% !important;
              max-width: 100% !important;
              height: auto !important;
              margin-left: auto !important;
              margin-right: auto !important;
            }

            .stack-column,
            .stack-column-center {
              display: block !important;
              width: 100% !important;
              max-width: 100% !important;
              direction: ltr !important;
            }

            .stack-column-center {
              text-align: center !important;
            }

            .center-on-narrow {
              text-align: center !important;
              display: block !important;
              margin-left: auto !important;
              margin-right: auto !important;
              float: none !important;
            }
            table.center-on-narrow {
              display: inline-block !important;
            }

            .email-container p {
              font-size: 17px !important;
              line-height: 22px !important;
            }
          }
        </style>

      </head>

      <body width="100%" bgcolor="#222222" style="margin: 0; mso-line-height-rule: exactly;">
        <center style="width: 100%; background: #222222; text-align: left;">

          <!-- Visually Hidden Preheader Text : BEGIN -->
          <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
            (Optional) This text will appear in the inbox preview, but not the email body.
          </div>
          <!-- Visually Hidden Preheader Text : END -->

          <div style="max-width: 680px; margin: auto;" class="email-container">
            <!--[if mso]>
                  <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
                  <tr>
                  <td>
                  <![endif]-->`
                  + this.EmailHeader.renderHTML()
                  + this.EmailBody.renderHTML()
                  + this.EmailFooter.renderHTML() +
            `<!--[if mso]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
          </div>
        </center>
      </body>
    </html>`

    )
  }
}
