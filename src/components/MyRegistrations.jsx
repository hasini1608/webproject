import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function MyRegistrations() {


  const [myEvents, setMyEvents] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    loadRegistrations();

  }, []);



  const loadRegistrations = async () => {

    try {


      const user = JSON.parse(
        localStorage.getItem("user")
      );


      const regRes = await axios.get(
        "http://localhost:8000/registrations/all"
      );


      const eventRes = await axios.get(
        "http://localhost:8000/events/all"
      );



      const userRegs =
        regRes.data.filter(
          r => r.userId === user.id
        );


      const registeredEvents =
        eventRes.data.filter(event =>
          userRegs.some(
            r => r.eventId === event.id
          )
        );


      setMyEvents(registeredEvents);



    } catch(error) {

      console.log(error);

    }

  };




  return (

    <div className="registration-container">


      <button
        className="back-btn"
        onClick={()=>navigate("/dashboard")}
      >
        Back
      </button>



      <h1 className="registration-title">
        My Registrations
      </h1>




      {
        myEvents.length === 0 &&

        <p className="no-registration">
          No registrations found
        </p>

      }




      {
        myEvents.map(event => (


          <div
            className="registration-card"
            key={event.id}
          >


            <h3>
              {event.title}
            </h3>


            <p>
              Description: {event.description}
            </p>


            <p>
              Date: {event.eventDate}
            </p>


            <p>
              Start: {event.startTime}
            </p>


            <p>
              End: {event.endTime}
            </p>


            <p>
              Venue: {event.venue}
            </p>


          </div>


        ))
      }



    </div>

  );

}