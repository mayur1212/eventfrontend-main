import React, { useRef, useEffect } from "react";
import FirstVideo from "../../assets/firstvideo.mp4";

// Logos imports remain same...

const FirstSupport = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Try autoplay
    video.play().catch(() => {
      const playOnClick = () => {
        if (videoRef.current) videoRef.current.play();
        document.removeEventListener("click", playOnClick);
      };

      document.addEventListener("click", playOnClick, { once: true });
    });

    return () => {
      // cleanup event listener
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">

        {/* LEFT SECTION same code */}

        {/* ✅ RIGHT VIDEO FIXED */}
        <div className="flex-1 w-full max-w-lg relative group">
          <video
            ref={videoRef}
            src={FirstVideo}
            className="w-full h-full rounded-xl shadow-2xl border-4 border-blue-100 object-cover transition-transform transform group-hover:scale-105"
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* Overlay Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-6xl opacity-20">▶</span>
          </div>
        </div>
      </div>

      {/* LOGOS SECTION SAME CODE */}
    </section>
  );
};

export default FirstSupport;
