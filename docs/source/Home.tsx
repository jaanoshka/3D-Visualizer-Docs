import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import video1 from "../HomeScreenAnimation.mp4";
import "./Home.css"; // Import your CSS file

// Zuerst werden alle notwendigen Anlagen wie z.B Styles oder img-files importiert
function HOME(): JSX.Element {
  // Event-Handler für den "START"-Button, der zur "CreateNew"-Seite weiterleitet
  const handleStartClick = () => {
    window.location.href = "/CreateNew"; // Weiterleitung zur Seite "CreateNew"
  };

  return (
    <div className="home-container">
      {/* Container für das Hintergrundbild */}
      <div className="background-image-container">
        <img src={img1} alt="Background" className="background-image" />
      </div>
      
      {/* Container für den Hauptinhalt */}
      <div className="content-container">
        {/* Logo-Container mit Links zu externen Seiten */}
        <div className="logo-container">
          <div className="logo-img-container">
            {/* Link zur Universität Würzburg */}
            <a
              href="https://www.uni-wuerzburg.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={img2} alt="Universitätslogo" className="logo-img" />
            </a>
          </div>
          <div className="logo-img-container">
            {/* Link zu Greenventory */}
            <a
              href="https://greenventory.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={img3} alt="Greenventory Logo" className="logo-img" />
            </a>
          </div>
        </div>

        {/* Textfeld für eine kurze Beschreibung */}
        <div className="description-container">
          <p className="description-text">
            Willkommen auf unserer Website! Hier können Sie unsere Funktionen
            erkunden und großartige Dinge entdecken. Klicken Sie unten auf den
            <strong> START </strong>-Button, um Ihre Reise zu beginnen!
          </p>
        </div>

        {/* Container für den "START"-Button und das Video */}
        <div className="button-video-container">
          {/* START-Button */}
          <button className="start-button" onClick={handleStartClick}>
            START
          </button>

          {/* Videoanzeige */}
          <div className="video-monitor">
            <video className="video-element" autoPlay loop muted>
              <source src="/HomScreenAnimation.mp4" type="video/mp4" />
              Ihr Browser unterstützt das Video-Tag nicht.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HOME;
