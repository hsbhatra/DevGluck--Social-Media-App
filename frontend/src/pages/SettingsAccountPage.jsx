import React from "react";

const options = [
  "Edit Profile",
  "Username",
  "Change Password",
  "Email Address",
  "Phone Number",
  "Connected Accounts (Facebook, Google)",
  "Download My Data",
  "Deactivate Account",
  "Delete Account"
];

const SettingsAccountPage = () => {
  const handleClick = (option) => {
    alert(`You clicked: ${option}`);
  };
  return (
    <div className="max-w-2xl mx-auto p-3 sm:p-6 overflow-x-hidden">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Account Settings</h2>
      <ul className="space-y-3 sm:space-y-4">
        {options.map((option) => (
          <li
            key={option}
            className={`p-3 sm:p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer transition-colors text-sm sm:text-base ${
              option === "Deactivate Account" || option === "Delete Account" ? "text-red-500" : ""
            }`}
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsAccountPage;
