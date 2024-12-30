import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { useState } from "react";
import React, { ChangeEvent } from "react";
import "./CreateNew.css";

function CreateNew(): JSX.Element {
  // State variables to manage user input values
  const [vNorthing, setVNorthing] = useState("xxx");
  const [vEasting, setVEasting] = useState("");
  const [vStreet, setVStreet] = useState("");
  const [vNumber, setVNumber] = useState("");
  const [vCity, setVCity] = useState("");
  const [vZIP, setVZIP] = useState("");

  // Handlers to update state variables when input values change
  const handleChangeNorthing = (event: ChangeEvent<HTMLInputElement>) => {
    setVNorthing(event.target.value);
  };

  const handleChangeEasting = (event: ChangeEvent<HTMLInputElement>) => {
    setVEasting(event.target.value);
  };

  const handleChangeStreet = (event: ChangeEvent<HTMLInputElement>) => {
    setVStreet(event.target.value);
  };

  const handleChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setVNumber(event.target.value);
  };

  const handleChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    setVCity(event.target.value);
  };

  const handleChangeZIP = (event: ChangeEvent<HTMLInputElement>) => {
    setVZIP(event.target.value);
  };

  // Function to handle the submission of data to the backend
  const handleSubmit = async () => {
    // Prepare the address object to send to the backend
    const AdresseFront = {
      street: vStreet,
      number: vNumber,
      city: vCity,
      zipCode: vZIP,
    };

    try {
      // Send a POST request to the backend with the address data
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AdresseFront),
      });

      // Parse the response from the server
      const result = await response.json();
      console.log("Server Response:", result);
      alert("Data successfully sent to the backend!");
    } catch (error) {
      // Handle errors during the fetch operation
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container">
      {/* Title for the input form */}
      <h1>Please enter the coordinates and address</h1>
      
      {/* Container for input fields */}
      <div className="input-container">
        {/* Input field for Northing */}
        <div className="input-group">
          <label>Northing:</label>
          <input
            type="text"
            value={vNorthing}
            onChange={handleChangeNorthing}
          />
        </div>

        {/* Input field for Easting */}
        <div className="input-group">
          <label>Easting:</label>
          <input type="text" value={vEasting} onChange={handleChangeEasting} />
        </div>

        {/* Input field for Street */}
        <div className="input-group">
          <label>Street:</label>
          <input type="text" value={vStreet} onChange={handleChangeStreet} />
        </div>

        {/* Input field for Number */}
        <div className="input-group">
          <label>Number:</label>
          <input type="text" value={vNumber} onChange={handleChangeNumber} />
        </div>

        {/* Input field for City */}
        <div className="input-group">
          <label>City:</label>
          <input type="text" value={vCity} onChange={handleChangeCity} />
        </div>

        {/* Input field for ZIP Code */}
        <div className="input-group">
          <label>ZIP Code:</label>
          <input type="text" value={vZIP} onChange={handleChangeZIP} />
        </div>

        {/* Submit button to send the data */}
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Container for logos with links */}
      <div className="images-container">
        {/* Link to the University of Würzburg */}
        <a
          href="https://www.uni-wuerzburg.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={img2} alt="Image 2" className="image" />
        </a>
        
        {/* Link to Greenventory */}
        <a
          href="https://greenventory.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={img3} alt="Image 3" className="image" />
        </a>
      </div>
    </div>
  );
}

export default CreateNew;



