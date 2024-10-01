import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "./baseUrl";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: 0,
    hireDate: new Date(),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveEmployee = () => {
    axios
      .post(`${baseUrl}/api/employees`, employee)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the employee:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Create New Employee
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              value={employee.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={employee.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              value={employee.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              value={employee.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="department" className="text-gray-700 font-medium">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="HR, Marketing, IT"
              value={employee.department}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="position" className="text-gray-700 font-medium">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Manager, Developer"
              value={employee.position}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="salary" className="text-gray-700 font-medium">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              placeholder="50000"
              value={employee.salary}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={saveEmployee}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Save Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
