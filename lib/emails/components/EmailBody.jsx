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

  constructBody(modules, when) {
		let bodyHTML = "";
    let n = addDays(when, 7);
    let d = 0;
    let featured = [];
    let evs = Events.find({}).fetch();
    modules.forEach( (module) => {
      if (module.eid != "") {
        featured.push(module.eid);
      }
    });
		modules.forEach( (module) => {
      switch (module.type) {
        /*

  "_id": "jZMScihckccxPMcSe",
  "uid": "3h3jjuBRYCZ39Z3ki",
  "sent": false,
  "to": {
    "users": [
      "3h3jjuBRYCZ39Z3ki"
    ],
    "groups": [],
    "emails": []
  },
  "from": "weeksseth@gmail.com",
  "subject": "IVCF Chapter Newsletter",
  "modules": [
    {
      "_id": "PG7hiGEWBk7FX2MikTBxjYKt6",
      "title": "",
      "type": "intro",
      "eid": "",
      "desc": "
Hey everyone!

\n
Welcome to week 9! I hope you have had an amazing time!

\n
-Jess

",
      "img": "",
      "layout": ""
    },
    {
      "_id": "rpZe66Tts2YSicbfmhcWFgnzE",
      "title": "",
      "type": "smallgroup",
      "eid": "",
      "desc": "",
      "img": "",
      "layout": ""
    },
    {
      "_id": "RsJbKNGQCaD6vMpHPJCX72Pgw",
      "title": "",
      "type": "prayer",
      "eid": "",
      "desc": "",
      "img": "",
      "layout": ""
    },
    {
      "_id": "xMHsnG3SBDXxNTxMfqHNMgTiP",
      "title": "Custom",
      "type": "custom",
      "eid": "",
      "desc": "",
      "img": "",
      "layout": "feature"
    }
  ],
  "when": "2017-06-20T04:14:57.358Z",
  "template": "newsletter",
  "staged": false
}
*/

        case "intro":
          bodyHTML = bodyHTML + this.EmailText.renderHTML("",module.desc);
          console.log("Intro module");
          break;
        case "largegroup":
          let lg = Events.findOne({start: {$gt: when, $lt: n}, status: "Published", tags: "Large Group"});
          if (!!lg) {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/EmailLargeGroup.jpg");
            details = this.EmailDetails.renderHTML(lg.start, lg.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), lg.name, details + lg.description, thumbnail);
            d = d + 1;
          }
          break;
        case "core":
          let cr = Events.findOne({start: {$gt: when, $lt: n}, status: "Published", tags: "Core"});
          if (!!cr) {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/coretammy.jpg");
            details = this.EmailDetails.renderHTML(cr.start, cr.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), cr.name, details + cr.description, thumbnail);
            d = d + 1;
          }
          console.log("Core module");
          break;
        case "prayer":
          let pr = Events.findOne({start: {$gt: when, $lt: n}, status: "Published", tags: "Prayer"});
          if (!!pr) {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/basileiaworship.jpg");
            details = this.EmailDetails.renderHTML(pr.start, pr.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), pr.name, details + pr.description, thumbnail);
            d = d + 1;
          }
          console.log("Prayer module");
          break;
        case "conference":
          let cfs = Events.find({start: {$gt: when}, status: "Published", tags: "Conference"}).fetch();
          cfs.forEach( (cf) => {
            details = this.EmailDetails.renderHTML(cf.start, cf.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML("http://localhost:3000/images/basileiachapter.jpg", cf.name, details + cf.description);
          });
          break;
        case "nso":
          let nsos = Events.find({start: {$gt: when, $lt: n}, status: "Published", tags: "NSO"}).fetch();
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
          break;
        case "social":
          let scss = Events.find({start: {$gt: when, $lt: n}, status: "Published", tags: "Social"}).fetch();
          remaining = scss.filter(function(i) {return featured.indexOf(i) < 0;});
          for (var i = 0; i < remaining.length; i += 2) {
            scs1 = remaining[i];
            start1 = scs1.start;
            loc1 = scs1.location;
            name1 = scs1.name;
            desc1 = scs1.description;
            details1 = this.EmailDetails.renderHTML(start1, loc1);
            start2 = "";
            loc2 = "";
            name2 = "";
            desc2 = "";
            details2 = "";
            if (i + 1 < scss.length) {
              scs2 = remaining[i + 1];
              start2 = scs2.start;
              loc2 = scs2.location;
              name2 = scs2.name;
              desc2 = scs2.description;
              details2 = this.EmailDetails.renderHTML(start2, loc2);
            }
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(name1, details1 + desc1, name2, details2 + desc2);
          }
          break;
        /*case "smallgroup":
          let scs = Events.find({start: {$gt: when}, status: "Published", tags: "Small Group"}).fetch();
          scs.forEach( (sc) => {
            details = this.EmailDetails.renderHTML(sc.start, sc.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML("http://localhost:3000/images/basileiachapter.jpg", sc.name, details + sc.description);
          });
          */
        case "becomeamember":
          memberpitch = module.desc;
          bodyHTML = bodyHTML + this.EmailCTA.renderHTML(memberpitch,"Become a Member","http://ivcf.rit.edu/becomeamember");
          break;
        case "getinvolved":
          list = module.desc;
          bodyHTML = bodyHTML + this.EmailText.renderHTML("Get Involved",list);
          break;
        default:
          thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/EmailLargeGroup.jpg");
          bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d),module.type,"text",thumbnail);
          d = d + 1;
      }

		});
    return bodyHTML;
  }

  renderHTML(modules, when) {
    return (
      `<table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" class="email-container">`
      + this.constructBody(modules, when) +
      `</table>`
    );
  }
}
