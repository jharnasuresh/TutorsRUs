import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import styles from "./Calendar.module.scss";
import { AspectRatio } from "@mui/icons-material";
import { height } from "@mui/system";


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
    eventBorderColor: "#8FDEE8", 

    //Main Key
    googleCalendarApiKey: "AIzaSyDz4YskXpTe-Pslm1tyQv0_a1dc75-hkwA",
    //Personal Key
    // googleCalendarApiKey: "AIzaSyC4wovE09hJkGy7mG4QGlwVzdeu0uLDhro",
    eventSources: [
      // {
      //   googleCalendarId: "en.usa#holiday@group.v.calendar.google.com"
      // },
      {
        googleCalendarId:
          "tutorsrus62@gmail.com",
        className: styles.calEvents
      }
    ],
    eventClick: handleDateClick,
    initialView: "dayGridMonth",
    eventBackgroundColor: '#8FDEE8',
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,listMonth"
    },
    eventColor: '#8FDEE8',
    eventContent: renderEventContent, 




  };

  return (
    <div style={{backgroundColor: "white"}} >
      <FullCalendar {...setting} />
      
    </div>
  );
}
