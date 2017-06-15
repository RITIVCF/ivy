export default class EmailText {
  renderHTML(heading,content) {
    return (
      `<tr>
        <td bgcolor="#ffffff">
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;">` + heading + `</h1>
                <p style="margin: 0 0 10px 0;">` + content + `</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    );
  }
}
