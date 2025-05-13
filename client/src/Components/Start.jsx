import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="p-5 rounded-lg w-1/3 bg-white shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-6">Login As</h2>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-2"
            onClick={() => navigate("/employee_login")}
          >
            Employee
          </button>
          <button
            type="button"
            className="w-full py-3 text-white bg-green-500 hover:bg-green-600 rounded-md ml-2"
            onClick={() => navigate("/adminlogin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
