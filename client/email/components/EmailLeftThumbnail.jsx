export default class EmailLeftThumbnail {
  renderHTML() {
    return (
      `<tr>
        <!-- dir=ltr is where the magic happens. This can be changed to dir=rtl to swap the alignment on wide while maintaining stack order on narrow. -->
        <td dir="ltr" bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding: 10px 0;">
          <!--[if mso]>
                      <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                      <tr>
                      <td align="center" valign="top" width="660">
                      <![endif]-->
          <table role="presentation" aria-hidden="true" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;">
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
                      <td dir="ltr" style="padding: 0 10px 10px 10px;">
                        <img src="http://placehold.it/200" aria-hidden="true" width="200" height="" border="0" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso]>
                                  </td>
                                  <td align="left" valign="top" width="440">
                                  <![endif]-->
                <div style="display:inline-block; margin: 0 -2px; max-width:66.66%; min-width:320px; vertical-align:top;" class="stack-column">
                  <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td dir="ltr" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px 10px 0; text-align: left;" class="center-on-narrow">
                        <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;">Class aptent taciti sociosqu</h2>
                        <p style="margin: 0 0 10px 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                        <!-- Button : BEGIN -->
                        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow" style="float:left;">
                          <tr>
                            <td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td">
                              <a href="http://www.google.com" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">
                                <span style="color:#ffffff;" class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;A Button&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              </a>
                            </td>
                          </tr>
                        </table>
                        <!-- Button : END -->
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
