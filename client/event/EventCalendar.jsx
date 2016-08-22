import React, {Component} from 'react';
import moment from 'moment';
import {Tracker} from 'meteor/tracker';
import EventContent from './EventContent.jsx';

export default class EventCalendar extends Component {

  openEvent(event) {
    event.preventDefault();
  }

  renderPopoverContent(event) {
    div = $("<div></div>")[0];
    ReactDOM.render((<EventContent event={event}/>), div);
    return div;
  }


  componentDidMount() {
    const { calendar } = this.refs;
    $(calendar).fullCalendar({
      events: this.props.events,
      header: {
        left: "prev,next today",
        center: "title",
        right:  "month,basicWeek,basicDay"    // maybe these can be controlled by settings later
      },
      eventRender: (event, element) => {
        element.popover({
          placement: "auto left",
          container: calendar,
          trigger: "manual",
          animation: false,
          template: '<div class="popover" role="tooltip">' +
          '<div class="arrow"></div>' +
          '<div class="popover-content"></div>' +
          '</div>',
          html: true,
          content: this.renderPopoverContent(event)
        }).on("mouseenter", () => {
          clearTimeout(element.timeout);
          $(element).popover("show");
          $(calendar).children(".popover").on("mouseleave", (event) => {
            element.timeout = setTimeout(() => {
              $(event.currentTarget).popover('hide');
            }, 250);
          });
        }).on("mouseleave", () => {
          clearTimeout(element.timeout);
          element.timeout = setTimeout(() => {
            if (!$(".popover:hover").length) {
              $(element).popover("hide");
            }
          }, 500);
        });
      }
    });
    this.autorunHandle = Tracker.autorun(() => {
       var update = Session.get("calendarUpdate");
       if (update) {
         $(calendar).fullCalendar('refetchEvents');
         $(calendar).fullCalendar('rerenderEvents');
         Session.set("calendarUpdate", null);
       }
     });

    console.log(calendar.clientWidth);
  }

  componentWillUnmount() {
    const { calendar } = this.refs;
    $(calendar).fullCalendar('destroy');
    this.autorunHandle.stop();
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className="calendar-container">
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">

            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <div className="panel panel-default">
              <div className="panel-body">
                <div ref="calendar" id="calendar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
