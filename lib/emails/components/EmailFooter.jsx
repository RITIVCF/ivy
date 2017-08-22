export default class EmailFooter extends React.Component {



  renderHTML() {

    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px; background: #1a3d6d;">
        <tr>
          <td style="padding: 40px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #ffffff;" class="x-gmail-data-detectors">
            <em>Copyright © 2017 RIT InterVarsity Christian Fellowship, All rights reserved.</em></br></br>

            <strong>Our mailing address is:</strong><br/>
            <address>
            RIT InterVarsity Christian Fellowship<br/>
            Attention: InterVarsity Christian Fellowship<br/>
            1 Lomb Memorial Drive<br/>
            Rochester, NY 14623<br/><br/>

            You are receiving this&nbsp;newsletter because you signed up at one of our tables or events, or on our website.<br/><br/>

            <a href="http://localhost:3000/unsubscribe/` +
            "subid"
            + `" style="color:#ffffff; font-weight:normal; text-decoration:underline;">Unsubscribe from this list</a>

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
