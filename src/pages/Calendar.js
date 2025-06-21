import React, { useState } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Team Standup',
      start: new Date(),
      end: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 minutes
    },
  ]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((evt) =>
      evt === event ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event Name');
    if (title)
      setEvents([...events, { title, start, end }]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="h-[600px] bg-white dark:bg-gray-800 p-4 rounded shadow">
        <DnDCalendar
          defaultView={Views.WEEK}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onEventDrop={handleEventDrop}
          onSelectSlot={handleSelectSlot}
          resizable
          onEventResize={handleEventDrop}
        />
      </div>
    </div>
  );
};

export default Calendar;
