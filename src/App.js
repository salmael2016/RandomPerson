import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random");
  const getPerson = async () => {
    setLoading(true);
    const response = await fetch(url);
    const results = await response.json();
    const person = results.results[0];
    const { first, last } = person.name;
    const {
      street: { number, name },
    } = person.location;
    const {
      dob: { age },
    } = person;
    const {
      picture: { large },
    } = person;
    const { email, phone } = person;
    const {
      login: { password },
    } = person;
    const newPerson = {
      name: `${first} ${last}`,
      age: age,
      street: `${number} ${name}`,
      email: email,
      phone: phone,
      image: large,
      password: password,
    };

    setPerson(newPerson);
    setLoading(false);
  };
  const handleHover = (e) => {
    if (e.target.classList.contains("icon")) {
      const title = e.target.dataset.label;
      const value = person[title];
      setTitle(title);
      setValue(person[title]);
    }
  };
  const getRandomUser = () => {
    getPerson();
  };
  useEffect(() => {
    getPerson();
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          ></img>
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleHover}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleHover}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleHover}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleHover}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleHover}
            >
              <FaPhone />
            </button>

            <button
              className="icon"
              data-label="password"
              onMouseOver={handleHover}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="btn" onClick={getRandomUser}>
            {loading ? "Loading ..." : "Random User"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
