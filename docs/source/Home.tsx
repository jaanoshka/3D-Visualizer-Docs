import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import video1 from "../HomeScreenAnimation.mp4";
import "./Home.css"; // Import your CSS file

function HOME(): JSX.Element {
  const handleStartClick = () => {
    window.location.href = "/CreateNew"; // Redirect to CreateNew page
  };

  return (
    <div className="home-container">
      <div className="background-image-container">
        <img src={img1} alt="Background" className="background-image" />
      </div>
      <div className="content-container">
        <div className="logo-container">
          <div className="logo-img-container">
            <a
              href="https://www.uni-wuerzburg.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={img2} alt="University Logo" className="logo-img" />
            </a>
          </div>
          <div className="logo-img-container">
            <a
              href="https://greenventory.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={img3} alt="Greenventory Logo" className="logo-img" />
            </a>
          </div>
        </div>
        {/* Text Field for Description */}
        <div className="description-container">
          <p className="description-text">
            Welcome to our website! Here you can explore our features and
            discover amazing things. Click on the <strong>START</strong> button
            below to begin your journey!
          </p>
        </div>
        {/* Start Button and Video Container */}
        <div className="button-video-container">
          <button className="start-button" onClick={handleStartClick}>
            START
          </button>
          <div className="video-monitor">
            <video className="video-element" autoPlay loop muted>
              <source src="/HomScreenAnimation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HOME;
