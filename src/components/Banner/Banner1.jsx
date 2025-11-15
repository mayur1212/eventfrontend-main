import React, { useRef, useEffect } from "react";
import firstVideo from "../../assets/firstvideo.mp4";

const Banner1 = () => {
  const videoRef = useRef(null);

  const handleAutoplay = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 16;

    videoRef.current.play().catch(() => {
      console.warn("Autoplay blocked. Waiting for user click...");
    });
  };

  // Force user-click fallback if autoplay is blocked
  useEffect(() => {
    const handleUserClick = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      // remove listener after first click
      document.removeEventListener("click", handleUserClick);
    };

    document.addEventListener("click", handleUserClick);

    return () => {
      document.removeEventListener("click", handleUserClick);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime < 16) {
      videoRef.current.currentTime = 16;
    }
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <video
        ref={videoRef}
        src={firstVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleAutoplay}
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, padding: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 4rem)",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.4,
            margin: 0,
            WebkitTextStroke: "2px black",
            textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          A GLOBAL ROBOTICS COMMUNITY <br />
          PREPARING YOUNG PEOPLE FOR THE FUTURE
        </h1>
      </div>
    </section>
  );
};

export default Banner1;
