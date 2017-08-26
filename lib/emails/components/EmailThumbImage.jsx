export default class EmailThumbImage {
  renderHTML(imgURL) {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td>
            <td bgcolor="#222222" valign="middle" style="min-width: 160px; height: 120px; width: 100%; max-width: 200px; text-align: center; background-image: url(` + imgURL + `); background-repeat: no-repeat; background-position: center center; background-size: cover;">
          </td>
        </tr>
      </table>`
    );
  }
}
