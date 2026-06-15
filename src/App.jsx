import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import MyRegistrations from "./components/MyRegistrations";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Calendar from "./components/Calendar.jsx";
import EventSearch from "./components/EventSearch.jsx";

export default function App() {

  const [users, setUsers] = useState([]);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [signup, setSignup] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: ""
  });

  /* LOGIN */
  const loginUser = async (navigate) => {

try {

const res = await axios.post(
"http://localhost:8000/users/login",
{
email: login.email,
password: login.password
}
);

console.log(res.data);

if(res.data.message==="Login Success"){

localStorage.setItem(
"token",
res.data.token
);

localStorage.setItem(
"user",
JSON.stringify({
 id: res.data.id,
 role: res.data.role,
 name: res.data.name,
 email: login.email
})
);

navigate("/dashboard");

}else{

alert("Invalid Login");

}

}catch(error){

console.log(error);

alert("Login failed");

}

};

  /* SIGNUP */
const createAccount = async (navigate) => {

    if (!signup.first || !signup.last || !signup.email || !signup.password) {
        alert("Fill all fields");
        return;
    }

    if (signup.password !== signup.confirm) {
        alert("Passwords do not match");
        return;
    }

    try {

    const response = await axios.post(
        "http://localhost:8001/users/signup",
        {
            name: signup.first + " " + signup.last,
            email: signup.email,
            password: signup.password,
            role: "USER"
        }
    );

    console.log(response.data);

    alert("Account Created Successfully");

    navigate("/login");

}
catch(error){

    console.log(error);

    alert(
      error.response?.data ||
      error.message
    );
}

};

  /* CALENDAR */
  const today = new Date();
  const [current, setCurrent] = useState(today);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const changeMonth = (d) => {
    setCurrent(new Date(year, month + d, 1));
  };

  /* EVENTS */
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [startTime,setStartTime]=useState("");
  const [endTime,setEndTime]=useState("");
  const [venue,setVenue]=useState("");
  useEffect(() => {

    const loadEvents = async() => {

        try{

            setLoading(true);

            const response =
                await axios.get(
                    "http://localhost:8000/events/all"
                );

            const data={};

            response.data.forEach(ev=>{

                const k=ev.eventDate;

                if(!data[k])
                    data[k]=[];
data[k].push({
    id:ev.id,
    title:ev.title,
    desc:ev.description,
    startTime:ev.startTime,
    endTime:ev.endTime,
    venue:ev.venue
});

            });

            setEvents(data);

        }
        catch(error){

            console.log(error);

        }

        setLoading(false);

    };

    loadEvents();

},[]);

  const key = (d) => {
  const m = String(month + 1).padStart(2, "0");
  const day = String(d).padStart(2, "0");

  return `${year}-${m}-${day}`;
};

  const open = (d) => {
    setSelected(d);
    setShow(true);
  };

const saveEvent = async() => {

    try{

        const response = await axios.post(
            "http://localhost:8001/events/create",
            {
                title:title,
                description:desc,
                eventDate:key(selected),
                startTime:startTime,
                endTime:endTime,
                venue:venue,
                capacity:100
            },
            {
 headers:{
   "Content-Type":"application/json"
 }
}
        );

        // send event to search service

try {

await axios.post(
"http://localhost:8002/event-search/create",
{
 title:title,
 description:desc,
 venue:venue,
 eventDate:key(selected)
}
);

}
catch(searchError){

console.log("Search service failed but event created");
console.log(searchError);

}

        console.log(response.data);

        const savedEvent = response.data;

        const k = key(selected);

        const ev = {
            id:savedEvent.id,
            title:title,
            desc:desc,
            startTime:startTime,
            endTime:endTime,
            venue:venue
        };

        setEvents({
            ...events,
            [k]: events[k]
                ? [...events[k], ev]
                : [ev]
        });

        setTitle("");
        setDesc("");
        setStartTime("");
        setEndTime("");
        setVenue("");

        setShow(false);

    }
catch(error){

    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    if(error.response?.status === 400){

        alert(error.response.data);

    }
else{

alert("Event created successfully");

}

}}

const deleteEvent = async (date, index, id) => {

    try {

        await axios.delete(
            `http://localhost:8000/events/delete/${id}`
        );

        const updated =
            events[date].filter((_, i) => i !== index);

        setEvents({
            ...events,
            [date]: updated
        });

    } catch(error){

    console.log(error);

    console.log(error.response);

    alert("Delete failed");

}
};

const registerEvent = async (eventId) => {

  try {

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){

alert("Login Required");

return;

}

    await axios.post(
      "http://localhost:8000/registrations/create",
      {
        userId: user.id,
        eventId: eventId
      }
    );

    alert("Registered Successfully");

  } catch (error) {

    console.log(error);

    alert("Registration Failed");
  }
};

  const renderDays = () => {
    const arr = [];

    for (let i = 0; i < firstDay; i++) {
      arr.push(<div key={"e" + i}></div>);
    }

    for (let d = 1; d <= days; d++) {
      const k = key(d);

      arr.push(
        <div className="day" key={d} onClick={() => open(d)}>
          {d}
          {events[k] && <div className="dot"></div>}
        </div>
      );
    }

    return arr;
  };

  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={
          <Login
            login={login}
            setLogin={setLogin}
            loginUser={loginUser}
          />
        } />

        <Route path="/signup" element={
          <Signup
            signup={signup}
            setSignup={setSignup}
            createAccount={createAccount}
          />
        } />

<Route
path="/dashboard"
element={
localStorage.getItem("token")
?

<Dashboard
events={events}
deleteEvent={deleteEvent}
registerEvent={registerEvent}
loading={loading}
/>

:

<Navigate to="/login"/>

}
/>

<Route
path="/my-registrations"
element={
localStorage.getItem("token")
?

<MyRegistrations/>

:

<Navigate to="/login"/>

}
/>

<Route
path="/calendar"
element={
localStorage.getItem("token")
?

<Calendar
months={months}
month={month}
year={year}
changeMonth={changeMonth}
renderDays={renderDays}
show={show}
selected={selected}
setShow={setShow}
saveEvent={saveEvent}
setTitle={setTitle}
setDesc={setDesc}
setStartTime={setStartTime}
setEndTime={setEndTime}
setVenue={setVenue}
loading={loading}
/>

:

<Navigate to="/login"/>

}
/>

<Route
path="/search"
element={
<EventSearch/>
}
/>
      </Routes>
    </HashRouter>
  );
}