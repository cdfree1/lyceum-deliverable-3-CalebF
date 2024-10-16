import './App.css';
import ReminderCard from './Reminder';
import { useState, useEffect } from 'react';
function App() {
  const [reminders, setReminders] = useState(() => {
    const reminders = localStorage.getItem('reminders');
    return reminders ? JSON.parse(reminders) : [];
  })

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('red');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title) {
      return alert('Please include a title! :)');
    }
    const newReminder = { title, description, date, color};
    const updatedReminders = [newReminder, ...reminders];
    const colorOrder = ['#D22B2B', '#FFBF00', '#50C878'];
    const sortedReminders = updatedReminders.sort((a, b) => {
      return colorOrder.indexOf(a.color) - colorOrder.indexOf(b.color);
    });
    setReminders(sortedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    setTitle('');
    setDescription('');
    setDate('');
    setColor('#D22B2B');
  };

  const handleDelete = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  useEffect(() => {
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);


  return (
      <div className="App">
        <div className="Reminder-form">
          <h1>Remind Tracker</h1>
          <form onSubmit={handleSubmit} className="Reminder-input">
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description: </label>
              <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date: </label>
              <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
                <label htmlFor="color">Color: </label>
                <select
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    <option value="#D22B2B">High</option>
                    <option value="#FFBF00">Medium</option>
                    <option value="#50C878">Low</option>
                </select>
            </div>
            <button type="submit" className="Submit-button">Add Reminder</button>
          </form>
        </div>
        <div className="Reminder-list">
          {reminders.map((reminder, index) => {
            return (
                <ReminderCard
                    key={index}
                    title={reminder.title}
                    description={reminder.description}
                    date={reminder.date}
                    color={reminder.color}
                    onDelete={() => handleDelete(index)}
                />
            );
          })}
        </div>
      </div>
  );
}

export default App;
