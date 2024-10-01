const express = require("express");
const router = express.Router();
const Employee = require("../model/employeeSchema");

// Get all employees
router.get("/employees", (req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Create a new employee
router.post("/employees", (req, res) => {
  const newEmployee = new Employee(req.body);
  newEmployee
    .save()
    .then((employee) => res.status(201).json(employee))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Update an employee
router.put("/employees/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((employee) => res.json(employee))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete an employee
router.delete("/employees/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Employee deleted" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Record attendance
router.post("/employees/:id/attendance", (req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      employee.attendance.push(req.body);
      return employee.save();
    })
    .then((employee) => res.json(employee))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Apply for leave
router.post("/employees/:id/leaves", (req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      employee.leaves.push(req.body);
      return employee.save();
    })
    .then((employee) => res.json(employee))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;