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
    let featured = [];
    modules.forEach( (module) => {
      if (module.eid != "") {
        featured.push(module.eid);
      }
    });
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
          break;
        case "nso":
          let nsos = Events.find({start: {$gt: new Date()}, published: true, tags: "NSO"}).fetch();
          remaining = nsos.filter(function(i) {return featured.indexOf(i) < 0;});
          for (var i = 0; i < remaining.length; i += 2) {
            nso1 = remaining[i];
            start1 = nso1.start;
            loc1 = nso1.location;
            name1 = nso1.name;
            desc1 = nso1.description;
            details1 = this.EmailDetails.renderHTML(start1, loc1);
            start2 = "";
            loc2 = "";
            name2 = "";
            desc2 = "";
            details2 = "";
            if (i + 1 < nsos.length) {
              nso2 = remaining[i + 1];
              start2 = nso2.start;
              loc2 = nso2.location;
              name2 = nso2.name;
              desc2 = nso2.description;
              details2 = this.EmailDetails.renderHTML(start2, loc2);
            }
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(name1, details1 + desc1, name2, details2 + desc2);
          }
          /*nsos.forEach( (nso) => {
            details = this.EmailDetails.renderHTML(nso.start, nso.location);
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(nso.name, details + nso.description);
          });
          */
          break;
        case "social":
          let scs = Events.find({start: {$gt: new Date()}, published: true, tags: "Social"}).fetch();
          scs.forEach( (sc) => {
            details = this.EmailDetails.renderHTML(sc.start, sc.location);
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(sc.name, details + sc.description);
          });
          break;
        /*case "smallgroup":
          let scs = Events.find({start: {$gt: new Date()}, published: true, tags: "Small Group"}).fetch();
          scs.forEach( (sc) => {
            details = this.EmailDetails.renderHTML(sc.start, sc.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML("http://localhost:3000/images/basileiachapter.jpg", sc.name, details + sc.description);
          });

for refre
          */
        default:
          thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/EmailLargeGroup.jpg");
          bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d),"Default","text",thumbnail);
          d = d + 1;
      }

		});
    return bodyHTML;
  }

  renderHTML(modules) {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" class="email-container">`
      + this.constructBody(modules) +
      `</table>`
    );
  }
}
