export default class EmailCTA {
  renderHTML() {
    return (
      `<tr>
        <td bgcolor="#ffffff">
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 40px 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;">Praesent laoreet malesuada&nbsp;cursus.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: center;">
                <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere.
                  Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <!-- Button : BEGIN -->
                <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
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
        </td>
      </tr>`
    );
  }
}
