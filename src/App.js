import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

const calculateYearsOnTelegram = (joinDate) => {
  const joinYear = new Date(joinDate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - joinYear > 0 ? currentYear - joinYear : 1;
};

const TelegramUserInfo = () => {
  const [user, setUser] = useState(null);
  const [yearsOnTelegram, setYearsOnTelegram] = useState(1);

  useEffect(() => {
    const userData = WebApp.initDataUnsafe?.user;
    if (userData) {
      setUser(userData);
      const joinDate = new Date(userData.created_at * 1000); // assuming UNIX timestamp
      const years = calculateYearsOnTelegram(joinDate);
      setYearsOnTelegram(years);
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
        <strong>Time on Telegram:</strong> {yearsOnTelegram} years
      </p>
    </div>
  );
};

export default TelegramUserInfo;
