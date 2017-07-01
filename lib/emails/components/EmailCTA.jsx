export default class EmailCTA {
  constructor() {

    this.setButtonColor("#FCB816")
    this.setBackgroundColor("#ffffff")

  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
  }

  setButtonColor(color) {
    this.buttonColor = color;
  }





  renderHTML(heading,content,btnText,btnTarget) {
    return (
      `<tr>
        <td bgcolor="` + this.backgroundColor + `">
          <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 40px 40px 20px; text-align: center;">
                  <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;">` + heading + `</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: center;">
                <p style="margin: 0;">` + content + `</p>
              </td>
            </tr>
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
              </td>
            </tr>

          </table>
        </td>
      </tr>`
    );
  }
}
