import React from "react";

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}
const Header = ({ isAdmin, setIsAdmin }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Inventory Stat</h1>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium">
          {isAdmin ? "Admin" : "User"}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-500 transition-all"></div>
          <div
            className="absolute w-5 h-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-5"
            style={{ top: "0.15rem", left: "0.25rem" }}
          ></div>
        </label>
      </div>
    </header>
  );
};

export default Header;
