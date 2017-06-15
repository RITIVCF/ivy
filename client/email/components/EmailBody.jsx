import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import EmailBanner from './EmailBanner.jsx';
import EmailCTA from './EmailCTA.jsx';
import EmailFeature from './EmailFeature.jsx';
import EmailGrid from './EmailGrid.jsx';
import EmailLeftThumbnail from './EmailLeftThumbnail.jsx';
import EmailRightThumbnail from './EmailRightThumbnail.jsx';
import EmailSocialMedia from './EmailSocialMedia.jsx';
import EmailText from './EmailText.jsx';

export default class EmailBody {
  constructor(){

    //sdaf

    this.EmailBanner = new EmailBanner();
    this.EmailCTA = new EmailCTA();
    this.EmailFeature = new EmailFeature();
    this.EmailGrid = new EmailGrid();
    this.EmailLeftThumbnail = new EmailLeftThumbnail();
    this.EmailRightThumbnail = new EmailRightThumbnail();
    this.EmailSocialMedia = new EmailSocialMedia();
    this.EmailText = new EmailText();

  }

  constructBody() {
    // This function will construct the body of the email based on the database
  }

  testBody() {
    // Test of email template
    return(
      this.EmailBanner.renderHTML() +
      this.EmailCTA.renderHTML() +
      this.EmailFeature.renderHTML() +
      this.EmailGrid.renderHTML() +
      this.EmailLeftThumbnail.renderHTML() +
      this.EmailRightThumbnail.renderHTML() +
      this.EmailSocialMedia.renderHTML() +
      this.EmailText.renderHTML()

    )
  }

  renderHTML() {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" class="email-container">`
      + testBody() +
      `</table>`
    );
  }
}
