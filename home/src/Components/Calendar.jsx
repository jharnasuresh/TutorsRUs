import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import styles from "./Calendar.module.scss";


export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <div className={styles.fcContent}>
          <div className={styles.eventTitle}>{eventInfo.event.title}</div>
          <div className={styles.eventTime}>{eventInfo.timeText} EST</div>
        </div>
      </>
    );
  };
  const handleDateClick = (arg) => {
    setIsOpen(true);
    // bind with an arrow function
    arg.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(arg.event);
    console.log(arg.event.extendedProps);

    // console.log(arg.event.extendedProps.description);
  };
  const setting = {
    plugins: [
      dayGridPlugin,
      listPlugin,
      interactionPlugin,
      googleCalendarPlugin
    ],
    //Main Key
    googleCalendarApiKey: "AIzaSyAu5NO41gLKe89SNNSb02tHETq_mQ1NxFg",
    //Personal Key
    // googleCalendarApiKey: "AIzaSyC4wovE09hJkGy7mG4QGlwVzdeu0uLDhro",
    eventSources: [
      // {
      //   googleCalendarId: "en.usa#holiday@group.v.calendar.google.com"
      // },
      {
        googleCalendarId:
          "55ee23b93117c9d3d4dad57f20617bccb554fb5ae7305ddadacba47987e0e372@group.calendar.google.com",
        className: styles.calEvents
      }
    ],
    eventClick: handleDateClick,
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,listMonth"
    },
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: "short"
    },
    eventContent: renderEventContent
  };
  return (
    <>
      <FullCalendar {...setting} />
      
    </>
  );
}
