import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UpcomingPage = () => {
  const defaultDuration = 90 * 60 * 60;

  const getStoredTime = () => {
    const savedEndTime = localStorage.getItem("maintenanceEndTime");
    if (savedEndTime) {
      const remainingTime = Math.floor((savedEndTime - Date.now()) / 1000);
      return remainingTime > 0 ? remainingTime : defaultDuration;
    }
    return defaultDuration;
  };

  const [timeLeft, setTimeLeft] = useState(getStoredTime);

  useEffect(() => {
    if (!localStorage.getItem("maintenanceEndTime")) {
      localStorage.setItem("maintenanceEndTime", Date.now() + defaultDuration * 1000);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          toast("Maintenance extended! Restarting countdown.");
          localStorage.setItem("maintenanceEndTime", Date.now() + defaultDuration * 1000);
          return defaultDuration;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col justify-center items-center">
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Maintenance Logo"
        className="mb-8 h-40"
      />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">
        Site is under maintenance
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-4">
        We're working hard to improve the user experience. Stay tuned!
      </p>
      <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-semibold mb-6">
        Estimated Time Remaining: <span className="text-red-500">{formatTime(timeLeft)}</span>
      </p>
      <div className="flex space-x-4">
        <Link
          to="/contact-us"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Contact Us
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="border-2 border-gray-800 text-black font-bold py-3 px-6 rounded dark:text-white dark:border-white"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default UpcomingPage;
