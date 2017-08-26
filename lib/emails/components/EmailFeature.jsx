export default class EmailFeature {
  renderHTML(imgURL,heading,content) {
    let headingStr = "";
    if (heading != "") {
      headingStr = `<tr align="center">
        <td style="padding: 0 10px;">
            <h1 style="margin: 0; font-family: sans-serif; font-size: 20px; line-height: 22px; color: #FCB816; font-weight: bold;">` + heading.replace("\n","</br>").toUpperCase() + `</h1>
        </td>
      </tr>`;
    }
    return (
      `<tr class="module" content="cta">
        <td bgcolor="#ffffff">
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;">`
          + headingStr +
          `
            <tr>
              <td bgcolor="#222222" valign="middle" style="height: 200px; text-align: center; background-image: url(` + imgURL + `); background-repeat: no-repeat; background-position: center center; background-size: cover;"></td>
            </tr>
            <tr>
              <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: justify;">
                <p style="margin: 0 0 10px 0;">` + content + `</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    );
  }
}
