// Mock API service for demonstration

// Mock user data
const mockUsers = [
  {
    _id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
  {
    _id: "2",
    name: "Dr. Sarah Johnson",
    email: "doctor@example.com",
    password: "password123",
    role: "doctor",
    specialization: "Cardiology",
    department: "1",
    experience: "10 years",
    contactNumber: "+1 (555) 123-4567",
    isActive: true,
    bio: "Board-certified cardiologist with 10 years of experience specializing in heart disease prevention and treatment.",
    education: "MD from Johns Hopkins University",
    consultationFee: "250",
    profileImage: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    _id: "8",
    name: "Dr. Robert Chen",
    email: "robert.chen@example.com",
    password: "password123",
    role: "doctor",
    specialization: "Neurology",
    department: "2",
    experience: "15 years",
    contactNumber: "+1 (555) 222-3333",
    isActive: true,
    bio: "Experienced neurologist specializing in stroke management and neurodegenerative disorders.",
    education:
      "MD from Stanford University, Neurology Residency at Mayo Clinic",
    consultationFee: "300",
    profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    _id: "9",
    name: "Dr. Maria Lopez",
    email: "maria.lopez@example.com",
    password: "password123",
    role: "doctor",
    specialization: "Pediatrics",
    department: "3",
    experience: "8 years",
    contactNumber: "+1 (555) 444-5555",
    isActive: true,
    bio: "Compassionate pediatrician dedicated to child health and preventive care.",
    education:
      "MD from UCLA, Pediatric Residency at Children's Hospital Los Angeles",
    consultationFee: "200",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    _id: "10",
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    password: "password123",
    role: "doctor",
    specialization: "Orthopedics",
    department: "4",
    experience: "12 years",
    contactNumber: "+1 (555) 666-7777",
    isActive: true,
    bio: "Orthopedic surgeon specializing in sports medicine and joint replacements.",
    education:
      "MD from University of Pennsylvania, Orthopedic Surgery Fellowship at HSS",
    consultationFee: "350",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    _id: "11",
    name: "Dr. Aisha Patel",
    email: "aisha.patel@example.com",
    password: "password123",
    role: "doctor",
    specialization: "Dermatology",
    department: "5",
    experience: "6 years",
    contactNumber: "+1 (555) 888-9999",
    isActive: false,
    bio: "Dermatologist with expertise in skin cancer detection and cosmetic procedures.",
    education: "MD from NYU, Dermatology Residency at Mount Sinai",
    consultationFee: "275",
    profileImage: "https://randomuser.me/api/portraits/women/41.jpg",
  },
  {
    _id: "3",
    name: "John Smith",
    email: "patient@example.com",
    password: "password123",
    role: "patient",
    firstName: "John",
    lastName: "Smith",
    gender: "Male",
    dateOfBirth: "1985-05-15",
    aadhaarNumber: "123456789012",
    bloodGroup: "O+",
    contactNumber: "9876543210",
    address: "123 Main St, New York, NY, 10001",
  },
  {
    _id: "4",
    name: "Michael Rodriguez",
    email: "lab@example.com",
    password: "password123",
    role: "labtechnician",
    department: "Pathology",
    specialization: "Hematology",
    qualification: "PhD in Medical Laboratory Science",
    experience: "5",
    contactNumber: "+1 (555) 987-6543",
    joiningDate: "2020-03-15",
  },
  {
    _id: "5",
    name: "Emily Parker",
    email: "emily@example.com",
    password: "password123",
    role: "patient",
    gender: "Female",
    dateOfBirth: "1992-08-23",
    aadhaarNumber: "987654321012",
    bloodGroup: "A+",
    contactNumber: "8765432109",
    address: "456 Oak Avenue, Chicago, IL, 60601",
  },
  {
    _id: "6",
    name: "David Wilson",
    email: "david@example.com",
    password: "password123",
    role: "patient",
    gender: "Male",
    dateOfBirth: "1978-11-30",
    aadhaarNumber: "567890123456",
    bloodGroup: "B-",
    contactNumber: "7654321098",
    address: "789 Pine Street, San Francisco, CA, 94101",
  },
  {
    _id: "7",
    name: "Jessica Brown",
    email: "jessica@example.com",
    password: "password123",
    role: "labtechnician",
    department: "Biochemistry",
    specialization: "Clinical Chemistry",
    qualification: "Master's in Biochemistry",
    experience: "3",
    contactNumber: "+1 (555) 456-7890",
    joiningDate: "2021-06-10",
  },
];

// Mock appointments
const mockAppointments = [
  {
    _id: "1",
    patient: "3", // John Smith (patient)
    doctor: "2", // Dr. Sarah Johnson
    department: "1",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split("T")[0],
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    reason: "Annual Checkup",
    status: "confirmed",
    notes: "",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    patient: "3", // John Smith (patient)
    doctor: "2", // Dr. Sarah Johnson
    department: "1",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() - 5))
      .toISOString()
      .split("T")[0],
    startTime: "02:00 PM",
    endTime: "02:30 PM",
    reason: "Follow-up Consultation",
    status: "completed",
    notes:
      "Patient recovering well. Prescribed medication continued for 2 more weeks.",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 10)
    ).toISOString(),
  },
  {
    _id: "3",
    patient: "5", // Changed from 1 to 5 (Emily Parker - patient)
    doctor: "2", // Dr. Sarah Johnson
    department: "1",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .split("T")[0],
    startTime: "09:00 AM",
    endTime: "09:30 AM",
    reason: "Cardiology Consultation",
    status: "pending",
    notes: "",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    patient: "5", // Changed from 1 to 5 (Emily Parker - patient)
    doctor: "8", // Dr. Robert Chen
    department: "2",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 10))
      .toISOString()
      .split("T")[0],
    startTime: "11:30 AM",
    endTime: "12:00 PM",
    reason: "Neurology Follow-up",
    status: "confirmed",
    notes: "",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "5",
    patient: "6", // Changed from 1 to 6 (David Wilson - patient)
    doctor: "10", // Dr. James Wilson
    department: "4",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0],
    startTime: "03:15 PM",
    endTime: "03:45 PM",
    reason: "Orthopedic Evaluation",
    status: "completed",
    notes: "Patient advised physical therapy for 2 weeks.",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 15)
    ).toISOString(),
  },
  {
    _id: "6",
    patient: "6", // Changed from 1 to 6 (David Wilson - patient)
    doctor: "9", // Dr. Maria Lopez
    department: "3",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() - 2))
      .toISOString()
      .split("T")[0],
    startTime: "10:45 AM",
    endTime: "11:15 AM",
    reason: "Prescription Renewal",
    status: "cancelled",
    notes: "Cancelled by patient.",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 8)
    ).toISOString(),
  },
];

// Mock lab reports
const mockLabReports = [
  {
    _id: "1",
    patient: "3",
    technician: "4",
    reportType: "Blood Test",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    status: "completed",
    results: {
      hemoglobin: "14.5 g/dL",
      whiteBloodCells: "7.5 thousand/μL",
      platelets: "250 thousand/μL",
      glucose: "95 mg/dL",
    },
  },
];

// Mock lab orders
const mockLabOrders = [
  {
    _id: "1",
    patient: "3", // John Smith
    doctor: "2", // Dr. Sarah Johnson
    testType: "Blood Test",
    status: "pending",
    urgency: "Normal",
    requestedDate: new Date().toISOString(),
    notes: "Check for infection markers and white blood cell count",
    department: "1", // Cardiology
  },
  {
    _id: "2",
    patient: "3", // John Smith
    doctor: "2", // Dr. Sarah Johnson
    testType: "Urine Analysis",
    status: "pending",
    urgency: "Urgent",
    requestedDate: new Date().toISOString(),
    notes: "Check for kidney function and diabetes markers",
    department: "1", // Cardiology
  },
  {
    _id: "3",
    patient: "5", // Emily Parker
    doctor: "10", // Dr. James Wilson
    testType: "X-Ray",
    status: "in_progress",
    urgency: "Normal",
    requestedDate: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString(),
    notes: "Chest X-ray to rule out pneumonia",
    technician: "4", // Michael Rodriguez
    department: "4", // Orthopedics
  },
  {
    _id: "4",
    patient: "6", // David Wilson
    doctor: "8", // Dr. Robert Chen
    testType: "MRI",
    status: "completed",
    urgency: "Normal",
    requestedDate: new Date(
      new Date().setDate(new Date().getDate() - 2)
    ).toISOString(),
    notes: "Brain MRI to assess for tumor growth",
    technician: "7", // Jessica Brown
    completedDate: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString(),
    department: "2", // Neurology
    reportId: "1", // Reference to the mockLabReports _id
  },
];

// Mock departments
const mockDepartments = [
  {
    _id: "1",
    name: "Cardiology",
    description: "Specialized in heart-related issues and treatments.",
    image: "https://via.placeholder.com/300x150?text=Cardiology",
    headDoctor: "2", // Dr. Sarah Johnson
    location: "Block A, 3rd Floor",
    contactNumber: "+1 (555) 123-4567",
    consultationFee: "150",
    isActive: true,
  },
  {
    _id: "2",
    name: "Neurology",
    description: "Deals with disorders of the nervous system.",
    image: "https://via.placeholder.com/300x150?text=Neurology",
    headDoctor: null,
    location: "Block B, 2nd Floor",
    contactNumber: "+1 (555) 987-6543",
    consultationFee: "200",
    isActive: true,
  },
  {
    _id: "3",
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents.",
    image: "https://via.placeholder.com/300x150?text=Pediatrics",
    headDoctor: null,
    location: "Block C, 1st Floor",
    contactNumber: "+1 (555) 456-7890",
    consultationFee: "120",
    isActive: true,
  },
  {
    _id: "4",
    name: "Orthopedics",
    description: "Focuses on the musculoskeletal system.",
    image: "https://via.placeholder.com/300x150?text=Orthopedics",
    headDoctor: null,
    location: "Block D, 2nd Floor",
    contactNumber: "+1 (555) 789-0123",
    consultationFee: "180",
    isActive: false,
  },
];

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to find a user by email or ID
const findUserByEmailOrId = (emailOrId) => {
  return mockUsers.find((u) => u.email === emailOrId || u._id === emailOrId);
};

// Debug helper to dump detailed information about appointments
const dumpAppointmentsDebug = () => {
  console.log("--------- APPOINTMENTS DEBUG INFO ---------");
  console.log("Total appointments:", mockAppointments.length);

  const userMap = {};
  mockUsers.forEach((user) => {
    userMap[user._id] = {
      name: user.name,
      role: user.role,
      email: user.email,
    };
  });

  console.log("Available users:");
  console.log(userMap);

  mockAppointments.forEach((apt, index) => {
    console.log(`Appointment #${index + 1} (${apt._id}):`);
    console.log(
      `  Patient: ${apt.patient} (${userMap[apt.patient]?.name || "Unknown"})`
    );
    console.log(
      `  Doctor: ${apt.doctor} (${userMap[apt.doctor]?.name || "Unknown"})`
    );
    console.log(`  Status: ${apt.status}`);
    console.log(`  Date: ${apt.appointmentDate}`);
  });
  console.log("------------------------------------------");
};

// Helper function to filter users by role
const getUsersByRole = (role) => {
  try {
    if (!Array.isArray(mockUsers)) {
      console.error("mockUsers is not an array:", mockUsers);
      return [];
    }

    return mockUsers
      .filter((user) => user && user.role === role)
      .map((user) => {
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      })
      .filter(Boolean); // Remove any null entries
  } catch (error) {
    console.error("Error in getUsersByRole:", error);
    return [];
  }
};

// Auth services
export const mockAuthService = {
  login: async (email, password, role = "") => {
    await delay(800); // Simulate network delay

    // Filter users by role if a role is specified
    const filteredUsers = role
      ? mockUsers.filter((u) => u.role === role)
      : mockUsers;

    console.log(`Login attempt with ${email}, role: ${role || "any"}`);
    console.log(
      `Available users for this role:`,
      filteredUsers.map((u) => ({
        email: u.email,
        role: u.role,
        _id: u._id,
      }))
    );

    const user = filteredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.log(`Login failed: No matching user found for ${email}`);
      throw { response: { data: { message: "Invalid email or password" } } };
    }

    console.log(
      `Login successful for user: ${user.name} (${user._id}), role: ${user.role}`
    );
    const { password: _, ...userWithoutPassword } = user;

    return {
      token: "mock-jwt-token-" + user.role,
      user: userWithoutPassword,
    };
  },

  signup: async (userData) => {
    await delay(1000); // Simulate network delay

    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      throw { response: { data: { message: "User already exists" } } };
    }

    let newUser;

    // Handle patient registration with extra fields
    if (userData.role === "patient") {
      newUser = {
        _id: (mockUsers.length + 1).toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        role: "patient",
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
        aadhaarNumber: userData.aadhaarNumber,
        bloodGroup: userData.bloodGroup || "",
        contactNumber: userData.phoneNumber,
        address: userData.address
          ? `${userData.address.street}, ${userData.address.city}, ${userData.address.state}, ${userData.address.pincode}`
          : "",
        allergies: userData.allergies,
        medicalHistory: userData.existingConditions
          ? [
              {
                condition: userData.existingConditions,
                diagnosedDate: new Date(),
                notes: "Self-reported during registration",
              },
            ]
          : [],
      };
    } else {
      // Handle other user types
      newUser = {
        _id: (mockUsers.length + 1).toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || "doctor",
      };
    }

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      token: "mock-jwt-token-" + userData.role,
      user: userWithoutPassword,
    };
  },

  logout: () => {
    // Simply remove from localStorage in real implementation
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// Main API service for CRUD operations
const mockApi = {
  // Also include auth methods for compatibility
  ...mockAuthService,

  // Generic user update function
  updateUser: async (id, userData) => {
    await delay(600);

    // First look for user by ID
    let userIndex = mockUsers.findIndex((u) => u._id === id);

    // If not found, try to find by email
    if (userIndex === -1 && userData.email) {
      userIndex = mockUsers.findIndex((u) => u.email === userData.email);
    }

    if (userIndex === -1) {
      console.log(
        `User with ID ${id} not found in mock data. Using local update only.`
      );
      // If the user doesn't exist in the mock data, just return the updated data as provided
      // This allows updates to work even when IDs don't match between localStorage and mock data
      return {
        _id: id,
        ...userData,
      };
    }

    // Get the user's role to call the appropriate update function
    const userRole = mockUsers[userIndex].role;

    if (userRole === "patient") {
      return mockApi.updatePatient(mockUsers[userIndex]._id, userData);
    } else if (userRole === "doctor") {
      return mockApi.updateDoctor(mockUsers[userIndex]._id, userData);
    } else if (userRole === "labtechnician") {
      return mockApi.updateLabTechnician(mockUsers[userIndex]._id, userData);
    } else {
      // For other roles like admin
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...userData,
        name: userData.name || mockUsers[userIndex].name,
      };

      const { password, ...updatedUser } = mockUsers[userIndex];
      return updatedUser;
    }
  },

  // Appointments
  getAppointments: async (filters = {}) => {
    await delay(500);

    console.log("getAppointments called with filters:", filters);
    dumpAppointmentsDebug();

    let filteredAppointments = [...mockAppointments];
    console.log("All appointments:", mockAppointments);
    console.log("Filters applied:", filters);

    // If the patient ID doesn't match any in our mock data, return sample appointments
    if (filters.patient && !mockUsers.some((u) => u._id === filters.patient)) {
      console.log(
        `Patient ID ${filters.patient} not found in mock data. Returning sample appointments.`
      );

      // Create sample appointments for the given patient ID
      const sampleAppointments = [
        {
          _id: "sample1",
          patient: { _id: filters.patient, name: "Current User" },
          doctor: {
            _id: "2",
            name: "Dr. Sarah Johnson",
            specialization: "Cardiology",
          },
          department: { _id: "1", name: "Cardiology" },
          appointmentDate: new Date(
            new Date().setDate(new Date().getDate() + 3)
          )
            .toISOString()
            .split("T")[0],
          startTime: "10:00 AM",
          endTime: "10:30 AM",
          reason: "Annual Checkup",
          status: "confirmed",
        },
        {
          _id: "sample2",
          patient: { _id: filters.patient, name: "Current User" },
          doctor: {
            _id: "8",
            name: "Dr. Robert Chen",
            specialization: "Neurology",
          },
          department: { _id: "2", name: "Neurology" },
          appointmentDate: new Date(
            new Date().setDate(new Date().getDate() - 5)
          )
            .toISOString()
            .split("T")[0],
          startTime: "02:00 PM",
          endTime: "02:30 PM",
          reason: "Follow-up Consultation",
          status: "completed",
        },
      ];

      return sampleAppointments;
    }

    // Apply filters for existing mock data
    if (filters.patient) {
      // Handle both string format and object with _id format
      const patientId =
        typeof filters.patient === "object"
          ? filters.patient._id
          : filters.patient;
      filteredAppointments = filteredAppointments.filter(
        (a) => a.patient === patientId
      );
      console.log("After patient filter:", filteredAppointments);
    }

    if (filters.doctor) {
      // Handle both string format and object with _id format
      const doctorId =
        typeof filters.doctor === "object"
          ? filters.doctor._id
          : filters.doctor;
      filteredAppointments = filteredAppointments.filter(
        (a) => a.doctor === doctorId
      );
    }

    if (filters.status) {
      filteredAppointments = filteredAppointments.filter(
        (a) => a.status === filters.status
      );
    }

    if (filters.date) {
      filteredAppointments = filteredAppointments.filter(
        (a) => a.appointmentDate === filters.date
      );
    }

    // Make sure we have all appointments in the debug log
    console.log("Final filtered appointments:", filteredAppointments);

    // Populate patient and doctor information
    return filteredAppointments.map((appointment) => {
      const patient = mockUsers.find((u) => u._id === appointment.patient);
      const doctor = mockUsers.find((u) => u._id === appointment.doctor);
      const department = mockDepartments.find(
        (d) => doctor && doctor.department === d._id
      );

      return {
        ...appointment,
        patient: patient
          ? {
              _id: patient._id,
              name: patient.name,
              email: patient.email,
            }
          : null,
        doctor: doctor
          ? {
              _id: doctor._id,
              name: doctor.name,
              specialization: doctor.specialization,
            }
          : null,
        department: department
          ? {
              _id: department._id,
              name: department.name,
            }
          : null,
      };
    });
  },

  createAppointment: async (appointmentData) => {
    await delay(800);

    // Check for time conflicts with existing confirmed appointments
    const conflictingAppointments = mockAppointments.filter((appointment) => {
      // Only check for confirmed appointments
      if (appointment.status !== "confirmed") return false;

      // Check same doctor, same date
      if (
        appointment.doctor !== appointmentData.doctor ||
        appointment.appointmentDate !== appointmentData.appointmentDate
      ) {
        return false;
      }

      // Convert time strings to comparable values (e.g., minutes since midnight)
      const convertTimeToMinutes = (timeStr) => {
        // Handle both 24-hour format and AM/PM format
        if (
          timeStr.toLowerCase().includes("am") ||
          timeStr.toLowerCase().includes("pm")
        ) {
          // Handle AM/PM format
          const [timePart, period] = timeStr.split(" ");
          const [hours, minutes] = timePart.split(":").map(Number);
          const isPM = period.toLowerCase() === "pm" && hours < 12;
          const isAM = period.toLowerCase() === "am" && hours === 12;
          return (isPM ? hours + 12 : isAM ? 0 : hours) * 60 + minutes;
        } else {
          // Handle 24-hour format
          const [hours, minutes] = timeStr.split(":").map(Number);
          return hours * 60 + minutes;
        }
      };

      const existingStart = convertTimeToMinutes(appointment.startTime);
      const existingEnd = convertTimeToMinutes(appointment.endTime);
      const newStart = convertTimeToMinutes(appointmentData.startTime);
      const newEnd = convertTimeToMinutes(appointmentData.endTime);

      // Check for time overlap
      return (
        (newStart >= existingStart && newStart < existingEnd) || // New appointment starts during existing
        (newEnd > existingStart && newEnd <= existingEnd) || // New appointment ends during existing
        (newStart <= existingStart && newEnd >= existingEnd) // New appointment completely encompasses existing
      );
    });

    if (conflictingAppointments.length > 0) {
      throw {
        response: {
          data: {
            message:
              "This time slot is already booked. Please select another time.",
          },
        },
      };
    }

    const newAppointment = {
      _id: (mockAppointments.length + 1).toString(),
      ...appointmentData,
      status: appointmentData.status || "pending",
      createdAt: new Date().toISOString(),
    };

    // For debugging, log the newly created appointment
    console.log("New appointment created:", newAppointment);

    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  updateAppointment: async (id, appointmentData) => {
    await delay(600);

    const appointmentIndex = mockAppointments.findIndex((a) => a._id === id);
    if (appointmentIndex === -1) {
      throw { response: { data: { message: "Appointment not found" } } };
    }

    // Update appointment data
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      ...appointmentData,
    };

    return mockAppointments[appointmentIndex];
  },

  deleteAppointment: async (id) => {
    await delay(500);

    const appointmentIndex = mockAppointments.findIndex((a) => a._id === id);
    if (appointmentIndex === -1) {
      throw { response: { data: { message: "Appointment not found" } } };
    }

    mockAppointments.splice(appointmentIndex, 1);
    return { success: true, message: "Appointment deleted successfully" };
  },

  // Lab reports
  getLabReports: async (filters = {}) => {
    await delay(500);

    let filteredReports = [...mockLabReports];

    // Apply filters
    if (filters.patient) {
      // Handle both string format and object with _id format
      const patientId =
        typeof filters.patient === "object"
          ? filters.patient._id
          : filters.patient;
      filteredReports = filteredReports.filter((r) => r.patient === patientId);
    }

    if (filters.technician) {
      // Handle both string format and object with _id format
      const technicianId =
        typeof filters.technician === "object"
          ? filters.technician._id
          : filters.technician;
      filteredReports = filteredReports.filter(
        (r) => r.technician === technicianId
      );
    }

    // If we have a reportId filter
    if (filters.reportId) {
      filteredReports = filteredReports.filter(
        (r) => r._id === filters.reportId
      );
    }

    // Populate patient and technician information
    return filteredReports.map((report) => {
      const patient = mockUsers.find((u) => u._id === report.patient);
      const technician = mockUsers.find((u) => u._id === report.technician);

      return {
        ...report,
        patient: patient
          ? {
              _id: patient._id,
              name: patient.name,
              email: patient.email,
            }
          : null,
        technician: technician
          ? {
              _id: technician._id,
              name: technician.name,
              department: technician.department,
            }
          : null,
      };
    });
  },

  uploadLabReport: async (reportData) => {
    await delay(1000);

    const newReport = {
      _id: (mockLabReports.length + 1).toString(),
      ...reportData,
      date: new Date().toISOString(),
    };

    mockLabReports.push(newReport);

    // If this report is linked to an order, update the order status and add reportId
    if (reportData.orderId) {
      const orderIndex = mockLabOrders.findIndex(
        (order) => order._id === reportData.orderId
      );

      if (orderIndex !== -1) {
        mockLabOrders[orderIndex] = {
          ...mockLabOrders[orderIndex],
          status: "completed",
          reportId: newReport._id,
          completedDate: new Date().toISOString(),
        };
      }
    }

    return newReport;
  },

  // Lab Orders
  getLabOrders: async (filters = {}) => {
    await delay(500);

    let filteredOrders = [...mockLabOrders];

    // Apply filters
    if (filters.patient) {
      // Handle both string format and object with _id format
      const patientId =
        typeof filters.patient === "object"
          ? filters.patient._id
          : filters.patient;
      filteredOrders = filteredOrders.filter((o) => o.patient === patientId);
    }

    if (filters.doctor) {
      // Handle both string format and object with _id format
      const doctorId =
        typeof filters.doctor === "object"
          ? filters.doctor._id
          : filters.doctor;
      filteredOrders = filteredOrders.filter((o) => o.doctor === doctorId);
    }

    // Special handling for lab technicians - they should see:
    // 1. Orders already assigned to them
    // 2. All pending orders that need a technician to accept
    if (filters.technician) {
      const technicianId =
        typeof filters.technician === "object"
          ? filters.technician._id
          : filters.technician;
      filteredOrders = filteredOrders.filter(
        (o) => o.technician === technicianId || o.status === "pending"
      );
    }

    if (filters.status) {
      filteredOrders = filteredOrders.filter(
        (o) => o.status === filters.status
      );
    }

    if (filters.testType) {
      filteredOrders = filteredOrders.filter(
        (o) => o.testType === filters.testType
      );
    }

    // Populate patient, doctor, technician, department, and report information
    return filteredOrders.map((order) => {
      const patient = mockUsers.find((u) => u._id === order.patient);
      const doctor = mockUsers.find((u) => u._id === order.doctor);
      const technician = order.technician
        ? mockUsers.find((u) => u._id === order.technician)
        : null;
      const department = mockDepartments.find(
        (d) => d._id === order.department
      );

      // Include report data if there is a reportId
      let report = null;
      if (order.reportId) {
        report = mockLabReports.find((r) => r._id === order.reportId);
      }

      return {
        ...order,
        patient: patient
          ? {
              _id: patient._id,
              name: patient.name,
              email: patient.email,
            }
          : order.patientName // If patient lookup fails but we have patientName, use it
          ? {
              _id: order.patient,
              name: order.patientName,
            }
          : null,
        doctor: doctor
          ? {
              _id: doctor._id,
              name: doctor.name,
              specialization: doctor.specialization,
            }
          : null,
        technician: technician
          ? {
              _id: technician._id,
              name: technician.name,
            }
          : null,
        department: department
          ? {
              _id: department._id,
              name: department.name,
            }
          : null,
        report: report
          ? {
              _id: report._id,
              reportType: report.reportType,
              date: report.date,
              results: report.results,
              notes: report.notes,
            }
          : null,
      };
    });
  },

  createLabOrder: async (orderData) => {
    await delay(800);

    const newOrder = {
      _id: (mockLabOrders.length + 1).toString(),
      ...orderData,
      status: "pending",
      requestedDate: new Date().toISOString(),
    };

    mockLabOrders.push(newOrder);
    return newOrder;
  },

  updateLabOrder: async (id, updateData) => {
    await delay(600);

    const orderIndex = mockLabOrders.findIndex((o) => o._id === id);
    if (orderIndex === -1) {
      throw { response: { data: { message: "Lab order not found" } } };
    }

    // Update order data
    mockLabOrders[orderIndex] = {
      ...mockLabOrders[orderIndex],
      ...updateData,
    };

    // If status is changed to completed, set completedDate
    if (
      updateData.status === "completed" &&
      !mockLabOrders[orderIndex].completedDate
    ) {
      mockLabOrders[orderIndex].completedDate = new Date().toISOString();
    }

    return mockLabOrders[orderIndex];
  },

  // Patient management
  getPatients: async () => {
    await delay(500);
    return getUsersByRole("patient");
  },

  getPatientById: async (id) => {
    await delay(300);
    const patient = mockUsers.find((u) => u._id === id && u.role === "patient");

    if (!patient) {
      throw { response: { data: { message: "Patient not found" } } };
    }

    const { password, ...patientData } = patient;
    return patientData;
  },

  addPatient: async (patientData) => {
    await delay(800);

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === patientData.email);
    if (existingUser) {
      throw { response: { data: { message: "Email already in use" } } };
    }

    const newPatient = {
      _id: (mockUsers.length + 1).toString(),
      name: patientData.name,
      password: "defaultPassword123", // In a real app, you'd generate a secure password
      role: "patient",
      ...patientData,
    };

    mockUsers.push(newPatient);

    const { password, ...patientWithoutPassword } = newPatient;
    return patientWithoutPassword;
  },

  updatePatient: async (id, patientData) => {
    await delay(600);

    const patientIndex = mockUsers.findIndex(
      (u) => u._id === id && u.role === "patient"
    );
    if (patientIndex === -1) {
      throw { response: { data: { message: "Patient not found" } } };
    }

    // Update patient data
    mockUsers[patientIndex] = {
      ...mockUsers[patientIndex],
      ...patientData,
      name: patientData.name || mockUsers[patientIndex].name,
    };

    const { password, ...updatedPatient } = mockUsers[patientIndex];
    return updatedPatient;
  },

  deletePatient: async (id) => {
    await delay(500);

    const patientIndex = mockUsers.findIndex(
      (u) => u._id === id && u.role === "patient"
    );
    if (patientIndex === -1) {
      throw { response: { data: { message: "Patient not found" } } };
    }

    mockUsers.splice(patientIndex, 1);
    return { success: true, message: "Patient deleted successfully" };
  },

  // Lab Technician management
  getLabTechnicians: async () => {
    await delay(500);
    return getUsersByRole("labtechnician");
  },

  getLabTechnicianById: async (id) => {
    await delay(300);
    const tech = mockUsers.find(
      (u) => u._id === id && u.role === "labtechnician"
    );

    if (!tech) {
      throw { response: { data: { message: "Lab technician not found" } } };
    }

    const { password, ...techData } = tech;
    return techData;
  },

  addLabTechnician: async (techData) => {
    await delay(800);

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === techData.email);
    if (existingUser) {
      throw { response: { data: { message: "Email already in use" } } };
    }

    const newTech = {
      _id: (mockUsers.length + 1).toString(),
      name: techData.name,
      password: "defaultPassword123", // In a real app, you'd generate a secure password
      role: "labtechnician",
      ...techData,
    };

    mockUsers.push(newTech);

    const { password, ...techWithoutPassword } = newTech;
    return techWithoutPassword;
  },

  updateLabTechnician: async (id, techData) => {
    await delay(600);

    const techIndex = mockUsers.findIndex(
      (u) => u._id === id && u.role === "labtechnician"
    );
    if (techIndex === -1) {
      throw { response: { data: { message: "Lab technician not found" } } };
    }

    // Update lab technician data
    mockUsers[techIndex] = {
      ...mockUsers[techIndex],
      ...techData,
      name: techData.name || mockUsers[techIndex].name,
    };

    const { password, ...updatedTech } = mockUsers[techIndex];
    return updatedTech;
  },

  deleteLabTechnician: async (id) => {
    await delay(500);

    const techIndex = mockUsers.findIndex(
      (u) => u._id === id && u.role === "labtechnician"
    );
    if (techIndex === -1) {
      throw { response: { data: { message: "Lab technician not found" } } };
    }

    mockUsers.splice(techIndex, 1);
    return { success: true, message: "Lab technician deleted successfully" };
  },

  // Doctor management
  getDoctors: async () => {
    try {
      await delay(500);
      const doctors = getUsersByRole("doctor");
      return Array.isArray(doctors) ? doctors : [];
    } catch (error) {
      console.error("Error getting doctors:", error);
      return [];
    }
  },

  getDoctorById: async (id) => {
    await delay(300);
    const doctor = mockUsers.find((u) => u._id === id && u.role === "doctor");

    if (!doctor) {
      throw { response: { data: { message: "Doctor not found" } } };
    }

    const { password, ...doctorData } = doctor;
    return doctorData;
  },

  addDoctor: async (doctorData) => {
    await delay(800);

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === doctorData.email);
    if (existingUser) {
      throw { response: { data: { message: "Email already in use" } } };
    }

    const newDoctor = {
      _id: (mockUsers.length + 1).toString(),
      name: doctorData.name,
      password: doctorData.password || "defaultPassword123", // In a real app, you'd generate a secure password
      role: "doctor",
      isActive: true,
      ...doctorData,
    };

    mockUsers.push(newDoctor);

    const { password, ...doctorWithoutPassword } = newDoctor;
    return doctorWithoutPassword;
  },

  updateDoctor: async (id, doctorData) => {
    await delay(600);

    const doctorIndex = mockUsers.findIndex(
      (u) => u._id === id && u.role === "doctor"
    );
    if (doctorIndex === -1) {
      throw { response: { data: { message: "Doctor not found" } } };
    }

    // Update doctor data
    mockUsers[doctorIndex] = {
      ...mockUsers[doctorIndex],
      ...doctorData,
      name: doctorData.name || mockUsers[doctorIndex].name,
    };

    const { password, ...updatedDoctor } = mockUsers[doctorIndex];
    return updatedDoctor;
  },

  deleteDoctor: async (id) => {
    await delay(500);

    const doctorIndex = mockUsers.findIndex(
      (u) => u._id === id && u.role === "doctor"
    );
    if (doctorIndex === -1) {
      throw { response: { data: { message: "Doctor not found" } } };
    }

    mockUsers.splice(doctorIndex, 1);
    return { success: true, message: "Doctor deleted successfully" };
  },

  // Department management
  getDepartments: async () => {
    await delay(500);
    return [...mockDepartments];
  },

  getDepartmentById: async (id) => {
    await delay(300);
    const department = mockDepartments.find((d) => d._id === id);

    if (!department) {
      throw { response: { data: { message: "Department not found" } } };
    }

    return department;
  },

  addDepartment: async (departmentData) => {
    await delay(800);

    const newDepartment = {
      _id: (mockDepartments.length + 1).toString(),
      ...departmentData,
    };

    mockDepartments.push(newDepartment);
    return newDepartment;
  },

  updateDepartment: async (id, departmentData) => {
    await delay(600);

    const departmentIndex = mockDepartments.findIndex((d) => d._id === id);
    if (departmentIndex === -1) {
      throw { response: { data: { message: "Department not found" } } };
    }

    // Update department data
    mockDepartments[departmentIndex] = {
      ...mockDepartments[departmentIndex],
      ...departmentData,
    };

    return mockDepartments[departmentIndex];
  },

  deleteDepartment: async (id) => {
    await delay(500);

    const departmentIndex = mockDepartments.findIndex((d) => d._id === id);
    if (departmentIndex === -1) {
      throw { response: { data: { message: "Department not found" } } };
    }

    mockDepartments.splice(departmentIndex, 1);
    return { success: true, message: "Department deleted successfully" };
  },
};

export default mockApi;
