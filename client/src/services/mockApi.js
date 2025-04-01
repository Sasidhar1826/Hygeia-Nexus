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
    department: "Cardiology",
    experience: "10 years",
    contactNumber: "+1 (555) 123-4567",
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
    patient: "3",
    doctor: "2",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split("T")[0],
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    reason: "Annual Checkup",
    status: "scheduled",
    notes: "",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    patient: "3",
    doctor: "2",
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

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to filter users by role
const getUsersByRole = (role) => {
  return mockUsers
    .filter((user) => user.role === role)
    .map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
};

// Auth services
export const mockAuthService = {
  login: async (email, password, role = "") => {
    await delay(800); // Simulate network delay

    // Filter users by role if a role is specified
    const filteredUsers = role
      ? mockUsers.filter((u) => u.role === role)
      : mockUsers;

    const user = filteredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw { response: { data: { message: "Invalid email or password" } } };
    }

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

  // Mock service for appointments
  getAppointments: async (filters = {}) => {
    await delay(500);

    let filteredAppointments = [...mockAppointments];

    // Apply filters
    if (filters.patient) {
      filteredAppointments = filteredAppointments.filter(
        (a) => a.patient === filters.patient
      );
    }

    if (filters.doctor) {
      filteredAppointments = filteredAppointments.filter(
        (a) => a.doctor === filters.doctor
      );
    }

    if (filters.status) {
      filteredAppointments = filteredAppointments.filter(
        (a) => a.status === filters.status
      );
    }

    // Populate patient and doctor information
    return filteredAppointments.map((appointment) => {
      const patient = mockUsers.find((u) => u._id === appointment.patient);
      const doctor = mockUsers.find((u) => u._id === appointment.doctor);

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
      };
    });
  },

  createAppointment: async (appointmentData) => {
    await delay(800);

    const newAppointment = {
      _id: (mockAppointments.length + 1).toString(),
      ...appointmentData,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  // Mock service for lab reports
  getLabReports: async (filters = {}) => {
    await delay(500);

    let filteredReports = [...mockLabReports];

    // Apply filters
    if (filters.patient) {
      filteredReports = filteredReports.filter(
        (r) => r.patient === filters.patient
      );
    }

    if (filters.technician) {
      filteredReports = filteredReports.filter(
        (r) => r.technician === filters.technician
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
    return newReport;
  },

  // Patient management services
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

  // Lab Technician management services
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
};

export default mockAuthService;
