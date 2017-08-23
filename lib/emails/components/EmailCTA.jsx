export default class EmailCTA {
  constructor() {

    this.setButtonColor("#1A3D6D")
    this.setBackgroundColor("#ffffff")

  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
  }

  setButtonColor(color) {
    this.buttonColor = color;
  }

  renderHTML(btnText,btnTarget) {
    return (
    `<tr>
      <td bgcolor="#ffffff">
        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tbody>
            <tr>
              <td style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
                  <tr>
                    <td style="border-radius: 3px; background: ` + this.buttonColor + `; text-align: center;" class="button-td">
                      <a href="` + btnTarget + `" style="background: ` + this.buttonColor + `; border: 15px solid ` + this.buttonColor + `; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">
                        <span style="color:#ffffff;" class="button-link">` + btnText + `</span>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>`
    );
  }
}
