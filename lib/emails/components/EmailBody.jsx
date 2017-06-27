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
/*
  {
    "_id": "PK7Nme6Q338aqgyWf",
    "name": "New Event",
    "namelock": false,
    "createdAt": "2017-06-16T00:55:37.271Z",
    "published": true,
    "permUser": [],
    "permGroup": [],
    "start": "2017-06-17T20:00:00.000Z",
    "end": "2017-06-17T21:00:00.000Z",
    "workpad": [
      {
        "name": "Pad 1",
        "content": "",
        "lock": false
      }
    ],
    "workpadlock": false,
    "description": "This is the description of New Event",
    "descriptionlock": false,
    "notes": [],
    "location": "",
    "locationlock": false,
    "host": "",
    "owner": "xuhe7JjaBqQk6czNE",
    "createdBy": "xuhe7JjaBqQk6czNE",
    "tags": [
      "NSO",
      "Conference",
      "Large Group"
    ],
    "reoccuring": false,
    "attachements": [],
    "attendees": [],
    "rsvps": [],
    "pic": "",
    "reserved": false,
    "evr": false,
    "jobs": []
  }
*/

  constructBody(modules) {
		let bodyHTML = "";
    let n = addDays(new Date(), 7);
		modules.forEach( (module) => {
      switch (module.type) {
        case "intro":
          bodyHTML = bodyHTML + this.EmailText.renderHTML("",module.desc);
          break;
        case "largegroup":
          let lgs = Events.find({start: {$gt: new Date(), $lt: n}, published: true, tags: "Large Group"}).fetch();
          lgs.forEach( (lg) => {
            thumbnail = this.EmailThumbImage.renderHTML("http://localhost:3000/images/largegroup_1.jpg");
            thumbnail = thumbnail + this.EmailDetails.renderHTML(lg.start, lg.location, lg.owner);
            //"&#128197; " + formatDate(lg.start) + "</br>&#128337; " + formatTime(lg.start) + "</br>&#127759; " + lg.location + "</br>&#128231; " + lg.owner
            bodyHTML = bodyHTML + this.EmailThumbnail.renderHTML("rtl", lg.name, lg.description, thumbnail);
          });
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
