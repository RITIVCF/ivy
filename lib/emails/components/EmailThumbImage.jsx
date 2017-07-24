export default class EmailThumbImage {
  renderHTML(imgURL) {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td>
            <img src="`+ imgURL + `" aria-hidden="true" width="200" border="0" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
          </td>
        </tr>
      </table>`
    );
  }
}
