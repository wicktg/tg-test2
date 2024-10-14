import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

// Calculate the exact number of days the user has been on Telegram
const calculateDaysOnTelegram = (joinDate) => {
  const currentDate = new Date();
  const diffInTime = currentDate - joinDate;
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24)); // Convert time difference to days
  return diffInDays > 0 ? diffInDays : 1;
};

const TelegramUserInfo = () => {
  const [user, setUser] = useState(null);
  const [daysOnTelegram, setDaysOnTelegram] = useState(1);

  useEffect(() => {
    const userData = WebApp.initDataUnsafe?.user;
    if (userData) {
      setUser(userData);
      const joinDate = new Date(userData.created_at * 1000); // assuming UNIX timestamp
      const days = calculateDaysOnTelegram(joinDate);
      setDaysOnTelegram(days);
    }
  }, []);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-2">User Information</h2>
      <p>
        <strong>Username:</strong> {user.username || "N/A"}
      </p>
      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name || "N/A"}
      </p>
      <p>
        <strong>Time on Telegram:</strong> {daysOnTelegram} days
      </p>
    </div>
  );
};

export default TelegramUserInfo;
