import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import EmailBanner from './EmailBanner.jsx';
import EmailCTA from './EmailCTA.jsx';
import EmailFeature from './EmailFeature.jsx';
import EmailGrid from './EmailGrid.jsx';
import EmailThumbnail from './EmailThumbnail.jsx';
import EmailSocialMedia from './EmailSocialMedia.jsx';
import EmailText from './EmailText.jsx';

export default class EmailBody {
  constructor(){

    //sdaf

    this.EmailBanner = new EmailBanner();
    this.EmailCTA = new EmailCTA();
    this.EmailFeature = new EmailFeature();
    this.EmailGrid = new EmailGrid();
    this.EmailThumbnail = new EmailThumbnail();
    this.EmailSocialMedia = new EmailSocialMedia();
    this.EmailText = new EmailText();

  }

  constructBody(modules) {
		let bodyHTML = "";
    console.log(modules);
		modules.forEach( (module) => {
      switch (module.type) {
        case "intro":
          bodyHTML = bodyHTML + this.EmailText.renderHTML("Heading",module.desc);
          break;
        default:
          bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML("rtl","Default");
      }

		});
    return bodyHTML;
  }

  testBody() {
    // Test of email template
    return(
      this.EmailBanner.renderHTML("http://localhost:3000/images/defaultEventSmall.png","This is some content","#777777") +
      this.EmailCTA.renderHTML("Loooooooonngggggeerrrr Spaces Heading","Lorem ipsum adsf;lkjas;lkj sd;lfkjas ;lklsjf ;lkasj f;askljf ;iijpwiejjr sa;lljf sijie s;lkdf ;asoijf ;sljf osiaoewej r;iijssofij s;lkkdj fsdf","button text?","http://ivcf.rit.edu/") +
      this.EmailFeature.renderHTML() +
      this.EmailGrid.renderHTML() +
      this.EmailThumbnail.renderHTML("rtl","Large Group") +
      this.EmailSocialMedia.renderHTML() +
      this.EmailText.renderHTML()

    )
  }

  renderHTML(modules) {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" class="email-container">`
      + this.constructBody(modules) +
      `</table>`
    );
  }
}
