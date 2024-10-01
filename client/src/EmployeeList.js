import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("/api/employees").then((res) => setEmployees(res.data));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`/api/employees/${id}`).then(() => {
      setEmployees(employees.filter((employee) => employee._id !== id));
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{employee.firstName} {employee.lastName}</td>
              <td className="py-2 px-4">{employee.department}</td>
              <td className="py-2 px-4">{employee.position}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => deleteEmployee(employee._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;