export default class EmailBanner {
  renderHTML() {
    return (
      `<tr>
        <!-- Bulletproof Background Images c/o https://backgrounds.cm -->
        <td background="http://placehold.it/680x230/222222/666666" bgcolor="#222222" valign="middle" style="text-align: center; background-position: center center !important; background-size: cover !important;">
          <!--[if gte mso 9]>
                      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:680px;height:175px; background-position: center center !important;">
                      <v:fill type="tile" src="http://placehold.it/680x230/222222/666666" color="#222222" />
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
                  <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere.
                    Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
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
