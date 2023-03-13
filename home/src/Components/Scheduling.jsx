import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import styles from "./Calendar.module.scss";


export default function Scheduling() {
return (
    <Datepicker
        controls={['calendar', 'timegrid']}
        touchUi={true}
    />
);
}