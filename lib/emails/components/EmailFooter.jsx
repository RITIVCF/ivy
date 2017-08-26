export default class EmailFooter extends React.Component {



  renderHTML(uid) {
    console.log("footer says: ", uid);
    return (
      `<table  role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" bgcolor="#ffffff" border="0" align="center" width="100%" style="max-width: 680px; background: #1a3d6d;">
        <tr><td>
          <table  role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" bgcolor="#ffffff" border="0" align="center" width="100%" style="max-width: 400px; margin: 10px auto !important; background: #1a3d6d;">
            <tr align="center">
              <td width="20%" align="center" style="text-align:center; max-width:40px;">
                <a href="http://www.facebook.com/ritivcf">
                  <img src="`+ process.env.ROOT_URL +`icons/facebook-f_white.png" aria-hidden="true" width="16" height="16" border="0" alt="facebook-f" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
                </a>
              </td>
              <td width="20%" align="center" style="text-align:center; max-width:40px;">
                <a href="http://www.instagram.com/ritivcf/?hl=en">
                  <img src="`+ process.env.ROOT_URL +`icons/instagram_white.png" aria-hidden="true" width="16" height="16" border="0" alt="instagram" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
                </a>
              </td>
              <td width="20%" align="center" style="text-align:center; max-width:40px;">
                <a href="mailto:ivcf@rit.edu">
                  <img src="`+ process.env.ROOT_URL +`icons/envelope_white.png" aria-hidden="true" width="16" height="16" border="0" alt="email" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
                </a>
              </td>
              <td width="20%" align="center" style="text-align:center; max-width:40px;">
                <a href="http://www.twitter.com/ritivcf">
                  <img src="`+ process.env.ROOT_URL +`icons/twitter_white.png" aria-hidden="true" width="16" height="16" border="0" alt="twitter" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
                </a>
              </td>
              <td width="20%" align="center" style="text-align:center; max-width:40px;">
                <a href="http://ivcf.rit.edu/">
                  <img src="`+ process.env.ROOT_URL +`icons/link_white.png" aria-hidden="true" width="16" height="16" border="0" alt="website" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;" />
                </a>
              </td>
            </tr>
          </table>
        </td></tr>
    </table>
      <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px; background: #1a3d6d;">
        <tr>
          <td style="padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #ffffff;" class="x-gmail-data-detectors">
            <em>Copyright © 2017 RIT InterVarsity Christian Fellowship, All rights reserved.</em></br></br>

            <strong>Our mailing address is:</strong><br/>
            <address>
            RIT InterVarsity Christian Fellowship<br/>
            Attention: InterVarsity Christian Fellowship<br/>
            1 Lomb Memorial Drive<br/>
            Rochester, NY 14623<br/><br/>

            You are receiving this&nbsp;newsletter because you signed up at one of our tables or events, or on our website.<br/><br/>

            <a href="`+ process.env.ROOT_URL +`unsubscribe/` + uid + `" style="color:#ffffff; font-weight:normal; text-decoration:underline;">Unsubscribe from this list</a>

          </td>
        </tr>
      </table>`
    );
  }
}



/*

<td valign="top" class="m_1827599821276497627mcnTextContent" style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#ffffff;font-family:Helvetica;font-size:12px;line-height:150%;text-align:center">

refressh

*/
