export default class EmailThumbImage {
  renderHTML(imgURL) {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td>
            <img src="http://placehold.it/200" aria-hidden="true" width="200" height="100" border="0" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 200px; height: 100px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
          </td>
        </tr>
      </table>`
    );
  }
}
