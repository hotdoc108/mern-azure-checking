const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  department: String,
  position: String,
  salary: Number,
  hireDate: Date,
  attendance: [{
    date: Date,
    status: String // "Present", "Absent", "Leave"
  }],
  leaves: [{
    startDate: Date,
    endDate: Date,
    reason: String,
    status: String // "Pending", "Approved", "Rejected"
  }],
  performanceReviews: [{
    reviewDate: Date,
    rating: Number, // 1-5
    feedback: String
  }]
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;