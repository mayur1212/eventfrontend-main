import React, { useEffect, useRef, useState } from "react";
import { Globe2, Handshake, GraduationCap, Atom } from "lucide-react";

const Global = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const cardRefs = useRef([]);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);

  const stats = [
    {
      id: 1,
      icon: <Globe2 className="w-14 h-14 text-blue-600 animate-bounce" />,
      number: 3200000,
      text: "participants since 1989",
    },
    {
      id: 2,
      icon: <Handshake className="w-14 h-14 text-green-500 animate-pulse" />,
      number: 110,
      text: "countries with FIRST Robotics teams",
    },
    {
      id: 3,
      icon: <GraduationCap className="w-14 h-14 text-yellow-500 animate-spin-slow" />,
      number: 83,
      text: "% of alumni declare STEM majors by 4th year",
    },
    {
      id: 4,
      icon: <Atom className="w-14 h-14 text-red-500 animate-bounce" />,
      number: 96,
      text: "% of students persevere despite challenges",
    },
  ];

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, i) =>
          val < stats[i].number ? val + Math.ceil(stats[i].number / 100) : stats[i].number
        )
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Parallax scroll for background dots
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (dot1Ref.current) dot1Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      if (dot2Ref.current) dot2Ref.current.style.transform = `translateY(-${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-12 lg:px-20">
      {/* Background dots */}
      <div
        ref={dot1Ref}
        className="absolute top-10 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-40 blur-3xl"
      ></div>
      <div
        ref={dot2Ref}
        className="absolute bottom-10 right-10 w-24 h-24 bg-pink-100 rounded-full opacity-40 blur-3xl"
      ></div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Inspiring Generations of <span className="text-blue-600">Global Citizens</span>
        </h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-3xl transform transition duration-500 hover:shadow-2xl hover:scale-105 opacity-0 translate-y-12"
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="transition-transform duration-500 hover:scale-125">{stat.icon}</div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {counts[index].toLocaleString()}+
            </p>
            <p className="text-gray-700 text-sm md:text-base">{stat.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105">
          Find More Facts
        </button>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0px) !important;
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .grid {
            gap: 6 !important;
          }
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Global;
