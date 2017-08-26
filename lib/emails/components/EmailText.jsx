export default class EmailText {
  renderHTML(heading,content) {
    let contentStr = "";
    if (content.includes("`")) {
      contentStr = `
            <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: justify; vertical-align: top;" class="center-on-narrow stack-column">
              <div style="padding: 2px 20px;">
                `+ content.split('`')[0] +`
              </div>
            </td>
            <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: justify; vertical-align: top;" class="center-on-narrow stack-column">
              <div style="padding: 2px 20px;">
                `+ content.split('`')[1] +`
              </div>
            </td>`
    } else {
      contentStr = `<td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: justify;">
        <p style="margin: 0 0 10px 0;">` + content + `</p>
      </td>`
    }
    let headingStr = "";
    if (heading != "") {
      headingStr = `<tr align="center">
        <td style="padding: 0 10px;">
            <h1 style="margin: 0; font-family: sans-serif; font-size: 20px; line-height: 22px; color: #FCB816; font-weight: bold;">` + heading.replace("\n","</br>").toUpperCase() + `</h1>
        </td>
      </tr>`;
    }
    return (
      `<tr class="module" content="text">
        <td bgcolor="#ffffff">
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
            ` + headingStr + `
          </table>
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              ` + contentStr + `
            </tr>
          </table>
        </td>
      </tr>`
    );
  }
}
