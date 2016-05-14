import React, {Component} from 'react';
import moment from 'moment';
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
        right: "month,basicWeek,basicDay"
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
    console.log(calendar.clientWidth);
  }

  componentWillUnmount() {
    const { calendar } = this.refs;
    $(calendar).fullCalendar('destroy');
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div class="calendar-container">
        <div ref="calendar" id="calendar"></div>
      </div>
    );
  }
}
