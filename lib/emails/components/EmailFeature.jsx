export default class EmailFeature {
  renderHTML(imgURL,heading,content) {
    return (
      `<tr>
        <td style="padding: 40px 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;">` + heading + `</h1>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff">
          <img src="` + imgURL + `" aria-hidden="true" width="680" height="" alt="alt_text" border="0" align="center" class="fluid" style="width: 100%; max-width: 680px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="g-img">
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff">
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <p style="margin: 0 0 10px 0;">` + content + `</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    );
  }
}