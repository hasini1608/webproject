import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Calendar from "./components/Calendar.jsx";

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
  const loginUser = (navigate) => {
    const user = users.find(
      u => u.email === login.email && u.password === login.password
    );

    if (user) navigate("/dashboard");
    else alert("Invalid login");
  };

  /* SIGNUP */
  const createAccount = (navigate) => {
    if (!signup.first || !signup.last || !signup.email || !signup.password) {
      alert("Fill all fields");
      return;
    }

    if (signup.password !== signup.confirm) {
      alert("Passwords do not match");
      return;
    }

    setUsers([...users, signup]);
    alert("Account created!");
    navigate("/login");
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

  
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const fakeData = {
        "2026-3-28": [
          { title: "Exam", desc: "DSA test" }
        ]
      };

      setEvents(fakeData);
      setLoading(false);
    }, 1500);

  }, []);

  const key = (d) => `${year}-${month + 1}-${d}`;

  const open = (d) => {
    setSelected(d);
    setShow(true);
  };

  const saveEvent = () => {
    const k = key(selected);

    const ev = { title, desc, date: k };

    setEvents({
      ...events,
      [k]: events[k] ? [...events[k], ev] : [ev]
    });

    setTitle("");
    setDesc("");
    setShow(false);
  };

  const deleteEvent = (date, index) => {
    const updated = events[date].filter((_, i) => i !== index);
    setEvents({ ...events, [date]: updated });
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
    <BrowserRouter>
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

        <Route path="/dashboard" element={
          <Dashboard
            events={events}
            deleteEvent={deleteEvent}
            loading={loading}
          />
        } />

        <Route path="/calendar" element={
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
            loading={loading}
          />
        } />

      </Routes>
    </BrowserRouter>
  );
}