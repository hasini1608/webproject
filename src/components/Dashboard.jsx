import { useNavigate } from "react-router-dom";

export default function Dashboard({ events, deleteEvent, loading }) {

  const navigate = useNavigate();

  if (loading) {
    return <h2 className="title">⏳ Loading events...</h2>;
  }

  return (
    <div className="container">
      <h1 className="title">📊 Dashboard</h1>

      <button className="calendarBtn" onClick={()=>navigate("/calendar")}>
        Open Calendar
      </button>

      <h2>Scheduled Events</h2>

      {Object.keys(events).length===0 && <p>No events scheduled</p>}

      {Object.keys(events).map((date)=>
        events[date].map((ev,i)=>(
          <div className="event-card" key={i}>
            <b>{date}</b>
            <h4>{ev.title}</h4>
            <p>{ev.desc}</p>

            <button onClick={()=>deleteEvent(date,i)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}