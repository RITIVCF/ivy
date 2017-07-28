export default class EmailGrid {

  secondEvent(h2,c2) {
    if (h2 != "") {
      return `<div style="height: 100%; margin: 0; border: 2px dashed #FCB816; border-collapse: separate !important; padding: 5px;">
      <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 2px 2px;">
            <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left; padding: 8px 8px;">
              <tr align="center">
                <td style="padding: 0 20px;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 20px; line-height: 22px; color: #FCB816; font-weight: bold;">`
                      + h2.toUpperCase() + `
                    </h1>
                </td>
              </tr>
              <tr>
                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                  <p style="margin: 0;">` + c2 + `</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`
    }
    return ""
  }

  renderHTML(h1,c1,h2="",c2="") {
    return (
      `<tr>
        <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%">
          <!--[if mso]>
                      <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                      <tr>
                      <td align="center" valign="top" width="660">
                      <![endif]-->
          <table role="presentation" aria-hidden="true" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;">
            <tr>
              <td align="center" valign="top" style="font-size:0; padding:0;">
                <div style="display:table;">
                  <!--[if mso]>
                                    <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                                    <tr>
                                    <td align="left" valign="top" width="330">
                                    <![endif]-->
                  <div style="display:table-cell; margin: 0 -2px; height: 100%; padding: 1px; min-width:200px; max-width:324px; vertical-align:top; width:50%;" class="stack-column">
                    <div style="height: 100%; margin: 0; border: 2px dashed #FCB816; border-collapse: separate !important; padding: 5px;">
                      <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 2px 2px;">
                            <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left; padding: 8px 8px;">
                              <tr align="center">
                                <td style="padding: 0 20px;">
                                    <h1 style="margin: 0; font-family: sans-serif; font-size: 20px; line-height: 22px; color: #FCB816; font-weight: bold;">`
                                      + h1.toUpperCase() + `
                                    </h1>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                                  <p style="margin: 0;">` + c1 + `</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <!--[if mso]>
                                    </td>
                                    <td align="left" valign="top" width="330">
                                    <![endif]-->
                  <div style="display:table-cell; height: 100%; margin: 0 -2px; padding: 1px; min-width:200px; max-width:324px; vertical-align:top; width:50%;" class="stack-column">
                    ` + this.secondEvent(h2,c2) + `
                  </div>
                  <!--[if mso]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                </div>
              </td>
            </tr>
          </table>
          <!--[if mso]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
        </td>
      </tr>`
    );
  }
}
