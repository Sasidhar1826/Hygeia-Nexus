import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import bcrypt from "bcryptjs";

// Import models
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Admin from "../models/Admin.js";
import LabTechnician from "../models/LabTechnician.js";
import Department from "../models/Department.js";
import Appointment from "../models/Appointment.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(colors.cyan.underline("\nMongoDB Connected"));
    seedDatabase();
  })
  .catch((err) => {
    console.error(colors.red(`Error connecting to MongoDB: ${err.message}`));
    process.exit(1);
  });

// Password hashing function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Main seeding function
async function seedDatabase() {
  try {
    console.log(colors.yellow("\nStarting database seeding...\n"));

    // Clear existing data
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Admin.deleteMany({});
    await LabTechnician.deleteMany({});
    await Department.deleteMany({});
    await Appointment.deleteMany({});

    console.log(colors.blue("Cleared existing data"));

    // Create departments
    const departments = await Department.insertMany([
      {
        name: "Cardiology",
        description: "Heart and cardiovascular system specialists",
        location: "Building A, Floor 2",
      },
      {
        name: "Neurology",
        description: "Brain, spine, and nervous system specialists",
        location: "Building B, Floor 3",
      },
      {
        name: "Pediatrics",
        description: "Children healthcare specialists",
        location: "Building C, Floor 1",
      },
      {
        name: "Orthopedics",
        description: "Bone and joint specialists",
        location: "Building A, Floor 3",
      },
      {
        name: "Dermatology",
        description: "Skin specialists",
        location: "Building D, Floor 2",
      },
      {
        name: "Ophthalmology",
        description: "Eye care specialists",
        location: "Building D, Floor 1",
      },
      {
        name: "Psychiatry",
        description: "Mental health specialists",
        location: "Building B, Floor 2",
      },
    ]);

    console.log(colors.green(`Created ${departments.length} departments`));

    // Generate random profile image helper function
    const generateProfileImage = (gender) => {
      const index = Math.floor(Math.random() * 100);
      return `https://randomuser.me/api/portraits/${
        gender === "male" ? "men" : "women"
      }/${index}.jpg`;
    };

    // Create admin
    const adminPassword = await hashPassword("admin123");
    const admin = await Admin.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // Will be hashed by pre-save hook
      phone: "9876543210",
      staffId: "ADMIN-001",
      position: "System Administrator",
      profileImage: generateProfileImage("male"),
      isActive: true,
      isSuperAdmin: true,
    });

    console.log(`Created admin user with ID: ${admin._id}`);
    console.log(`Admin properties:`, {
      email: admin.email,
      isActive: admin.isActive,
      isSuperAdmin: admin.isSuperAdmin,
      staffId: admin.staffId,
      profileImage: admin.profileImage,
    });

    // Create doctors (without 'Dr.' prefix)
    const doctorPassword = await hashPassword("doctor123");
    const doctors = await Doctor.insertMany([
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: doctorPassword,
        phone: "9876543201",
        gender: "female",
        profileImage: generateProfileImage("female"),
        dateOfBirth: new Date("1980-05-15"),
        specialty: "Cardiologist",
        department: departments[0]._id, // Cardiology
        qualifications: [
          { degree: "MD", institution: "AIIMS", year: 2010 },
          { degree: "MBBS", institution: "Delhi Medical College", year: 2005 },
        ],
        experience: 10,
        licenseNumber: "MED-12345",
        consultationFee: 1500,
        isActive: true,
      },
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: doctorPassword,
        phone: "9876543202",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1975-10-20"),
        specialty: "Neurologist",
        department: departments[1]._id, // Neurology
        qualifications: [
          { degree: "MD", institution: "NIMHANS", year: 2005 },
          {
            degree: "MBBS",
            institution: "St. Johns Medical College",
            year: 2000,
          },
          { degree: "PhD", institution: "Harvard Medical School", year: 2010 },
        ],
        experience: 15,
        licenseNumber: "MED-23456",
        consultationFee: 2000,
        isActive: true,
      },
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        password: doctorPassword,
        phone: "9876543203",
        gender: "female",
        profileImage: generateProfileImage("female"),
        dateOfBirth: new Date("1985-03-10"),
        specialty: "Pediatrician",
        department: departments[2]._id, // Pediatrics
        qualifications: [
          { degree: "MD", institution: "JIPMER", year: 2012 },
          { degree: "MBBS", institution: "CMC Vellore", year: 2008 },
        ],
        experience: 8,
        licenseNumber: "MED-34567",
        consultationFee: 1200,
        isActive: true,
      },
      {
        name: "Michael Chen",
        email: "michael.chen@example.com",
        password: doctorPassword,
        phone: "9876543209",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1982-06-15"),
        specialty: "Dermatologist",
        department: departments[4]._id, // Dermatology
        qualifications: [
          { degree: "MD", institution: "Johns Hopkins", year: 2009 },
          {
            degree: "MBBS",
            institution: "Stanford Medical School",
            year: 2004,
          },
        ],
        experience: 12,
        licenseNumber: "MED-45678",
        consultationFee: 1800,
        isActive: true,
      },
      {
        name: "Emily Roberts",
        email: "emily.roberts@example.com",
        password: doctorPassword,
        phone: "9876543210",
        gender: "female",
        profileImage: generateProfileImage("female"),
        dateOfBirth: new Date("1988-11-30"),
        specialty: "Orthopedic Surgeon",
        department: departments[3]._id, // Orthopedics
        qualifications: [
          { degree: "MD", institution: "Mayo Clinic", year: 2015 },
          { degree: "MBBS", institution: "UCLA Medical Center", year: 2011 },
        ],
        experience: 7,
        licenseNumber: "MED-56789",
        consultationFee: 2200,
        isActive: true,
      },
    ]);

    console.log(colors.green(`Created ${doctors.length} doctors`));

    // Create patients
    const patientPassword = await hashPassword("patient123");
    const patients = await Patient.insertMany([
      {
        name: "Amit Sharma",
        email: "amit.sharma@example.com",
        password: patientPassword,
        contactNumber: "9876543204",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1990-07-25"),
        bloodGroup: "O+",
        height: 175,
        weight: 70,
        allergies: ["Peanuts", "Penicillin"],
        existingConditions: ["Asthma"],
        aadhaarNumber: "123456789012",
        isActive: true,
        primaryDoctor: doctors[0]._id,
      },
      {
        name: "Priya Patel",
        email: "priya.patel@example.com",
        password: patientPassword,
        contactNumber: "9876543205",
        gender: "female",
        profileImage: generateProfileImage("female"),
        dateOfBirth: new Date("1988-12-15"),
        bloodGroup: "A+",
        height: 165,
        weight: 58,
        allergies: ["Shellfish"],
        existingConditions: ["Hypertension"],
        aadhaarNumber: "234567890123",
        isActive: true,
        primaryDoctor: doctors[1]._id,
      },
      {
        name: "Raj Kumar",
        email: "raj.kumar@example.com",
        password: patientPassword,
        contactNumber: "9876543206",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1995-04-30"),
        bloodGroup: "B+",
        height: 180,
        weight: 75,
        allergies: [],
        existingConditions: [],
        aadhaarNumber: "345678901234",
        isActive: true,
        primaryDoctor: doctors[2]._id,
      },
      {
        name: "Ananya Singh",
        email: "ananya.singh@example.com",
        password: patientPassword,
        contactNumber: "9876543212",
        gender: "female",
        profileImage: generateProfileImage("female"),
        dateOfBirth: new Date("1992-08-12"),
        bloodGroup: "AB+",
        height: 162,
        weight: 55,
        allergies: ["Latex", "Dust"],
        existingConditions: ["Eczema"],
        aadhaarNumber: "456789012345",
        isActive: true,
        primaryDoctor: doctors[3]._id,
      },
      {
        name: "Rahul Verma",
        email: "rahul.verma@example.com",
        password: patientPassword,
        contactNumber: "9876543213",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1985-11-05"),
        bloodGroup: "O-",
        height: 178,
        weight: 82,
        allergies: ["Sulfa drugs"],
        existingConditions: ["Diabetes Type 2"],
        aadhaarNumber: "567890123456",
        isActive: true,
        primaryDoctor: doctors[4]._id,
      },
    ]);

    console.log(colors.green(`Created ${patients.length} patients`));

    // Create lab technicians
    const labTechPassword = await hashPassword("labtech123");
    const labTechnicians = await LabTechnician.insertMany([
      {
        name: "Rahul Singh",
        email: "rahul.singh@example.com",
        password: labTechPassword,
        phone: "9876543207",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1992-08-10"),
        specialization: "Biochemistry",
        qualification: "B.Sc. Medical Lab Technology",
        experience: 5,
        licenseNumber: "LAB-12345",
        department: departments[0]._id, // Cardiology department
        isActive: true,
      },
      {
        name: "Sunita Gupta",
        email: "sunita.gupta@example.com",
        password: labTechPassword,
        phone: "9876543208",
        gender: "female",
        profileImage: generateProfileImage("female"),
        dateOfBirth: new Date("1990-11-22"),
        specialization: "Microbiology",
        qualification: "M.Sc. Medical Lab Technology",
        experience: 7,
        licenseNumber: "LAB-23456",
        department: departments[1]._id, // Neurology department
        isActive: true,
      },
      {
        name: "David Wilson",
        email: "david.wilson@example.com",
        password: labTechPassword,
        phone: "9876543211",
        gender: "male",
        profileImage: generateProfileImage("male"),
        dateOfBirth: new Date("1985-05-18"),
        specialization: "Hematology",
        qualification: "Ph.D. in Medical Laboratory Science",
        experience: 10,
        licenseNumber: "LAB-34567",
        department: departments[2]._id, // Pediatrics department
        isActive: true,
      },
    ]);

    console.log(
      colors.green(`Created ${labTechnicians.length} lab technicians`)
    );

    // Helper function to generate random time slots
    const generateTimeSlot = () => {
      const hours = [9, 10, 11, 12, 14, 15, 16, 17];
      const hourIndex = Math.floor(Math.random() * hours.length);
      const hour = hours[hourIndex];

      // Format with leading zero if needed
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

      // Start time at the hour
      const startTime = `${formattedHour}:00`;

      // End time 30 minutes later
      const endTime = `${formattedHour}:30`;

      return { startTime, endTime };
    };

    // Helper function to generate past, present, and future dates
    const generateAppointmentDate = (daysOffset) => {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      return date;
    };

    // Create appointments with proper references
    const appointmentReasons = [
      "Annual checkup",
      "Follow-up consultation",
      "New patient consultation",
      "Acute illness",
      "Chronic condition management",
      "Prescription renewal",
      "Test results review",
      "Preventive care",
    ];

    // Create a variety of appointments with different statuses
    const appointments = [];

    // Helper to create appointment status history
    const createStatusHistory = (status, userId, userType, notes) => {
      return {
        status,
        changedBy: userId,
        userType,
        timestamp: new Date(),
        notes: notes || `Appointment ${status}`,
      };
    };

    // 1. Create COMPLETED appointments (in the past)
    for (let i = 0; i < 5; i++) {
      const patientIndex = i % patients.length;
      const doctorIndex = i % doctors.length;
      const reasonIndex = i % appointmentReasons.length;
      const { startTime, endTime } = generateTimeSlot();
      const daysInPast = -(Math.floor(Math.random() * 30) + 1); // 1-30 days in the past

      const appointment = new Appointment({
        patient: patients[patientIndex]._id,
        doctor: doctors[doctorIndex]._id,
        appointmentDate: generateAppointmentDate(daysInPast),
        startTime,
        endTime,
        status: "completed",
        type: Math.random() > 0.3 ? "in-person" : "telemedicine",
        reason: appointmentReasons[reasonIndex],
        notes: "Patient visited, treatment provided.",
        statusHistory: [
          createStatusHistory(
            "pending",
            patients[patientIndex]._id,
            "Patient",
            "Initial booking"
          ),
          createStatusHistory(
            "confirmed",
            doctors[doctorIndex]._id,
            "Doctor",
            "Appointment confirmed"
          ),
          createStatusHistory(
            "completed",
            doctors[doctorIndex]._id,
            "Doctor",
            "Patient visited, treatment provided"
          ),
        ],
      });

      appointments.push(await appointment.save());
    }

    // 2. Create CONFIRMED appointments (in the future)
    for (let i = 0; i < 3; i++) {
      const patientIndex = i % patients.length;
      const doctorIndex = (i + 1) % doctors.length;
      const reasonIndex = (i + 2) % appointmentReasons.length;
      const { startTime, endTime } = generateTimeSlot();
      const daysInFuture = Math.floor(Math.random() * 14) + 1; // 1-14 days in the future

      const appointment = new Appointment({
        patient: patients[patientIndex]._id,
        doctor: doctors[doctorIndex]._id,
        appointmentDate: generateAppointmentDate(daysInFuture),
        startTime,
        endTime,
        status: "confirmed",
        type: Math.random() > 0.3 ? "in-person" : "telemedicine",
        reason: appointmentReasons[reasonIndex],
        statusHistory: [
          createStatusHistory(
            "pending",
            patients[patientIndex]._id,
            "Patient",
            "Initial booking"
          ),
          createStatusHistory(
            "confirmed",
            doctors[doctorIndex]._id,
            "Doctor",
            "Looking forward to the appointment"
          ),
        ],
      });

      appointments.push(await appointment.save());
    }

    // 3. Create PENDING appointments (awaiting confirmation)
    for (let i = 0; i < 4; i++) {
      const patientIndex = (i + 2) % patients.length;
      const doctorIndex = (i + 3) % doctors.length;
      const reasonIndex = (i + 1) % appointmentReasons.length;
      const { startTime, endTime } = generateTimeSlot();
      const daysInFuture = Math.floor(Math.random() * 21) + 7; // 7-28 days in the future

      const appointment = new Appointment({
        patient: patients[patientIndex]._id,
        doctor: doctors[doctorIndex]._id,
        appointmentDate: generateAppointmentDate(daysInFuture),
        startTime,
        endTime,
        status: "pending",
        type: Math.random() > 0.3 ? "in-person" : "telemedicine",
        reason: appointmentReasons[reasonIndex],
        statusHistory: [
          createStatusHistory(
            "pending",
            patients[patientIndex]._id,
            "Patient",
            "New appointment request"
          ),
        ],
      });

      appointments.push(await appointment.save());
    }

    // 4. Create a few CANCELLED appointments
    for (let i = 0; i < 2; i++) {
      const patientIndex = (i + 1) % patients.length;
      const doctorIndex = (i + 2) % doctors.length;
      const reasonIndex = (i + 3) % appointmentReasons.length;
      const { startTime, endTime } = generateTimeSlot();
      const daysInFuture = Math.floor(Math.random() * 10); // 0-10 days in the future

      const appointment = new Appointment({
        patient: patients[patientIndex]._id,
        doctor: doctors[doctorIndex]._id,
        appointmentDate: generateAppointmentDate(daysInFuture),
        startTime,
        endTime,
        status: "cancelled",
        type: Math.random() > 0.3 ? "in-person" : "telemedicine",
        reason: appointmentReasons[reasonIndex],
        cancellationReason: "Patient requested cancellation",
        statusHistory: [
          createStatusHistory(
            "pending",
            patients[patientIndex]._id,
            "Patient",
            "Initial booking"
          ),
          createStatusHistory(
            "confirmed",
            doctors[doctorIndex]._id,
            "Doctor",
            "Appointment confirmed"
          ),
          createStatusHistory(
            "cancelled",
            patients[patientIndex]._id,
            "Patient",
            "Need to reschedule"
          ),
        ],
      });

      appointments.push(await appointment.save());
    }

    // 5. Create a REJECTED appointment
    const rejectPatientIndex = 0;
    const rejectDoctorIndex = 4;
    const { startTime, endTime } = generateTimeSlot();

    const rejectedAppointment = new Appointment({
      patient: patients[rejectPatientIndex]._id,
      doctor: doctors[rejectDoctorIndex]._id,
      appointmentDate: generateAppointmentDate(2), // 2 days in the future
      startTime,
      endTime,
      status: "rejected",
      type: "in-person",
      reason: "Specialized consultation",
      rejectionReason:
        "Doctor requested patient to see a specialist in another department",
      statusHistory: [
        createStatusHistory(
          "pending",
          patients[rejectPatientIndex]._id,
          "Patient",
          "Need specialized care"
        ),
        createStatusHistory(
          "rejected",
          doctors[rejectDoctorIndex]._id,
          "Doctor",
          "Recommending a different specialist"
        ),
      ],
    });

    appointments.push(await rejectedAppointment.save());

    // 6. Create a NO-SHOW appointment
    const noShowPatientIndex = 3;
    const noShowDoctorIndex = 1;
    const noShowTimeSlot = generateTimeSlot();

    const noShowAppointment = new Appointment({
      patient: patients[noShowPatientIndex]._id,
      doctor: doctors[noShowDoctorIndex]._id,
      appointmentDate: generateAppointmentDate(-1), // Yesterday
      startTime: noShowTimeSlot.startTime,
      endTime: noShowTimeSlot.endTime,
      status: "no-show",
      type: "in-person",
      reason: "Follow-up for medication adjustment",
      notes: "Patient did not show up for appointment",
      statusHistory: [
        createStatusHistory(
          "pending",
          patients[noShowPatientIndex]._id,
          "Patient",
          "Need medication review"
        ),
        createStatusHistory(
          "confirmed",
          doctors[noShowDoctorIndex]._id,
          "Doctor",
          "Appointment confirmed"
        ),
        createStatusHistory(
          "no-show",
          doctors[noShowDoctorIndex]._id,
          "Doctor",
          "Patient did not attend the appointment"
        ),
      ],
    });

    appointments.push(await noShowAppointment.save());

    console.log(
      colors.green(
        `Created ${appointments.length} appointments with proper references`
      )
    );

    console.log(colors.yellow("\nDatabase seeding summary:"));
    console.log(colors.green(`Departments: ${departments.length}`));
    console.log(colors.green(`Admins: 1`));
    console.log(colors.green(`Doctors: ${doctors.length}`));
    console.log(colors.green(`Patients: ${patients.length}`));
    console.log(colors.green(`Lab Technicians: ${labTechnicians.length}`));
    console.log(colors.green(`Appointments: ${appointments.length}`));

    console.log(colors.cyan("\nSample Login Credentials:"));
    console.log(colors.yellow("Admin:"));
    console.log(colors.yellow("  Email: admin@example.com"));
    console.log(colors.yellow("  Password: admin123"));
    console.log(colors.yellow("Doctor:"));
    console.log(colors.yellow("  Email: jane.smith@example.com"));
    console.log(colors.yellow("  Password: doctor123"));
    console.log(colors.yellow("Patient:"));
    console.log(colors.yellow("  Email: amit.sharma@example.com"));
    console.log(colors.yellow("  Password: patient123"));
    console.log(colors.yellow("Lab Technician:"));
    console.log(colors.yellow("  Email: rahul.singh@example.com"));
    console.log(colors.yellow("  Password: labtech123"));

    console.log(
      colors.cyan.underline("\nDatabase seeding completed successfully!")
    );
    process.exit();
  } catch (error) {
    console.error(colors.red(`Seeding failed: ${error.message}`));
    console.error(error.stack);
    process.exit(1);
  }
}
