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

  constructBody(modules, when=new Date()) {
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
        case "intro":
          let intro = module.desc;
          bodyHTML = bodyHTML + this.EmailText.renderHTML("",intro);
          break;
        case "misvision":
          let misvision = module.desc;
          bodyHTML = bodyHTML + this.EmailText.renderHTML("",misvision);
          break;
        case "largegroup":
          let lg = Events.findOne({start: {$gt: when, $lt: n}, status: "Published", tags: "Large Group"});
          if (!!lg) {
            let thumbnail = this.EmailThumbImage.renderHTML( process.env.ROOT_URL + "images/EmailLargeGroup.jpg");
            let details = this.EmailDetails.renderHTML(lg.start, lg.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), lg.name, details + lg.description, thumbnail);
            d = d + 1;
          }
          break;
        case "core":
          let cr = Events.findOne({start: {$gt: when, $lt: n}, status: "Published", tags: "Core"});
          if (!!cr) {
            let thumbnail = this.EmailThumbImage.renderHTML( process.env.ROOT_URL + "images/coretammy.jpg");
            let details = this.EmailDetails.renderHTML(cr.start, cr.location);
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d), cr.name, details + cr.description, thumbnail);
            d = d + 1;
          }
          break;
        case "prayer":
          let prs = Events.find({start: {$gt: when, $lt: n}, status: "Published", tags: "Prayer"}).fetch();
          console.log(prs);
          if (prs.length >= 1) {
            let pr1 = prs[0];
            let start1 = pr1.start;
            let loc1 = pr1.location;
            let name1 = pr1.name;
            let desc1 = pr1.description;
            let details1 = this.EmailDetails.renderHTML(start1, loc1);
            let start2 = "";
            let loc2 = "";
            let name2 = "";
            let desc2 = "";
            let details2 = "";
            if (prs.length > 1) {
              pr2 = prs[1];
              start2 = pr2.start;
              loc2 = pr2.location;
              name2 = pr2.name;
              desc2 = pr2.description;
              details2 = this.EmailDetails.renderHTML(start2, loc2);
            }
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(name1, details1 + desc1, name2, details2 + desc2,"border: 2px solid transparent;");
          }
          break;
        case "conference":
          let cfs = Events.find({start: {$gt: when}, status: "Published", tags: "Conference"}).fetch();
          cfs.forEach( (cf) => {
            details = this.EmailDetails.renderHTML(cf.start, cf.location);
            bodyHTML = bodyHTML + this.EmailFeature.renderHTML(cf.pic, cf.name, details + cf.description);
          });
          break;
        case "community":
          let evs = Events.find({start: {$gt: when, $lt: n}, status: "Published", tags: "Community"}).fetch();
          let remaining = evs.filter(function(i) {return featured.indexOf(i) < 0;});
          for (var i = 0; i < remaining.length; i += 2) {
            let ev1 = remaining[i];
            let start1 = ev1.start;
            let loc1 = ev1.location;
            let name1 = ev1.name;
            let desc1 = ev1.description;
            let details1 = this.EmailDetails.renderHTML(start1, loc1);
            let start2 = "";
            let loc2 = "";
            let name2 = "";
            let desc2 = "";
            let details2 = "";
            if (i + 1 < remaining.length) {
              ev2 = remaining[i + 1];
              start2 = ev2.start;
              loc2 = ev2.location;
              name2 = ev2.name;
              desc2 = ev2.description;
              details2 = this.EmailDetails.renderHTML(start2, loc2);
            }
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(name1, details1 + desc1, name2, details2 + desc2);
          }
          break;
        case "smallgroup":
          let sgs = Events.find({start: {$gt: when, $lt: n}, status: "Published", tags: "Small Group"}).fetch();
          for (var i = 0; i < sgs.length; i += 2) {
            let sg1 = sgs[i];
            let start1 = sg1.start;
            let loc1 = sg1.location;
            let name1 = sg1.name;
            let desc1 = sg1.description;
            let details1 = this.EmailDetails.renderHTML(start1, loc1);
            let start2 = "";
            let loc2 = "";
            let name2 = "";
            let desc2 = "";
            let details2 = "";
            if (i + 1 < sgs.length) {
              sg2 = sgs[i + 1];
              start2 = sg2.start;
              loc2 = sg2.location;
              name2 = sg2.name;
              desc2 = sg2.description;
              details2 = this.EmailDetails.renderHTML(start2, loc2);
            }
            bodyHTML = bodyHTML + this.EmailGrid.renderHTML(name1, details1 + desc1, name2, details2 + desc2,"border: 2px dotted #1a3d6d;");
          }
          break;
        case "becomeamember":
          let memberpitch = module.desc;
          bodyHTML = bodyHTML + this.EmailText.renderHTML("",memberpitch);
          bodyHTML = bodyHTML + this.EmailCTA.renderHTML("Become a Member","http://ivcf.rit.edu/becomeamember");
          break;
        case "getinvolved":
          let list = module.desc;
          bodyHTML = bodyHTML + this.EmailText.renderHTML("Get Involved",list);
          break;
        case "custom":
          switch (module.layout) {
            case "spacer": {
              bodyHTML = bodyHTML + `<tr class="module" content="spacer"><td bgcolor="#ffffff" style="padding: 20px; color: #1a3d6d;"></td></tr>`;
              break;
            }
            case "divider": {
              bodyHTML = bodyHTML + `<tr class="module" content="divider"><td bgcolor="#ffffff" style="padding: 10px 20px; color: #1a3d6d;"><hr style="color: #1a3d6d;"></td></tr>`;
              break;
            }
            case "text": {
              let heading = module.title;
              let content = module.desc;
              bodyHTML = bodyHTML + this.EmailText.renderHTML(heading,content);
              break;
            }
            case "cta": {
              let url = module.url;
              let content = module.title;
              bodyHTML = bodyHTML + this.EmailCTA.renderHTML(content,url);
              break;
            }
            case "feature": {
              let heading = "";
              let content = "";
              let img = "";
              if(!module.eid == ""){
          			let feat = Events.findOne(module.eid);
                heading = feat.name;
                content = feat.description;
                img = feat.pic;
          		}
              if(!module.img == ""){
                img = module.img;
              }
              heading = heading + module.title;
              content = content + module.desc;
              bodyHTML = bodyHTML + this.EmailFeature.renderHTML(img,heading,content);
              break;
            }
            case "thumbnail": {
              let thumbnail = this.EmailThumbImage.renderHTML(module.img);
              let heading = module.title;
              let content = module.desc;
              bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML(this.tdir(d),heading,content,thumbnail);
              d = d + 1;
              break;
            }
          }
          break;
        default:
          thumbnail = this.EmailThumbImage.renderHTML(process.env.ROOT_URL + "images/EmailLargeGroup.jpg");
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
