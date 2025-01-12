import { useEffect, useState } from "react";

const TimeDisplay = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update time immediately and set an interval
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#000" }}>{time}</h3>
  );
};

export default TimeDisplay;
