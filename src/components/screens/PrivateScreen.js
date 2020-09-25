import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';
import Overview from "./../pages/Overview";


const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      history.pushState("/login");
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("http://localhost:8000/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };

    fetchPrivateDate();
  }, [history]);
  
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  }
  

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
    <Overview />
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <button className="logout-btn" onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default PrivateScreen;