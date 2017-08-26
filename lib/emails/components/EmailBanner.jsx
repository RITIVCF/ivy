export default class EmailBanner {


  renderHTML(imgURL,content,bgcolor='#222222') {
    return (
      `<tr>
        <td background="` + imgURL + `" bgcolor="` + bgcolor + `" valign="middle" style="text-align: center; background-image: url(`+ process.env.ROOT_URL +`light-bl.svg), url(`+ process.env.ROOT_URL +`light-br.svg), url(` + imgURL + `); background-repeat: no-repeat, no-repeat, no-repeat; background-position: bottom left, bottom right, center center; background-size: 12rem, 12rem, cover;">
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
                <td valign="middle" style="text-align: center; padding: 40px 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">`
                   + content +
                `</td>
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





/*

<tr>
  <td align="center" valign="top" style="background:#dff0f4 url(url) no-repeat center/cover;background-color:#dff0f4;background-image:url(url);background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:50px;padding-bottom:50px">


  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-3067508460719391949templateContainer" style="border-collapse:collapse;max-width:600px!important">
    <tbody>
      <tr>
        <td valign="top" class="m_-3067508460719391949headerContainer">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-3067508460719391949mcnImageBlock" style="min-width:100%;border-collapse:collapse">
            <tbody class="m_-3067508460719391949mcnImageBlockOuter">
              <tr>
                <td valign="top" style="padding:9px" class="m_-3067508460719391949mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-3067508460719391949mcnImageContentContainer" style="min-width:100%;border-collapse:collapse">
                    <tbody>
                      <tr>
                        <td class="m_-3067508460719391949mcnImageContent" valign="top" style="padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center">
                          <img align="center" alt="" src="url" width="360" style="max-width:360px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="m_-3067508460719391949mcnImage"></td>
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
  </td>
</tr>*/

}
