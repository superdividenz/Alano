import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { FaHourglassHalf, FaExclamationTriangle } from "react-icons/fa";

const TOTAL_SEATS = 600;

const SignupProgress = () => {
  const [reservedSeats, setReservedSeats] = useState(0);
  const [displaySeats, setDisplaySeats] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ticket_transactions"), (snapshot) => {
      const totalReserved = snapshot.docs.reduce((sum, doc) => {
        return sum + (doc.data().qty || 1);
      }, 0);
      setReservedSeats(totalReserved);
    });

    return () => unsubscribe();
  }, []);

  // Animate displaySeats when reservedSeats changes
  useEffect(() => {
    let start = displaySeats;
    let end = reservedSeats;
    if (start === end) return;

    const duration = 800;
    const stepTime = 20;
    const increment = (end - start) / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        start = end;
        clearInterval(timer);
      }
      setDisplaySeats(Math.round(start));
    }, stepTime);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservedSeats]);

  const progress = Math.min((reservedSeats / TOTAL_SEATS) * 100, 100);

  const barColor =
    progress >= 90
      ? "from-red-400 to-red-600"
      : progress >= 75
      ? "from-yellow-400 to-yellow-600"
      : "from-blue-400 to-blue-600";

  const remainingSeats = TOTAL_SEATS - displaySeats;

  return (
    <div className="w-full max-w-lg mx-auto mt-6 rounded-xl shadow-lg text-center bg-white p-6">
      <div className="flex items-center justify-center gap-2 mb-3 text-blue-700">
        <FaHourglassHalf className="text-3xl animate-pulse" />
        <h2 className="text-xl font-bold">
          {displaySeats} / {TOTAL_SEATS} Seats Reserved
        </h2>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${barColor} h-4 transition-all duration-500`}
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 6px rgba(0,0,0,0.3)",
          }}
        ></div>
      </div>

      <p className="text-sm text-gray-700 mt-2 font-medium">
        {remainingSeats > 0 ? `${remainingSeats} seats remaining` : "Sold Out!"}
      </p>

      {remainingSeats > 0 && remainingSeats <= 50 && (
        <div className="mt-3 flex items-center justify-center gap-2 text-red-600 animate-pulse font-semibold">
          <FaExclamationTriangle className="text-lg" />
          Seats are filling fast!
        </div>
      )}
    </div>
  );
};

export default SignupProgress;
