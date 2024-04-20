const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "General Physician",
    available_days: ["Monday", "Wednesday", "Friday"],
    consultation_limit: 10
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    available_days: ["Tuesday", "Thursday", "Saturday"],
    consultation_limit: 8
  }
];

// Endpoint for listing doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Endpoint for getting doctor detail
app.get('/api/doctors/:doctor_id', (req, res) => {
  const doctorId = parseInt(req.params.doctor_id);
  const doctor = doctors.find(doc => doc.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }
  res.json(doctor);
});

// Endpoint for getting doctor's availability
app.get('/api/doctors/:doctor_id/availability', (req, res) => {
  const doctorId = parseInt(req.params.doctor_id);
  const doctor = doctors.find(doc => doc.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  // logic for availability (always available in the evenings)
  const date = req.query.date;
  const availableSlots = ["18:00", "18:30", "19:00", "19:30"]; // Dummy slots
  res.json({
    doctor_id: doctorId,
    date: date,
    available_slots: availableSlots
  });
});

// Endpoint for booking appointment
app.post('/api/appointments/book', (req, res) => {
  const { doctor_id, patient_name, date, time } = req.body;
  //logic for booking appointment
  console.log(`Booking appointment with Doctor ${doctor_id} for ${patient_name} on ${date} at ${time}`);
  res.json({ success: true, message: "Appointment booked successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
