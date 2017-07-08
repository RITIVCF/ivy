import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import EmailBanner from './EmailBanner.jsx';
import EmailCTA from './EmailCTA.jsx';
import EmailFeature from './EmailFeature.jsx';
import EmailGrid from './EmailGrid.jsx';
import EmailThumbnail from './EmailThumbnail.jsx';
import EmailSocialMedia from './EmailSocialMedia.jsx';
import EmailText from './EmailText.jsx';
import EmailThumbImage from './EmailThumbImage.jsx';
import EmailDetails from './EmailDetails.jsx';

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
    this.EmailThumbImage = new EmailThumbImage();
    this.EmailDetails = new EmailDetails();

  }

  tdir(d) {
    int = d % 2;
    if (int == 1) {
      return "rtl"
    } else {
      return "ltr"
    }
  }

  constructBody(modules) {
		let bodyHTML = "";
    let n = addDays(new Date(), 7);
    let d = 0;
		modules.forEach( (module) => {
      switch (module.type) {
        case "intro":
          bodyHTML = bodyHTML + this.EmailText.renderHTML("",module.desc);
          break;
        case "largegroup":
          let lg = Events.findOne({start: {$gt: new Date(), $lt: n}, published: true, tags: "Large Group"});
          if (!!lg) {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/EmailLargeGroup.jpg");
            details = this.EmailDetails.renderHTML(lg.start, lg.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), lg.name, details + lg.description, thumbnail);
            d = d + 1;
          }
          break;
        case "core":
          let cr = Events.findOne({start: {$gt: new Date(), $lt: n}, published: true, tags: "Core"});
          if (!!cr) {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/coretammy.jpg");
            details = this.EmailDetails.renderHTML(cr.start, cr.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), cr.name, details + cr.description, thumbnail);
            d = d + 1;
          }
          break;
        case "prayer":
          let pr = Events.findOne({start: {$gt: new Date(), $lt: n}, published: true, tags: "Prayer"});
          if (!!pr) {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/basileiaworship.jpg");
            details = this.EmailDetails.renderHTML(pr.start, pr.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), pr.name, details + pr.description, thumbnail);
            d = d + 1;
          }
          break;
        case "conference":
          let cfs = Events.find({start: {$gt: new Date()}, published: true, tags: "Conference"}).fetch();
          cfs.forEach( (cf) => {
            details = this.EmailDetails.renderHTML(cf.start, cf.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML("http://localhost:3000/images/basileiachapter.jpg", cf.name, details + cf.description);
          });
        case "nso":
          let nsos = Events.find({start: {$gt: new Date()}, published: true, tags: "NSO"}).fetch();
          nsos.forEach( (nso) => {
            details = this.EmailDetails.renderHTML(nso.start, nso.location);
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML("http://localhost:3000/images/coretammy.jpg", nso.name, details + nso.description);
          });
        case "social":
          let scs = Events.find({start: {$gt: new Date()}, published: true, tags: "Social"}).fetch();
          scs.forEach( (sc) => {
            details = this.EmailDetails.renderHTML(sc.start, sc.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML("http://localhost:3000/images/basileiachapter.jpg", sc.name, details + sc.description);
          });
        /*case "smallgroup":
          let scs = Events.find({start: {$gt: new Date()}, published: true, tags: "Small Group"}).fetch();
          scs.forEach( (sc) => {
            details = this.EmailDetails.renderHTML(sc.start, sc.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML("http://localhost:3000/images/basileiachapter.jpg", sc.name, details + sc.description);
          });*/
        default:
          thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/EmailLargeGroup.jpg");
          bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d),"Default","text",thumbnail);
          d = d + 1;
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
