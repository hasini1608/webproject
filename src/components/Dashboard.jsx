import { useNavigate } from "react-router-dom";

export default function Dashboard({
  events,
  deleteEvent,
  registerEvent,
  loading
}) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  if (loading) {

    return <h2 className="title">⏳ Loading events...</h2>;

  }


  return (

    <div className="container">


      {/* TOP SECTION */}

      <div className="dashboard-header">


        <h1 className="title">
          📊 Dashboard
        </h1>


        <div className="inside-profile">


<p>
 👤 {user?.email.split("@")[0]}
</p>

          <button
            className="logoutBtn"
            onClick={logout}
          >
            Logout
          </button>



        </div>


      </div>





      <button
        className="calendarBtn"
        onClick={()=>navigate("/calendar")}
      >
        Open Calendar
      </button>



      <button
        className="calendarBtn"
        onClick={()=>navigate("/my-registrations")}
      >
        My Registrations
      </button>

<button
className="calendarBtn"
onClick={()=>navigate("/search")}
>
Search Events
</button>



      <h2>
        Scheduled Events
      </h2>




      {
        Object.keys(events).length === 0

        &&

        <p>
          No events scheduled
        </p>

      }






      {
        Object.keys(events).map(date=>

          events[date].map((ev,i)=>(


            <div
              className="event-card"
              key={i}
            >


              <b>
                {date}
              </b>


              <h3>
                {ev.title}
              </h3>


              <p>
                {ev.desc}
              </p>


              <p>
                Start: {ev.startTime}
              </p>


              <p>
                End: {ev.endTime}
              </p>


              <p>
                Venue: {ev.venue}
              </p>



              <button
                onClick={() =>
                  registerEvent(ev.id)
                }
              >
                Register
              </button>




              <button
                onClick={() =>
                  deleteEvent(
                    date,
                    i,
                    ev.id
                  )
                }
              >
                Delete
              </button>


            </div>


          ))

        )
      }



    </div>

  );

}