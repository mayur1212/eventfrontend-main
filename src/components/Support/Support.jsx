import React, { useState, useEffect, useRef } from "react";
import supportBg from "../../assets/page-background.png";
import bu1 from "../../assets/bu1.jpg";
import bu2 from "../../assets/bu2.jpg";
import bu3 from "../../assets/bu3.jpg";

const Support = () => {
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true); // trigger animation when component is in viewport
          observer.unobserve(containerRef.current); // optional: animate only once
        }
      },
      {
        threshold: 0.3, // trigger when 30% of the component is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const sectionStyle = {
    position: "relative",
    padding: "80px 20px",
    fontFamily: "'Poppins', sans-serif",
    overflow: "hidden",
    backgroundImage: `url(${supportBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const diagonalStyle = (color, top, left, rotate) => ({
    position: "absolute",
    top,
    left,
    width: "200px",
    height: "500px",
    backgroundColor: color,
    transform: `rotate(${rotate}deg)`,
    zIndex: 0,
    opacity: 0.8,
  });

  const containerStyle = {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  };

  const cardStyle = (direction, delay = 0) => ({
    background: "#fff",
    width: "300px",
    padding: "20px",
    boxShadow: "20px 20px 0px #222",
    transform: `skewY(-2deg) translateX(${animate ? "0" : direction})`,
    opacity: animate ? 1 : 0,
    transition: `transform 1s ease ${delay}s, opacity 1s ease ${delay}s, box-shadow 0.3s`,
    borderRadius: "8px",
    cursor: "pointer",
  });

  const cardInnerStyle = {
    transform: "skewY(2deg)",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "6px",
    marginBottom: "15px",
  };

  const headingStyle = {
    fontSize: "1.4em",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#111",
    letterSpacing: "0.5px",
  };

  const paragraphStyle = {
    fontSize: "0.95em",
    marginBottom: "15px",
    lineHeight: "1.6",
    color: "#444",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 18px",
    fontWeight: "600",
    borderRadius: "6px",
    display: "inline-block",
    transition: "all 0.3s ease",
  };

  return (
    <div style={sectionStyle} ref={containerRef}>
      {/* Diagonal colorful background shapes */}
      <div style={diagonalStyle("#00c4cc", "0", "0", 45)}></div>
      <div style={diagonalStyle("#ff00aa", "50%", "20%", -45)}></div>
      <div style={diagonalStyle("#ffdd00", "0", "80%", 45)}></div>

      <div style={containerStyle}>
        {/* Card 1 - slide from left */}
        <div style={cardStyle("-150%", 0)}>
          <div style={cardInnerStyle}>
            <img src={bu1} alt="Building Robots" style={imageStyle} />
            <h3 style={headingStyle}>Building more than robots</h3>
            <p style={paragraphStyle}>
              Supported by an industry mentor, teams of young people design and build a robot to compete in tournaments and earn awards.
            </p>
            <a
              href="#"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              About the challenge
            </a>
          </div>
        </div>

        {/* Card 2 - slide from right */}
        <div style={cardStyle("150%", 0.2)}>
          <div style={cardInnerStyle}>
            <img src={bu2} alt="Inclusive STEM" style={imageStyle} />
            <h3 style={headingStyle}>Making STEM more inclusive</h3>
            <p style={paragraphStyle}>
              We work with schools and youth groups to provide underserved young people with access to the knowledge and tools to thrive.
            </p>
            <a
              href="#"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Register your interest
            </a>
          </div>
        </div>

        {/* Card 3 - slide from left */}
        <div style={cardStyle("-150%", 0.4)}>
          <div style={cardInnerStyle}>
            <img src={bu3} alt="Supporting Those in Need" style={imageStyle} />
            <h3 style={headingStyle}>Supporting those who need it most</h3>
            <p style={paragraphStyle}>
              We provide equipment bursaries and travel awards to make STEM inclusive and accessible for those who’ll benefit most.
            </p>
            <a
              href="#"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Access funding
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
