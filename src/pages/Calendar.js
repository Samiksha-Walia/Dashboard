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
      end: new Date(new Date().getTime() + 30 * 60 * 1000),
      color: '#3b82f6',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    color: '#3b82f6',
    start: '',
    end: '',
  });

  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [editEventData, setEditEventData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    if (!formData.title || !formData.start || !formData.end) return;
    const newEvent = {
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
      color: formData.color,
    };
    setEvents([...events, newEvent]);
    setFormData({ title: '', color: '#3b82f6', start: '', end: '' });
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((evt) =>
      evt === event ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color || '#2563eb',
      color: 'white',
      borderRadius: '5px',
      padding: '2px 5px',
      border: 'none',
    };
    return { style };
  };

  const handleSelectEvent = (event) => {
    const index = events.findIndex((ev) => ev === event);
    setEditingEventIndex(index);
    setEditEventData({
      ...event,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEventData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedEvent = () => {
    const updated = [...events];
    updated[editingEventIndex] = {
      ...editEventData,
      start: new Date(editEventData.start),
      end: new Date(editEventData.end),
    };
    setEvents(updated);
    setEditingEventIndex(null);
    setEditEventData(null);
  };

  const cancelEdit = () => {
    setEditingEventIndex(null);
    setEditEventData(null);
  };

  const deleteEvent = () => {
    const updated = events.filter((_, index) => index !== editingEventIndex);
    setEvents(updated);
    cancelEdit();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleInputChange}
          className="p-2 border rounded w-52"
        />
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          className="w-12 h-10 p-1 rounded border"
        />
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddEvent}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Event
        </button>
      </div>

      {editEventData && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Event</h2>
            <input
              type="text"
              name="title"
              value={editEventData.title}
              onChange={handleEditChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Event Title"
            />
            <input
              type="color"
              name="color"
              value={editEventData.color}
              onChange={handleEditChange}
              className="w-full p-2 mb-2 border rounded h-10"
            />
            <input
              type="datetime-local"
              name="start"
              value={editEventData.start}
              onChange={handleEditChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="datetime-local"
              name="end"
              value={editEventData.end}
              onChange={handleEditChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={deleteEvent}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedEvent}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-[600px] bg-white dark:bg-gray-800 p-4 rounded shadow">
        <DnDCalendar
          defaultView={Views.WEEK}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          resizable
          onSelectSlot={({ start, end }) => {
            setFormData({ ...formData, start, end });
          }}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventDrop}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Calendar;
