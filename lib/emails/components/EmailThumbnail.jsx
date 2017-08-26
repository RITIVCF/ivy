export default class EmailThumbnail {

  renderDetails() {



  }




  renderHTML(direction,heading,content,thumbnail) {
    let headingStr = "";
    if (heading != "") {
      headingStr = `<tr align="center">
        <td style="padding: 0 10px;">
            <h1 style="margin: 0; font-family: sans-serif; font-size: 20px; line-height: 22px; color: #FCB816; font-weight: bold;">` + heading.replace("\n","</br>").toUpperCase() + `</h1>
        </td>
      </tr>`;
    }
    return (
      `<tr class="module" content="thumbnail">
        <td dir="` + direction + `" bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding: 10px 0;">
          <!--[if mso]>
                      <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                      <tr>
                      <td align="center" valign="top" width="660">
                      <![endif]-->
          <table role="presentation" aria-hidden="true" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;">
            ` + headingStr + `
            <tr>
              <td align="center" valign="top" style="font-size:0; padding: 10px 0;">
                <!--[if mso]>
                                  <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                                  <tr>
                                  <td align="left" valign="top" width="220">
                                  <![endif]-->
                <div style="display:inline-block; margin: 0 -2px; max-width: 200px; min-width:160px; vertical-align:top; width:100%;" class="stack-column">
                  <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td dir="ltr" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #7c8081; padding: 0 10px 10px 10px; text-align: left;" class="center-on-narrow">
                        <p style="margin: 0 0 10px 0;">`+ thumbnail + `</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso]>
                                  </td>
                                  <td align="left" valign="top" width="440">
                                  <![endif]-->

                <div style="display:inline-block; margin: 0 -2px; max-width:66.66%; min-width:200px; vertical-align:top;" class="stack-column">
                  <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td dir="ltr" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #7c8081; padding: 0 10px 10px 10px; text-align: left;" class="center-on-narrow">
                        <p style="margin: 0 0 10px 0;">` + content + `</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso]>
                                  </td>
                                  </tr>
                                  </table>
                                  <![endif]-->
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

//<img src="http://placehold.it/200" aria-hidden="true" width="200" height="" border="0" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #7c8081;">
