export default class EmailDetails{
  renderHTML(date, location="") {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #7c8081;">
        <tr valign="middle">
        <td class="colsplit" align="left" valign="middle" style="padding:0 10px 0 0; display: inline-block;">
          <img src="http://ivy.rit.edu/icons/calendar.png" aria-hidden="true" width="16" height="16" border="0" alt="&#128197;" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;">` + formatDate(date) + `</td>
        <td class="colsplit" align="left" valign="middle" style="padding:0 10px 0 0; display: inline-block;">
          <img src="http://ivy.rit.edu/icons/clock-o.png" aria-hidden="true" width="16" height="16" border="0" alt="&#128337;" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;">` + formatTime(date) + `</td>
        <td class="colsplit" align="left" valign="middle" style="padding:0 10px 0 0; display: inline-block;">
          <img src="http://ivy.rit.edu/icons/globe.png" aria-hidden="true" width="16" height="16" border="0" alt="&#127759;" style="width: 16px; height: 16px; vertical-align: middle; font-family: sans-serif; font-size: 16px; line-height: 20px; color: #555555; padding:2px 6px 4px 0;">` + location + `</td>
        </tr>
      </table>`
    );
  }
}
