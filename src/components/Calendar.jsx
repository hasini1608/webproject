import { useNavigate } from "react-router-dom";
import EventModal from "./EventModal.jsx";

export default function Calendar({
  months, month, year,
  changeMonth, renderDays,
  show, selected, setShow,
  saveEvent, setTitle, setDesc,
  loading
}) {

  const navigate = useNavigate();

  return (
    <div className="container">

      <h1 className="title">📅 Event Scheduler</h1>

      <button className="calendarBtn" onClick={()=>navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <div className="header">
        <button onClick={()=>changeMonth(-1)}>⬅</button>
        <h2>{months[month]} {year}</h2>
        <button onClick={()=>changeMonth(1)}>➡</button>
      </div>

      <div className="weekdays">
        <div>Sun</div><div>Mon</div><div>Tue</div>
        <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      {loading ? (
        <h2 className="title">⏳ Loading calendar...</h2>
      ) : (
        <div className="calendar">
          {renderDays()}
        </div>
      )}

      {show && (
        <EventModal
          selected={selected}
          setShow={setShow}
          saveEvent={saveEvent}
          setTitle={setTitle}
          setDesc={setDesc}
        />
      )}

    </div>
  );
}