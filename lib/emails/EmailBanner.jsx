export default class EmailBanner {


  renderHTML(imgURL,content,bgcolor='#222222') {
    return (
      `<tr>
        <td background="` + imgURL + `" bgcolor="` + bgcolor + `" valign="middle" style="text-align: center; background-position: center center !important; background-size: cover !important;">
          <!--[if gte mso 9]>
                      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:680px;height:175px; background-position: center center !important;">
                      <v:fill type="tile" src="` + imgURL + `" color="` + bgcolor + `" />
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
                  <p style="margin: 0;">` + content + `</p>
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
      </tr>`
    );
  }
}
