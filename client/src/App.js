import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";
import baseUrl from "./baseUrl";

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [stockData, setStockData] = useState([]);

  // Fetch users and employees on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/get-users`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // Example data for stock chart (you can replace it with actual API data)
    setStockData([
      { name: "Jan", stock: 4000 },
      { name: "Feb", stock: 3000 },
      { name: "Mar", stock: 2000 },
      { name: "Apr", stock: 2780 },
      { name: "May", stock: 1890 },
      { name: "Jun", stock: 2390 },
      { name: "Jul", stock: 3490 },
    ]);

    fetchUsers();
    fetchEmployees();
  }, []);

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: User List and Stock Data */}
        <div className="w-full max-w-3xl">
          {/* User List Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">User List</h1>
              <button
                onClick={() => navigate("create")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Create New User
              </button>
            </div>
            {users && users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Last Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`${index % 2 ? "bg-gray-100" : ""}`}
                      >
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.lastName}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No users found.</p>
            )}
          </div>

          {/* Stock Data Card with Graph */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Stock Data</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={stockData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section: Employee List and Statistics */}
        <div className="w-full max-w-3xl">
          {/* Employee List Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
              <button
                onClick={() => navigate("employee")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Create Employee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr
                      key={employee._id}
                      className={`${index % 2 ? "bg-gray-50" : ""} border-b`}
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {employee.firstName} {employee.lastName}
                      </td>
                      <td className="py-3 px-4">{employee.department}</td>
                      <td className="py-3 px-4">{employee.position}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteEmployee(employee._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {users.length}
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Employees
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {employees.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
