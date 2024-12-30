import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { useState } from "react";
import React, { ChangeEvent } from "react";
import "./CreateNew.css";

function CreateNew(): JSX.Element {
  const [vNorthing, setVNorthing] = useState("xxx");
  const [vEasting, setVEasting] = useState("");
  const [vStreet, setVStreet] = useState("");
  const [vNumber, setVNumber] = useState("");
  const [vCity, setVCity] = useState("");
  const [vZIP, setVZIP] = useState("");

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

  const handleSubmit = async () => {
    const AdresseFront = {
      street: vStreet,
      number: vNumber,
      city: vCity,
      zipCode: vZIP,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AdresseFront),
      });

      const result = await response.json();
      console.log("Server-Antwort:", result);
      alert("Daten erfolgreich an das Backend gesendet!");
    } catch (error) {
      console.error("Fehler beim Senden der Daten:", error);
    }
  };

  return (
    <div className="container">
      <h1>Bitte geben Sie die Koordinaten und Adresse ein</h1>
      <div className="input-container">
        <div className="input-group">
          <label>Northing:</label>
          <input
            type="text"
            value={vNorthing}
            onChange={handleChangeNorthing}
          />
        </div>

        <div className="input-group">
          <label>Easting:</label>
          <input type="text" value={vEasting} onChange={handleChangeEasting} />
        </div>

        <div className="input-group">
          <label>Street:</label>
          <input type="text" value={vStreet} onChange={handleChangeStreet} />
        </div>

        <div className="input-group">
          <label>Number:</label>
          <input type="text" value={vNumber} onChange={handleChangeNumber} />
        </div>

        <div className="input-group">
          <label>City:</label>
          <input type="text" value={vCity} onChange={handleChangeCity} />
        </div>

        <div className="input-group">
          <label>ZIP Code:</label>
          <input type="text" value={vZIP} onChange={handleChangeZIP} />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="images-container">
        <a
          href="https://www.uni-wuerzburg.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={img2} alt="Image 2" className="image" />
        </a>
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
