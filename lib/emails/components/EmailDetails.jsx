export default class EmailDetails{
  renderHTML(date, location="", email="") {

    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #7c8081;">
        <tr valign="top">
          <td>&#128197;</td>
          <td style="padding: 0 0 0 5px; text-align: left;">` + formatDate(date) + `</td>
        </tr>
        <tr valign="top">
          <td>&#128337;</td>
          <td style="padding: 0 0 0 5px; text-align: left;">` + formatTime(date) + `</td>
        </tr>
        <tr valign="top">
          <td>&#127759;</td>
          <td style="padding: 0 0 0 5px; text-align: left;">` + location + `</td>
        </tr>
        <tr valign="top">
          <td>&#128231;</td>
          <td style="padding: 0 0 0 5px; text-align: left;">` + email + `</td>
        </tr>
      </table>`
    );
  }
}
