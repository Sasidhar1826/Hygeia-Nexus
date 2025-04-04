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

// Mock medical records with better structured data and relationships
const mockMedicalRecords = [
  {
    _id: "mr1",
    patientId: "3", // John Smith
    recordType: "diagnosis",
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    doctorId: "2", // Dr. Sarah Johnson
    departmentId: "1", // Cardiology
    consultationId: "cons1",
    symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
    vitalSigns: {
      bloodPressure: "140/90",
      heartRate: "88",
      temperature: "98.6",
      respiratoryRate: "18",
      oxygenSaturation: "97%",
    },
    diagnosis: "Mild Hypertension",
    notes:
      "Patient presented with episodes of chest pain and shortness of breath. BP elevated. ECG normal.",
    treatmentPlan:
      "Prescribed lisinopril 10mg daily. Lifestyle modifications advised.",
    followUp: "2 weeks",
    attachments: [],
    status: "active",
  },
  {
    _id: "mr2",
    patientId: "3", // John Smith
    recordType: "diagnosis",
    date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    doctorId: "2", // Dr. Sarah Johnson
    departmentId: "1", // Cardiology
    consultationId: "cons2",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Fatigue",
      "Blurred vision",
    ],
    vitalSigns: {
      bloodPressure: "135/85",
      heartRate: "82",
      temperature: "98.4",
      respiratoryRate: "16",
      oxygenSaturation: "98%",
      bloodGlucose: "156",
    },
    diagnosis: "Suspected Type 2 Diabetes",
    notes:
      "Patient reports increased thirst and frequent urination. Random blood glucose elevated at 156 mg/dL.",
    treatmentPlan:
      "Ordered HbA1c and fasting glucose tests. Dietary counseling provided.",
    followUp: "1 week",
    attachments: [],
    status: "active",
  },
  {
    _id: "mr3",
    patientId: "3", // John Smith
    recordType: "followUp",
    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    doctorId: "2", // Dr. Sarah Johnson
    departmentId: "1", // Cardiology
    consultationId: "cons3",
    symptoms: ["Improved energy", "Still experiencing thirst"],
    vitalSigns: {
      bloodPressure: "132/84",
      heartRate: "78",
      temperature: "98.2",
      respiratoryRate: "16",
      oxygenSaturation: "98%",
    },
    diagnosis: "Type 2 Diabetes Mellitus",
    notes:
      "HbA1c result: 7.2%. Diagnosis confirmed. Patient responding well to initial dietary changes.",
    treatmentPlan:
      "Started on Metformin 500mg twice daily. Continued dietary and lifestyle modifications.",
    followUp: "1 month",
    attachments: [],
    status: "active",
    relatedRecords: ["mr2"], // Reference to previous record
  },
];

// Mock consultations
const mockConsultations = [
  {
    _id: "cons1",
    patientId: "3", // John Smith
    doctorId: "2", // Dr. Sarah Johnson
    appointmentId: "2", // Reference to a completed appointment
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    chiefComplaint: "Chest pain and shortness of breath",
    symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
    duration: "1 week",
    notes:
      "Patient reports intermittent chest pain, worse with exertion. No radiation of pain.",
    physicalExamNotes:
      "Vital signs stable except for elevated BP. Heart and lung exam normal.",
    assessmentNotes:
      "Mild hypertension, likely essential. Low risk for acute coronary syndrome.",
    medicalRecordId: "mr1", // Linked medical record
    status: "completed",
  },
  {
    _id: "cons2",
    patientId: "3", // John Smith
    doctorId: "2", // Dr. Sarah Johnson
    appointmentId: "3", // Reference to a completed appointment
    date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    chiefComplaint: "Increased thirst and frequent urination",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Fatigue",
      "Blurred vision",
    ],
    duration: "2 weeks",
    notes:
      "Patient has been experiencing excessive thirst and urination, especially at night. Reports family history of diabetes.",
    physicalExamNotes:
      "No acute distress. BP slightly elevated. Random blood glucose 156 mg/dL.",
    assessmentNotes: "Suspected Type 2 Diabetes. Ordering confirmatory tests.",
    medicalRecordId: "mr2", // Linked medical record
    status: "completed",
  },
  {
    _id: "cons3",
    patientId: "3", // John Smith
    doctorId: "2", // Dr. Sarah Johnson
    appointmentId: "4", // Reference to a completed appointment
    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    chiefComplaint: "Follow-up for diabetes testing",
    symptoms: ["Improved energy", "Still experiencing thirst"],
    duration: "ongoing",
    notes:
      "HbA1c result: 7.2%. Patient has been following dietary recommendations with some improvement in symptoms.",
    physicalExamNotes: "Vital signs improved. BP better controlled.",
    assessmentNotes:
      "Confirmed Type 2 Diabetes Mellitus. Starting oral medication.",
    medicalRecordId: "mr3", // Linked medical record
    status: "completed",
  },
];

// Mock lab result details - enhanced structure
const mockLabResultDetails = [
  {
    _id: "labdetail1",
    reportId: "1", // Reference to mockLabReports
    testName: "Complete Blood Count",
    components: [
      {
        name: "White Blood Cells",
        value: "7.5",
        unit: "thousand/μL",
        referenceRange: "4.5-11.0",
        flagged: false,
      },
      {
        name: "Red Blood Cells",
        value: "5.1",
        unit: "million/μL",
        referenceRange: "4.5-5.9",
        flagged: false,
      },
      {
        name: "Hemoglobin",
        value: "14.5",
        unit: "g/dL",
        referenceRange: "13.5-17.5",
        flagged: false,
      },
      {
        name: "Hematocrit",
        value: "42",
        unit: "%",
        referenceRange: "41-50",
        flagged: false,
      },
      {
        name: "Platelets",
        value: "250",
        unit: "thousand/μL",
        referenceRange: "150-450",
        flagged: false,
      },
    ],
    interpretation: "Normal complete blood count.",
    performedBy: "4", // Lab Technician ID
  },
  {
    _id: "labdetail2",
    reportId: "2",
    testName: "Comprehensive Metabolic Panel",
    components: [
      {
        name: "Glucose",
        value: "156",
        unit: "mg/dL",
        referenceRange: "70-99",
        flagged: true,
      },
      {
        name: "BUN",
        value: "15",
        unit: "mg/dL",
        referenceRange: "7-20",
        flagged: false,
      },
      {
        name: "Creatinine",
        value: "0.9",
        unit: "mg/dL",
        referenceRange: "0.6-1.2",
        flagged: false,
      },
      {
        name: "Sodium",
        value: "138",
        unit: "mmol/L",
        referenceRange: "135-145",
        flagged: false,
      },
      {
        name: "Potassium",
        value: "4.1",
        unit: "mmol/L",
        referenceRange: "3.5-5.0",
        flagged: false,
      },
      {
        name: "Calcium",
        value: "9.5",
        unit: "mg/dL",
        referenceRange: "8.5-10.2",
        flagged: false,
      },
      {
        name: "Albumin",
        value: "4.2",
        unit: "g/dL",
        referenceRange: "3.5-5.0",
        flagged: false,
      },
      {
        name: "Total Bilirubin",
        value: "0.8",
        unit: "mg/dL",
        referenceRange: "0.1-1.2",
        flagged: false,
      },
      {
        name: "ALT",
        value: "25",
        unit: "U/L",
        referenceRange: "7-55",
        flagged: false,
      },
      {
        name: "AST",
        value: "22",
        unit: "U/L",
        referenceRange: "8-48",
        flagged: false,
      },
    ],
    interpretation:
      "Elevated fasting glucose, suggestive of diabetes mellitus. Other values within normal limits.",
    performedBy: "4", // Lab Technician ID
  },
  {
    _id: "labdetail3",
    reportId: "3",
    testName: "Hemoglobin A1c",
    components: [
      {
        name: "HbA1c",
        value: "7.2",
        unit: "%",
        referenceRange: "4.0-5.6",
        flagged: true,
      },
    ],
    interpretation: "Elevated HbA1c consistent with diabetes mellitus (≥6.5%).",
    performedBy: "4", // Lab Technician ID
  },
];

// Update mockLabReports to include the new detailed lab results
const mockLabReportsUpdate = [
  {
    _id: "1",
    patient: "3", // John Smith
    technician: "4", // Michael Rodriguez
    doctor: "2", // Dr. Sarah Johnson
    reportType: "Complete Blood Count",
    date: new Date(new Date().setDate(new Date().getDate() - 28)).toISOString(),
    status: "completed",
    results: "Normal complete blood count. See detailed results.",
    detailId: "labdetail1",
  },
  {
    _id: "2",
    patient: "3", // John Smith
    technician: "4", // Michael Rodriguez
    doctor: "2", // Dr. Sarah Johnson
    reportType: "Comprehensive Metabolic Panel",
    date: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
    status: "completed",
    results:
      "Elevated fasting glucose, suggestive of diabetes mellitus. Other values within normal limits.",
    detailId: "labdetail2",
  },
  {
    _id: "3",
    patient: "3", // John Smith
    technician: "4", // Michael Rodriguez
    doctor: "2", // Dr. Sarah Johnson
    reportType: "Hemoglobin A1c",
    date: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    status: "completed",
    results: "Elevated HbA1c consistent with diabetes mellitus (≥6.5%).",
    detailId: "labdetail3",
  }
];

// Replace the mockLabReports with the updated version to fix the lab report display
mockLabReports.length = 0;
mockLabReportsUpdate.forEach((report) => mockLabReports.push({ ...report }));

// Mock AI diagnostic suggestions history
const mockAIDiagnosticHistory = [];

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

    const { password, ...userWithoutPassword } = newUser;

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
    let populatedReports = filteredReports.map((report) => {
      const patient = mockUsers.find((u) => u._id === report.patient);
      const technician = mockUsers.find((u) => u._id === report.technician);
      const doctor = mockUsers.find((u) => u._id === report.doctor);

      // Get details if available
      let details = null;
      let components = [];
      if (report.detailId) {
        details = mockLabResultDetails.find(
          (detail) => detail._id === report.detailId
        );
        components = details?.components || [];
      }

      // Process string results to prevent them being treated as arrays
      let processedResults = report.results;
      if (typeof report.results === "string") {
        // HTML-escape the string to ensure it renders properly
        processedResults = report.results
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/\n/g, "<br>")
          .replace(/\s{2,}/g, (match) => "&nbsp;".repeat(match.length));
      }

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
        doctor: doctor
          ? {
              _id: doctor._id,
              name: doctor.name,
            }
          : null,
        components,
        hasAbnormalResults: components.some((c) => c.flagged),
        interpretation: details?.interpretation || report.results,
        results: processedResults, // Use the processed version for display
      };
    });

    return populatedReports;
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

  // AI Diagnostic suggestions
  getAIDiagnosticSuggestion: async (patientId) => {
    await delay(2500); // Simulate a longer processing time for AI analysis

    try {
      // Find the patient
      const patient = mockUsers.find((u) => u._id === patientId);
      if (!patient) {
        throw { response: { data: { message: "Patient not found" } } };
      }

      // Get patient's medical records
      const patientMedicalRecords = mockMedicalRecords.filter(
        (record) => record.patientId === patientId
      );

      // Get patient's consultations
      const patientConsultations = mockConsultations.filter(
        (consult) => consult.patientId === patientId
      );

      // Get patient's lab reports
      const patientLabReports = mockLabReports.filter(
        (report) => report.patient === patientId
      );

      // Get detailed lab results
      const labResultDetails = patientLabReports
        .map((report) =>
          mockLabResultDetails.find((detail) => detail.reportId === report._id)
        )
        .filter(Boolean);

      // Extract recent symptoms from consultations
      const recentSymptoms =
        patientConsultations.length > 0
          ? patientConsultations[patientConsultations.length - 1].symptoms
          : [];

      // Extract relevant medical history from medical records
      const relevantHistory = patientMedicalRecords.map(
        (record) => record.diagnosis
      );

      // Extract key lab findings
      const keyLabFindings = labResultDetails.flatMap((detail) =>
        detail.components
          .filter((component) => component.flagged)
          .map(
            (component) =>
              `${component.name}: ${component.value} ${component.unit} (${
                component.flagged ? "Abnormal" : "Normal"
              })`
          )
      );

      // Build a comprehensive analysis based on the aggregated data
      // In a real implementation, this would be processed by an AI service

      let diagnosisResults = {
        summary: `Based on analysis of ${patient.firstName} ${patient.lastName}'s medical history, symptoms, and lab results, several potential diagnoses have been identified with varying probabilities.`,
        diagnoses: [],
        patientContext: {
          recentSymptoms,
          relevantHistory,
          recentLabResults: keyLabFindings,
          currentMedications: [
            "Lisinopril 10mg daily",
            "Metformin 500mg twice daily",
          ],
        },
      };

      // Determine the most likely diagnoses based on the collected data
      // This is a simplified logic - in a real system, this would be much more sophisticated

      // Check for diabetes indicators
      const hasElevatedGlucose = keyLabFindings.some(
        (finding) => finding.includes("Glucose") && finding.includes("Abnormal")
      );
      const hasElevatedHbA1c = keyLabFindings.some(
        (finding) => finding.includes("HbA1c") && finding.includes("Abnormal")
      );
      const hasDiabetesSymptoms = recentSymptoms.some((symptom) =>
        ["Increased thirst", "Frequent urination", "Blurred vision"].includes(
          symptom
        )
      );

      if ((hasElevatedGlucose || hasElevatedHbA1c) && hasDiabetesSymptoms) {
        diagnosisResults.diagnoses.push({
          id: "d1",
          name: "Type 2 Diabetes Mellitus",
          confidence: hasElevatedHbA1c ? 95 : 82,
          description:
            "The patient's symptoms and lab results strongly suggest Type 2 Diabetes Mellitus.",
          keyFactors: [
            {
              factor:
                "Elevated blood glucose levels in recent lab tests (156 mg/dL)",
              weight: 90,
            },
            {
              factor: "Elevated HbA1c of 7.2%",
              weight: hasElevatedHbA1c ? 95 : 0,
            },
            {
              factor: "Symptoms of increased thirst and frequent urination",
              weight: 85,
            },
            { factor: "Family history of diabetes", weight: 75 },
            { factor: "Obesity (BMI 32.4)", weight: 70 },
            { factor: "Age (45 years)", weight: 60 },
          ],
          recommendations: [
            hasElevatedHbA1c
              ? "Continue Metformin 500mg twice daily"
              : "HbA1c test to confirm diagnosis",
            "Regular blood glucose monitoring",
            "Diabetes education and nutritional counseling",
            "Follow-up in 3 months to assess treatment response",
          ],
        });
      }

      // Check for hypertension indicators
      const hasElevatedBP = patientMedicalRecords.some((record) => {
        const bp = record.vitalSigns.bloodPressure;
        if (!bp) return false;
        const [systolic, diastolic] = bp.split("/").map(Number);
        return systolic >= 130 || diastolic >= 80;
      });

      if (hasElevatedBP) {
        diagnosisResults.diagnoses.push({
          id: "d2",
          name: "Hypertension",
          confidence: 65,
          description:
            "Patient shows moderate indicators of hypertension, requiring continued monitoring and treatment.",
          keyFactors: [
            {
              factor:
                "Elevated blood pressure readings in last visits (140/90 mmHg)",
              weight: 80,
            },
            { factor: "Currently on Lisinopril 10mg daily", weight: 70 },
            { factor: "Sedentary lifestyle", weight: 60 },
            { factor: "High sodium diet (from patient history)", weight: 55 },
            { factor: "Stress levels reported by patient", weight: 45 },
          ],
          recommendations: [
            "Continue Lisinopril 10mg daily",
            "Regular blood pressure monitoring",
            "DASH diet recommendation",
            "Increase physical activity",
            "Follow-up visit in 1 month",
          ],
        });
      }

      // Check for other possible conditions based on symptoms and lab values
      if (recentSymptoms.includes("Fatigue")) {
        diagnosisResults.diagnoses.push({
          id: "d3",
          name: "Hypothyroidism",
          confidence: 32,
          description:
            "Some symptoms align with hypothyroidism, but confidence is low without thyroid function tests.",
          keyFactors: [
            { factor: "Fatigue reported by patient", weight: 60 },
            { factor: "Weight factors", weight: 50 },
            {
              factor:
                "Non-specific symptoms that overlap with other conditions",
              weight: 45,
            },
            { factor: "No thyroid function tests available", weight: 20 },
            {
              factor: "No family history of thyroid disorders noted",
              weight: 15,
            },
          ],
          recommendations: [
            "Thyroid function panel (TSH, T3, T4)",
            "Monitor for additional symptoms",
          ],
        });
      }

      // If no specific diagnoses were identified, add a general assessment
      if (diagnosisResults.diagnoses.length === 0) {
        diagnosisResults.diagnoses.push({
          id: "d4",
          name: "Non-specific symptoms requiring further evaluation",
          confidence: 50,
          description:
            "The patient's current symptoms and test results do not clearly indicate a specific diagnosis.",
          keyFactors: [
            { factor: "Mixed non-specific symptoms", weight: 60 },
            { factor: "Incomplete diagnostic workup", weight: 70 },
            {
              factor: "Multiple possible causes for presenting symptoms",
              weight: 65,
            },
          ],
          recommendations: [
            "Complete blood count",
            "Comprehensive metabolic panel",
            "Thyroid function tests",
            "Follow-up in 2 weeks",
          ],
        });
      }

      return diagnosisResults;
    } catch (error) {
      console.error("Error generating AI diagnostic suggestion:", error);
      throw error;
    }
  },

  // Save AI diagnostic suggestion to patient record
  saveAIDiagnosticSuggestion: async (patientId, diagnosisData) => {
    await delay(1000); // Simulate API delay

    try {
      // Create a new diagnosis record
      const newAIDiagnosis = {
        _id: `aidr-${Math.random().toString(36).substring(2, 9)}`,
        patientId,
        timestamp: new Date().toISOString(),
        diagnosisData,
        savedBy: "2", // Assuming Dr. Sarah Johnson is saving this
        status: "active",
      };

      // Add to diagnosis history
      mockAIDiagnosticHistory.push(newAIDiagnosis);

      // Create a medical record entry for this AI diagnosis
      const newMedicalRecord = {
        _id: `mr-${Math.random().toString(36).substring(2, 9)}`,
        patientId,
        recordType: "aiDiagnosis",
        date: new Date().toISOString(),
        doctorId: "2", // Dr. Sarah Johnson
        departmentId: "1", // Cardiology
        symptoms: diagnosisData.patientContext.recentSymptoms || [],
        diagnosis: diagnosisData.diagnosis?.name || "AI Diagnostic Suggestions",
        notes: `AI Diagnostic Analysis: ${diagnosisData.summary}`,
        aiDiagnosisId: newAIDiagnosis._id,
        status: "active",
      };

      // Add to medical records
      mockMedicalRecords.push(newMedicalRecord);

      return {
        success: true,
        message: "Diagnostic suggestion saved successfully to patient record",
        diagnosisId: newAIDiagnosis._id,
        medicalRecordId: newMedicalRecord._id,
      };
    } catch (error) {
      console.error("Error saving AI diagnostic suggestion:", error);
      throw error;
    }
  },

  // Medical Records API
  getMedicalRecords: async (filters = {}) => {
    await delay(800);

    let filteredRecords = [...mockMedicalRecords];

    if (filters.patientId) {
      filteredRecords = filteredRecords.filter(
        (record) => record.patientId === filters.patientId
      );
    }

    if (filters.doctorId) {
      filteredRecords = filteredRecords.filter(
        (record) => record.doctorId === filters.doctorId
      );
    }

    if (filters.recordType) {
      filteredRecords = filteredRecords.filter(
        (record) => record.recordType === filters.recordType
      );
    }

    // Sort by date descending (most recent first)
    filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filteredRecords;
  },

  // Consultations API
  getConsultations: async (filters = {}) => {
    await delay(800);

    let filteredConsultations = [...mockConsultations];

    if (filters.patientId) {
      filteredConsultations = filteredConsultations.filter(
        (consult) => consult.patientId === filters.patientId
      );
    }

    if (filters.doctorId) {
      filteredConsultations = filteredConsultations.filter(
        (consult) => consult.doctorId === filters.doctorId
      );
    }

    // Sort by date descending (most recent first)
    filteredConsultations.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filteredConsultations;
  },

  // Lab Results Details API
  getLabResultDetails: async (reportId) => {
    await delay(600);

    const details = mockLabResultDetails.find(
      (detail) => detail.reportId === reportId
    );

    if (!details) {
      throw { response: { data: { message: "Lab result details not found" } } };
    }

    return details;
  },

  // New function to get AI diagnosis history for a patient
  getAIDiagnosticHistory: async (patientId) => {
    await delay(800);

    try {
      const history = mockAIDiagnosticHistory.filter(
        (diagnosis) => diagnosis.patientId === patientId
      );

      return history;
    } catch (error) {
      console.error("Error fetching AI diagnosis history:", error);
      throw error;
    }
  },

  // Helper to get all associated lab results for a patient
  getPatientLabResults: async (patientId) => {
    await delay(700);

    const labResults = mockLabReports.filter(
      (report) => report.patient === patientId
    );

    // Enhance lab results with detailed information
    return Promise.all(
      labResults.map(async (result) => {
        let details = null;
        if (result.detailId) {
          details = mockLabResultDetails.find(
            (detail) => detail._id === result.detailId
          );
        }

        return {
          ...result,
          details,
          abnormalFindings: details
            ? details.components.filter((c) => c.flagged).length
            : 0,
        };
      })
    );
  },

  // Helper to get all associated consultations for a patient with enhanced relationships
  getPatientConsultations: async (patientId) => {
    await delay(600);

    const consultations = mockConsultations.filter(
      (consult) => consult.patientId === patientId
    );

    // Enhance consultations with doctor information and related medical records
    return Promise.all(
      consultations.map(async (consult) => {
        const doctor = mockUsers.find((user) => user._id === consult.doctorId);
        const medicalRecord = mockMedicalRecords.find(
          (record) => record._id === consult.medicalRecordId
        );

        return {
          ...consult,
          doctor: doctor
            ? {
                _id: doctor._id,
                name: doctor.name,
                specialization: doctor.specialization,
              }
            : null,
          medicalRecord: medicalRecord || null,
        };
      })
    );
  },

  // Get a comprehensive patient summary with all related data
  getPatientSummary: async (patientId) => {
    await delay(900);

    try {
      const patient = await mockApi.getPatientById(patientId);
      if (!patient) {
        throw new Error("Patient not found");
      }

      // Get all related data in parallel
      const [
        appointments,
        labResults,
        consultations,
        medicalRecords,
        aiDiagnostics,
      ] = await Promise.all([
        mockApi.getAppointments({ patient: patientId }),
        mockApi.getPatientLabResults(patientId),
        mockApi.getPatientConsultations(patientId),
        mockApi.getMedicalRecords({ patientId }),
        mockApi.getAIDiagnosticHistory(patientId),
      ]);

      return {
        patient,
        appointments,
        labResults,
        consultations,
        medicalRecords,
        aiDiagnostics,
        vitalTrends: generateVitalTrends(medicalRecords),
        diagnosisSummary: generateDiagnosisSummary(
          medicalRecords,
          aiDiagnostics
        ),
      };
    } catch (error) {
      console.error("Error fetching patient summary:", error);
      throw error;
    }
  },

  // Near the top of the file, add a new function for Gemini API integration

  // Function to call Google Gemini API
  callGeminiAPI: async (prompt, apiKey) => {
    try {
      if (!apiKey) {
        console.warn(
          "No API key provided for Gemini API. Using mock response."
        );
        return mockGeminiResponse(prompt);
      }

      // Use the exact same URL and format as the backend
      const GEMINI_API_URL =
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
      const url = `${GEMINI_API_URL}?key=${apiKey}`;

      // Format messages exactly like the backend does
      const messages = [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ];

      const requestBody = {
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      };

      console.log("Making Gemini API request to:", GEMINI_API_URL);
      console.log("Using API Key:", apiKey ? "Valid key provided" : "No key");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error response:", errorText);
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API response received with status: OK");

      // Extract text from response exactly like the backend
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error(
          "Unexpected response format:",
          JSON.stringify(data).substring(0, 200) + "..."
        );
        throw new Error("Unexpected response format from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return mockGeminiResponse(prompt);
    }
  },

  // Generate a medical diagnostic prompt based on symptoms and patient data
  generateDiagnosticPrompt: (symptoms, patientData, labResults) => {
    return `
You are an AI medical diagnostic assistant providing support to a healthcare professional.

Patient Information:
- Name: ${patientData.name || "Unknown"}
- Age: ${
      patientData.dateOfBirth
        ? new Date().getFullYear() -
          new Date(patientData.dateOfBirth).getFullYear()
        : "Unknown"
    }
- Gender: ${patientData.gender || "Unknown"}
- Blood Group: ${patientData.bloodGroup || "Unknown"}

Reported Symptoms:
${symptoms.map((symptom) => `- ${symptom}`).join("\n")}

${
  labResults && labResults.length > 0
    ? `Recent Lab Results:
${labResults
  .map((report) => `- ${report.reportType}: ${report.results}`)
  .join("\n")}`
    : "No recent lab results available."
}

Based on the provided information, please analyze the possible diagnoses. For each potential diagnosis:
1. Provide the name of the condition
2. Assign a confidence score (0-100%)
3. Write a brief description of the condition
4. List the key factors that contribute to this diagnosis and assign weights to each factor (0-100)
5. Provide recommendations for further testing or treatment

Format your response in JSON following this structure:
{
  "summary": "Brief overall summary of the diagnostic assessment",
  "diagnoses": [
    {
      "id": "d1",
      "name": "Diagnosis Name",
      "confidence": 85,
      "description": "Brief description of the condition",
      "keyFactors": [
        { "factor": "Factor 1 description", "weight": 90 },
        { "factor": "Factor 2 description", "weight": 75 }
      ],
      "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ]
    }
  ]
}

Include 2-4 potential diagnoses, with varying confidence levels, ordered by confidence (highest first).
`;
  },

  // Enhanced version of getAIDiagnosticSuggestion that uses all available patient data
  getAIDiagnosticSuggestionV2: async (patientId, diagnosticRequest = {}) => {
    await delay(2000); // Simulate a detailed analysis

    try {
      // Get patient data
      const patient = await mockApi.getPatientById(patientId);
      if (!patient) {
        throw new Error("Patient not found");
      }

      // If we have specific symptoms from the request, use those instead of extracting them
      const symptoms = diagnosticRequest.symptoms || [];

      // Get lab results if needed
      const labResults = await mockApi.getLabReports({ patient: patientId });

      // If Gemini API key is provided, try to use it
      if (diagnosticRequest.geminiApiKey) {
        try {
          const prompt = mockApi.generateDiagnosticPrompt(
            symptoms,
            patient,
            labResults
          );
          const geminiResponse = await mockApi.callGeminiAPI(
            prompt,
            diagnosticRequest.geminiApiKey
          );

          // Parse the Gemini response as JSON
          try {
            const parsedResponse = JSON.parse(geminiResponse.trim());

            // Add some context information to the response
            parsedResponse.patientContext = {
              recentSymptoms: symptoms,
              relevantHistory: extractChronicConditions({
                medicalRecords: mockMedicalRecords.filter(
                  (record) => record.patientId === patientId
                ),
              }),
              recentLabResults: labResults.map(
                (report) => `${report.reportType}: ${report.results}`
              ),
              currentMedications: [
                "Lisinopril 10mg daily",
                "Metformin 500mg twice daily",
              ],
            };

            console.log("Gemini diagnostic results:", parsedResponse);
            return parsedResponse;
          } catch (parseError) {
            console.error("Error parsing Gemini response as JSON:", parseError);
            console.log("Raw Gemini response:", geminiResponse);
            // Fall back to the mock implementation
          }
        } catch (geminiError) {
          console.error("Error using Gemini API:", geminiError);
          // Fall back to the mock implementation
        }
      }

      // Fallback to mock implementation if Gemini fails or is not available
      // Get comprehensive patient data
      const patientSummary = await mockApi.getPatientSummary(patientId);

      // Override extracted symptoms with user-selected symptoms if available
      const recentSymptoms =
        symptoms.length > 0 ? symptoms : extractRecentSymptoms(patientSummary);
      const chronicConditions = extractChronicConditions(patientSummary);
      const abnormalLabFindings = extractAbnormalLabFindings(patientSummary);
      const vitalSigns = extractLatestVitalSigns(patientSummary);
      const medicationHistory = extractMedicationHistory(patientSummary);
      const ageRelatedFactors = calculateAgeRelatedFactors(
        patientSummary.patient
      );

      // Generate AI diagnosis results
      const diagnosisResults = {
        summary: generateDiagnosisSummary(
          patientSummary.medicalRecords,
          patientSummary.aiDiagnostics
        ),
        diagnoses: generatePotentialDiagnoses(
          recentSymptoms,
          chronicConditions,
          abnormalLabFindings,
          vitalSigns,
          medicationHistory,
          ageRelatedFactors
        ),
        patientContext: {
          recentSymptoms,
          relevantHistory: chronicConditions,
          recentLabResults: abnormalLabFindings.map(
            (f) => `${f.name}: ${f.value} ${f.unit} (Abnormal)`
          ),
          currentMedications: medicationHistory,
        },
      };

      return diagnosisResults;
    } catch (error) {
      console.error("Error generating AI diagnostic suggestion:", error);
      throw error;
    }
  },

  // Enhanced methods for the redesigned medical records and lab reports views
  getFormattedLabReports: async (patientId) => {
    try {
      const basicReports = await mockApi.getLabReports({ patient: patientId });

      // Process the report data to make it more suitable for the enhanced LabReportCard
      const enhancedReports = basicReports.map((report) => {
        const components = [];

        // Convert the results object to a components array with proper formatting
        if (report.results && typeof report.results === "object") {
          Object.entries(report.results).forEach(([key, value]) => {
            // Determine if this result should be flagged as abnormal
            let flagged = false;

            // Simple flagging logic for common parameters
            if (key === "Glucose" && parseFloat(value) > 120) flagged = true;
            if (key === "HbA1c" && parseFloat(value) > 6.5) flagged = true;
            if (key === "Cholesterol" && parseFloat(value) > 200)
              flagged = true;
            if (key === "LDL Cholesterol" && parseFloat(value) > 130)
              flagged = true;
            if (key === "HDL Cholesterol" && parseFloat(value) < 40)
              flagged = true;
            if (key === "Triglycerides" && parseFloat(value) > 150)
              flagged = true;

            // Add to components array
            components.push({
              name: key,
              value,
              unit: getUnitForParameter(key),
              flagged,
            });
          });
        }

        return {
          ...report,
          components,
        };
      });

      return enhancedReports;
    } catch (error) {
      console.error("Error fetching formatted lab reports:", error);
      return [];
    }
  },

  getFormattedMedicalRecords: async (patientId) => {
    try {
      // First get the patient information
      const patient = await mockApi.getPatientById(patientId);

      if (!patient) {
        throw new Error(`Patient with ID ${patientId} not found`);
      }

      // Filter the medical records for this patient
      const medicalRecords = mockMedicalRecords.filter(
        (record) => record.patientId === patientId
      );

      // Get doctor information for each record
      const doctorsPromises = medicalRecords.map((record) => {
        return record.doctorId
          ? mockApi.getUserById(record.doctorId)
          : Promise.resolve(null);
      });

      const doctors = await Promise.all(doctorsPromises);

      // Enrich the medical records with related information
      const enhancedRecords = medicalRecords.map((record, index) => {
        // Add doctor name if available
        const doctorInfo = doctors[index];

        return {
          ...record,
          doctorId: doctorInfo
            ? {
                _id: doctorInfo._id,
                name: `${doctorInfo.firstName} ${doctorInfo.lastName}`,
                specialty: doctorInfo.specialty,
              }
            : record.doctorId,
          recordType: record.recordType || "Visit",
        };
      });

      return enhancedRecords;
    } catch (error) {
      console.error("Error fetching formatted medical records:", error);
      return [];
    }
  },

  // Helper function to get the appropriate unit for a lab parameter
  getUnitForParameter: (parameterName) => {
    const units = {
      Glucose: "mg/dL",
      HbA1c: "%",
      Cholesterol: "mg/dL",
      "LDL Cholesterol": "mg/dL",
      "HDL Cholesterol": "mg/dL",
      Triglycerides: "mg/dL",
      "White Blood Cells": "thousand/μL",
      "Red Blood Cells": "million/μL",
      Hemoglobin: "g/dL",
      Hematocrit: "%",
      Platelets: "thousand/μL",
      Sodium: "mmol/L",
      Potassium: "mmol/L",
      Chloride: "mmol/L",
      CO2: "mmol/L",
      BUN: "mg/dL",
      Creatinine: "mg/dL",
      Calcium: "mg/dL",
      Protein: "g/dL",
      Albumin: "g/dL",
      Bilirubin: "mg/dL",
      "Alkaline Phosphatase": "U/L",
      AST: "U/L",
      ALT: "U/L",
      pH: "",
      "Specific Gravity": "",
    };

    return units[parameterName] || "";
  },

  // Get all medications
  getMedications: async (filters = {}) => {
    await delay(300);

    let filteredMeds = [...mockMedications];

    // Apply filters if provided
    if (filters.category) {
      filteredMeds = filteredMeds.filter(
        (med) => med.category === filters.category
      );
    }

    if (filters.stockStatus) {
      filteredMeds = filteredMeds.filter(
        (med) => med.stockStatus === filters.stockStatus
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredMeds = filteredMeds.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm) ||
          med.category.toLowerCase().includes(searchTerm) ||
          med.manufacturer.toLowerCase().includes(searchTerm)
      );
    }

    return filteredMeds;
  },

  // Get medication by ID
  getMedicationById: async (id) => {
    await delay(200);
    const medication = mockMedications.find((med) => med.id === id);
    if (!medication) {
      throw new Error("Medication not found");
    }
    return medication;
  },

  // Add new medication
  addMedication: async (medicationData) => {
    await delay(400);

    // Validate required fields
    if (
      !medicationData.name ||
      !medicationData.category ||
      !medicationData.dosage
    ) {
      throw new Error("Missing required fields");
    }

    // Create new medication with generated ID
    const newMedication = {
      id: `med${mockMedications.length + 1}`,
      ...medicationData,
      stockStatus: calculateStockStatus(medicationData.stock),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockMedications.push(newMedication);
    return newMedication;
  },

  // Update existing medication
  updateMedication: async (id, updates) => {
    await delay(300);

    const index = mockMedications.findIndex((med) => med.id === id);
    if (index === -1) {
      throw new Error("Medication not found");
    }

    // Update the medication
    const updatedMedication = {
      ...mockMedications[index],
      ...updates,
      stockStatus: updates.stock
        ? calculateStockStatus(updates.stock)
        : mockMedications[index].stockStatus,
      updatedAt: new Date().toISOString(),
    };

    mockMedications[index] = updatedMedication;
    return updatedMedication;
  },

  // Delete medication
  deleteMedication: async (id) => {
    await delay(300);

    const index = mockMedications.findIndex((med) => med.id === id);
    if (index === -1) {
      throw new Error("Medication not found");
    }

    // Remove the medication
    mockMedications.splice(index, 1);
    return { success: true, message: "Medication deleted successfully" };
  },

  // Update medication stock
  updateMedicationStock: async (id, stockChange) => {
    await delay(200);

    const index = mockMedications.findIndex((med) => med.id === id);
    if (index === -1) {
      throw new Error("Medication not found");
    }

    // Calculate new stock level
    const newStock = Math.max(0, mockMedications[index].stock + stockChange);

    // Update the medication
    mockMedications[index] = {
      ...mockMedications[index],
      stock: newStock,
      stockStatus: calculateStockStatus(newStock),
      updatedAt: new Date().toISOString(),
    };

    return mockMedications[index];
  },

  // Get medication categories
  getMedicationCategories: async () => {
    await delay(100);
    const categories = [...new Set(mockMedications.map((med) => med.category))];
    return categories;
  },

  // Add a prescription to a patient
  addPrescriptionToPatient: async (patientId, prescriptionData) => {
    await delay(400);

    // Validate required fields
    if (!prescriptionData.medicine || !prescriptionData.dosage) {
      throw new Error("Missing required fields for prescription");
    }

    const patientIndex = mockUsers.findIndex(
      (u) => u._id === patientId && u.role === "patient"
    );

    if (patientIndex === -1) {
      throw new Error("Patient not found");
    }

    // Initialize prescriptions array if it doesn't exist
    if (!Array.isArray(mockUsers[patientIndex].prescriptions)) {
      mockUsers[patientIndex].prescriptions = [];
    }

    // Create a new prescription
    const newPrescription = {
      id: `prescription-${Date.now()}`,
      ...prescriptionData,
      date: prescriptionData.date || new Date().toISOString(),
    };

    // Add to patient's prescriptions
    mockUsers[patientIndex].prescriptions.unshift(newPrescription);

    // If this is a medication from inventory, update its stock
    if (prescriptionData.medicationId) {
      try {
        const medicationIndex = mockMedications.findIndex(
          (med) => med.id === prescriptionData.medicationId
        );
        if (medicationIndex !== -1) {
          // Calculate stock reduction - default to 1 if not specified
          const quantityPrescribed = prescriptionData.quantity || 1;
          mockMedications[medicationIndex].stock = Math.max(
            0,
            mockMedications[medicationIndex].stock - quantityPrescribed
          );
          mockMedications[medicationIndex].stockStatus = calculateStockStatus(
            mockMedications[medicationIndex].stock
          );
        }
      } catch (error) {
        console.error("Error updating medication stock:", error);
        // Continue even if stock update fails
      }
    }

    return newPrescription;
  },

  // Medical chat functionality
  getMedicalChatResponse: async (userMessage, chatHistory = []) => {
    try {
      // Check if Gemini API key is available
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log(
        "API Key check:",
        apiKey ? "API key found ✓" : "No API key found ✗"
      );

      if (apiKey) {
        try {
          console.log(
            "Using Gemini API for medical chat with key:",
            apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 5)
          );

          // Format conversation history in the way Gemini expects
          const formattedMessages = [];

          // Add conversation history
          if (chatHistory.length > 0) {
            // Only include the last 3 messages to keep context manageable
            const recentHistory = chatHistory.slice(-3);

            recentHistory.forEach((msg) => {
              formattedMessages.push({
                role: msg.isUser ? "user" : "model",
                parts: [{ text: msg.text }],
              });
            });
          }

          // Add the current message
          formattedMessages.push({
            role: "user",
            parts: [
              {
                text: `${userMessage}\n\nResponse guidelines: Your response should be focused on medical topics only. Provide evidence-based information, be clear about limitations of AI medical advice, and recommend consulting healthcare professionals for specific health concerns. Always be compassionate and professional, focusing on general health education rather than specific diagnostic conclusions.`,
              },
            ],
          });

          // Make API request with conversation history
          const GEMINI_API_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
          const url = `${GEMINI_API_URL}?key=${apiKey}`;

          const requestBody = {
            contents: formattedMessages,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            },
          };

          console.log(
            "Sending conversation with",
            formattedMessages.length,
            "messages to Gemini API"
          );

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API error response:", errorText);
            throw new Error(
              `Gemini API error: ${response.status} ${response.statusText}`
            );
          }

          const data = await response.json();
          console.log("Gemini API medical response received successfully");

          if (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0]
          ) {
            const assistantResponse = data.candidates[0].content.parts[0].text;
            return {
              text: assistantResponse,
              source: "AI Medical Assistant",
              isUser: false,
            };
          } else {
            throw new Error("Invalid response format from Gemini API");
          }
        } catch (error) {
          console.error("Error with Gemini API, falling back to mock:", error);
          console.log("Falling back to mock response");
          return await simulateMedicalChatResponse(userMessage);
        }
      } else {
        console.log("No API key found, using mock response");
        return await simulateMedicalChatResponse(userMessage);
      }
    } catch (error) {
      console.error("Error in medical chat:", error);
      return {
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        source: "AI Medical Assistant",
        error: true,
      };
    }
  },

  // Function to get response from Gemini API
  getGeminiMedicalResponse: async (userMessage, chatHistory = []) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key not found");
    }

    try {
      console.log("Getting medical response with Gemini API");

      // Format conversation history in the way Gemini expects
      const formattedMessages = [];

      // Add conversation history
      if (chatHistory.length > 0) {
        // Only include the last 3 messages to keep context manageable
        const recentHistory = chatHistory.slice(-3);

        recentHistory.forEach((msg) => {
          formattedMessages.push({
            role: msg.isUser ? "user" : "model",
            parts: [{ text: msg.text }],
          });
        });
      }

      // Add the current message
      formattedMessages.push({
        role: "user",
        parts: [
          {
            text: `${userMessage}\n\nResponse guidelines: Your response should be focused on medical topics only. Provide evidence-based information, be clear about limitations of AI medical advice, and recommend consulting healthcare professionals for specific health concerns. Always be compassionate and professional, focusing on general health education rather than specific diagnostic conclusions.`,
          },
        ],
      });

      // Make API request with conversation history
      const GEMINI_API_URL =
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
      const url = `${GEMINI_API_URL}?key=${apiKey}`;

      const requestBody = {
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      };

      console.log(
        "Sending conversation with",
        formattedMessages.length,
        "messages to Gemini API"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error response:", errorText);
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Gemini API medical response received successfully");

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        const assistantResponse = data.candidates[0].content.parts[0].text;
        return {
          text: assistantResponse,
          source: "AI Medical Assistant",
          isUser: false,
        };
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Error getting Gemini medical response:", error);
      console.log("Falling back to mock response");
      return simulateMedicalChatResponse(userMessage);
    }
  },

  // Analyze symptoms and provide diagnostic insights
  analyzeSymptomsAI: async (selectedSymptoms) => {
    await delay(1500); // Simulate API latency

    const symptomsText = selectedSymptoms.join(", ");

    // Map common symptom combinations to responses
    if (
      selectedSymptoms.includes("Fever") &&
      selectedSymptoms.includes("Cough")
    ) {
      if (selectedSymptoms.includes("Shortness of breath")) {
        return {
          status: "warning",
          title: "Possible Respiratory Infection",
          confidence: 78,
          details: [
            "Symptoms suggest possible respiratory infection",
            "Shortness of breath may indicate lower respiratory involvement",
            "Consider COVID-19 testing based on exposure risk",
          ],
          recommendations: [
            "Rest and hydration",
            "Monitor oxygen levels if possible",
            "Seek medical care if breathing difficulties worsen",
            "Self-isolate until diagnosis confirmed",
          ],
        };
      } else {
        return {
          status: "info",
          title: "Upper Respiratory Infection",
          confidence: 82,
          details: [
            "Symptoms consistent with viral upper respiratory infection",
            "May be common cold or mild seasonal flu",
          ],
          recommendations: [
            "Rest and increased fluid intake",
            "Over-the-counter fever reducers if needed",
            "Monitor symptoms for 3-5 days",
            "Seek care if symptoms worsen or persist beyond 7 days",
          ],
        };
      }
    } else if (
      selectedSymptoms.includes("Headache") &&
      selectedSymptoms.includes("Fatigue")
    ) {
      if (selectedSymptoms.includes("Nausea")) {
        return {
          status: "info",
          title: "Possible Migraine",
          confidence: 75,
          details: [
            "Symptom pattern suggests migraine headache",
            "Associated nausea is common with migraines",
            "May be triggered by stress, diet, or environmental factors",
          ],
          recommendations: [
            "Rest in a quiet, darkened room",
            "Over-the-counter pain relievers may help",
            "Track triggers in a symptom diary",
            "Consider preventive medication if recurrent",
          ],
        };
      }
    } else if (
      selectedSymptoms.includes("Abdominal pain") &&
      (selectedSymptoms.includes("Nausea") ||
        selectedSymptoms.includes("Dizziness"))
    ) {
      return {
        status: "warning",
        title: "Gastrointestinal Disturbance",
        confidence: 70,
        details: [
          "Symptoms suggest gastrointestinal irritation",
          "Could be viral gastroenteritis, food poisoning, or other GI condition",
          "Dehydration risk present with these symptoms",
        ],
        recommendations: [
          "Small sips of clear fluids to prevent dehydration",
          "Avoid solid foods until nausea improves",
          "Gradual return to bland diet",
          "Seek care if symptoms persist beyond 48 hours or if severe pain occurs",
        ],
      };
    }

    // Default response if no specific pattern matched
    return {
      status: "info",
      title: "General Symptom Assessment",
      confidence: 65,
      details: [
        `Analyzing symptoms: ${symptomsText}`,
        "Multiple potential causes for this symptom combination",
        "Insufficient specificity for definitive assessment",
      ],
      recommendations: [
        "Monitor symptoms and track changes",
        "Note duration, intensity and any additional symptoms",
        "Consider consultation with healthcare provider for proper evaluation",
        "Maintain adequate hydration and rest in the meantime",
      ],
    };
  },
};

// Internal helper functions for enhanced diagnostic suggestions

function extractRecentSymptoms(patientSummary) {
  // Extract symptoms from the most recent consultation
  if (patientSummary.consultations.length > 0) {
    // Sort by date descending and take the first
    const sortedConsultations = [...patientSummary.consultations].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return sortedConsultations[0].symptoms || [];
  }

  return [];
}

function extractChronicConditions(patientSummary) {
  // Extract chronic conditions from medical records
  const diagnosisRecords = patientSummary.medicalRecords.filter(
    (record) => record.recordType === "diagnosis"
  );

  // Get unique diagnoses
  const uniqueDiagnoses = new Set();
  diagnosisRecords.forEach((record) => {
    if (record.diagnosis) {
      uniqueDiagnoses.add(record.diagnosis);
    }
  });

  return Array.from(uniqueDiagnoses);
}

function extractAbnormalLabFindings(patientSummary) {
  // Extract abnormal findings from lab results
  const abnormalFindings = [];

  patientSummary.labResults.forEach((result) => {
    if (result.details && result.details.components) {
      const abnormals = result.details.components.filter((c) => c.flagged);
      abnormalFindings.push(...abnormals);
    }
  });

  return abnormalFindings;
}

function extractLatestVitalSigns(patientSummary) {
  // Get the most recent vital signs from medical records or consultations
  const recordsWithVitals = patientSummary.medicalRecords.filter(
    (record) => record.vitalSigns && Object.keys(record.vitalSigns).length > 0
  );

  if (recordsWithVitals.length > 0) {
    const sortedRecords = [...recordsWithVitals].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return sortedRecords[0].vitalSigns;
  }

  return {};
}

function extractMedicationHistory(patientSummary) {
  // This would normally come from a medications collection
  // For now, extract from treatment plans in medical records
  const medicationsList = [];

  patientSummary.medicalRecords.forEach((record) => {
    if (record.treatmentPlan) {
      // Simple extraction - in a real system this would be more structured
      const medsMatch = record.treatmentPlan.match(
        /prescribed|started on|taking (.*?)(?:\.|$)/i
      );
      if (medsMatch && medsMatch[1]) {
        medicationsList.push(medsMatch[1].trim());
      }
    }
  });

  // If nothing found in records, return default medications from the mock system
  return medicationsList.length > 0
    ? medicationsList
    : ["Lisinopril 10mg daily", "Metformin 500mg twice daily"];
}

function calculateAgeRelatedFactors(patient) {
  // Calculate age from date of birth
  if (!patient.dateOfBirth) return [];

  const dob = new Date(patient.dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  // Adjust age if birthday hasn't occurred yet this year
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  // Return age-related risk factors
  const factors = [];

  if (age >= 65) factors.push("Advanced age (65+)");
  if (age >= 50) factors.push("Increased risk of chronic conditions");
  if (age >= 40) factors.push("Recommended for regular preventive screenings");

  return factors;
}

function generateVitalTrends(medicalRecords) {
  // Generate trend data for vitals over time
  const vitalsOverTime = {
    bloodPressure: [],
    heartRate: [],
    bloodGlucose: [],
  };

  // Filter records with vital signs and sort by date
  const recordsWithVitals = medicalRecords
    .filter((record) => record.vitalSigns)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Extract vital trends
  recordsWithVitals.forEach((record) => {
    const date = new Date(record.date).toISOString().split("T")[0];

    if (record.vitalSigns.bloodPressure) {
      const [systolic, diastolic] = record.vitalSigns.bloodPressure
        .split("/")
        .map(Number);
      vitalsOverTime.bloodPressure.push({ date, systolic, diastolic });
    }

    if (record.vitalSigns.heartRate) {
      vitalsOverTime.heartRate.push({
        date,
        value: parseInt(record.vitalSigns.heartRate),
      });
    }

    if (record.vitalSigns.bloodGlucose) {
      vitalsOverTime.bloodGlucose.push({
        date,
        value: parseInt(record.vitalSigns.bloodGlucose),
      });
    }
  });

  return vitalsOverTime;
}

function generateDiagnosisSummary(medicalRecords, aiDiagnostics) {
  // Generate a summary of the patient's diagnostic history
  const activeConditions = medicalRecords
    .filter((record) => record.status === "active" && record.diagnosis)
    .map((record) => record.diagnosis);

  const uniqueConditions = [...new Set(activeConditions)];

  // Check for AI diagnostic agreement
  const aiConfirmedConditions = [];
  if (aiDiagnostics && aiDiagnostics.length > 0) {
    const latestAIDiagnosis = aiDiagnostics[aiDiagnostics.length - 1];

    if (
      latestAIDiagnosis.diagnosisData &&
      latestAIDiagnosis.diagnosisData.diagnoses
    ) {
      const highConfidenceDiagnoses = latestAIDiagnosis.diagnosisData.diagnoses
        .filter((d) => d.confidence >= 70)
        .map((d) => d.name);

      uniqueConditions.forEach((condition) => {
        if (
          highConfidenceDiagnoses.some(
            (aiDx) => aiDx.includes(condition) || condition.includes(aiDx)
          )
        ) {
          aiConfirmedConditions.push(condition);
        }
      });
    }
  }

  // Generate summary text
  if (uniqueConditions.length === 0) {
    return "No active medical conditions identified.";
  } else {
    const conditionsList = uniqueConditions.join(", ");
    const aiConfirmation =
      aiConfirmedConditions.length > 0
        ? ` AI analysis confirms the diagnosis of ${aiConfirmedConditions.join(
            ", "
          )}.`
        : "";

    return `Current active medical conditions: ${conditionsList}.${aiConfirmation}`;
  }
}

function generatePotentialDiagnoses(
  symptoms,
  chronicConditions,
  labFindings,
  vitalSigns,
  medications,
  ageFactors
) {
  // This function would normally contain complex clinical decision logic
  // Here we'll create a simplified version that creates diagnoses based on patterns

  const potentialDiagnoses = [];

  // Check for diabetes indicators
  const hasElevatedGlucose = labFindings.some(
    (finding) => finding.name.includes("Glucose") && finding.flagged
  );
  const hasElevatedHbA1c = labFindings.some(
    (finding) => finding.name.includes("HbA1c") && finding.flagged
  );
  const hasDiabetesSymptoms = symptoms.some((symptom) =>
    ["Increased thirst", "Frequent urination", "Blurred vision"].includes(
      symptom
    )
  );
  const hasDiabetesDiagnosis = chronicConditions.some((condition) =>
    condition.includes("Diabetes")
  );

  if (
    (hasElevatedGlucose || hasElevatedHbA1c || hasDiabetesDiagnosis) &&
    hasDiabetesSymptoms
  ) {
    potentialDiagnoses.push({
      id: "d1",
      name: "Type 2 Diabetes Mellitus",
      confidence: hasElevatedHbA1c ? 95 : hasElevatedGlucose ? 85 : 75,
      description:
        "The patient's symptoms and lab results strongly suggest Type 2 Diabetes Mellitus.",
      keyFactors: [
        {
          factor: "Elevated blood glucose levels in recent lab tests",
          weight: hasElevatedGlucose ? 90 : 60,
        },
        {
          factor: "Elevated HbA1c",
          weight: hasElevatedHbA1c ? 95 : 0,
        },
        {
          factor: "Symptoms of increased thirst and frequent urination",
          weight: hasDiabetesSymptoms ? 85 : 40,
        },
        { factor: "Family history of diabetes (if available)", weight: 75 },
        {
          factor: "Currently taking diabetes medication",
          weight: medications.some((med) =>
            med.toLowerCase().includes("metformin")
          )
            ? 95
            : 0,
        },
      ].filter((factor) => factor.weight > 0),
      recommendations: [
        hasElevatedHbA1c
          ? "Continue current diabetes management plan"
          : "HbA1c test to confirm diagnosis",
        "Regular blood glucose monitoring",
        "Diabetes education and nutritional counseling",
        "Follow-up in 3 months to assess treatment response",
      ],
    });
  }

  // Check for hypertension
  const hasElevatedBP =
    vitalSigns.bloodPressure &&
    (parseInt(vitalSigns.bloodPressure.split("/")[0]) >= 130 ||
      parseInt(vitalSigns.bloodPressure.split("/")[1]) >= 80);

  const hasHypertensionMeds = medications.some(
    (med) =>
      med.toLowerCase().includes("lisinopril") ||
      med.toLowerCase().includes("amlodipine") ||
      med.toLowerCase().includes("losartan")
  );

  if (hasElevatedBP || hasHypertensionMeds) {
    potentialDiagnoses.push({
      id: "d2",
      name: "Hypertension",
      confidence: hasHypertensionMeds ? 90 : hasElevatedBP ? 70 : 50,
      description:
        "Patient shows indicators of hypertension, requiring continued monitoring and treatment.",
      keyFactors: [
        {
          factor: `Elevated blood pressure readings (${
            vitalSigns.bloodPressure || "Not recorded"
          })`,
          weight: hasElevatedBP ? 80 : 30,
        },
        {
          factor: "Currently on anti-hypertensive medication",
          weight: hasHypertensionMeds ? 90 : 0,
        },
        { factor: "Sedentary lifestyle (if reported)", weight: 60 },
        { factor: "Age factor", weight: ageFactors.length > 0 ? 65 : 40 },
      ].filter((factor) => factor.weight > 0),
      recommendations: [
        hasHypertensionMeds
          ? "Continue current anti-hypertensive medication"
          : "Consider initiating anti-hypertensive therapy",
        "Regular blood pressure monitoring",
        "DASH diet recommendation",
        "Increase physical activity",
        "Follow-up visit in 1 month",
      ],
    });
  }

  // Add hypothyroidism if fatigue is present (lower confidence without labs)
  if (symptoms.includes("Fatigue") || symptoms.includes("Weight gain")) {
    potentialDiagnoses.push({
      id: "d3",
      name: "Hypothyroidism",
      confidence: labFindings.some((f) => f.name.includes("TSH") && f.flagged)
        ? 80
        : 32,
      description:
        "Some symptoms align with hypothyroidism, but confidence is low without thyroid function tests.",
      keyFactors: [
        {
          factor: "Fatigue reported by patient",
          weight: symptoms.includes("Fatigue") ? 60 : 0,
        },
        {
          factor: "Weight gain or difficulty losing weight",
          weight: symptoms.includes("Weight gain") ? 55 : 0,
        },
        {
          factor: "Thyroid function test results",
          weight: labFindings.some((f) => f.name.includes("TSH") && f.flagged)
            ? 85
            : 20,
        },
        {
          factor: "Cold sensitivity",
          weight: symptoms.includes("Cold sensitivity") ? 50 : 0,
        },
      ].filter((factor) => factor.weight > 0),
      recommendations: [
        "Thyroid function panel (TSH, T3, T4)",
        "Monitor for additional symptoms",
        "Consider consultation with endocrinology if symptoms persist",
      ],
    });
  }

  // If no specific diagnoses identified, add a general assessment
  if (potentialDiagnoses.length === 0) {
    potentialDiagnoses.push({
      id: "d5",
      name: "Non-specific symptoms requiring further evaluation",
      confidence: 50,
      description:
        "The patient's current symptoms and test results do not clearly indicate a specific diagnosis.",
      keyFactors: [
        { factor: "Mixed non-specific symptoms", weight: 60 },
        { factor: "Incomplete diagnostic workup", weight: 70 },
        {
          factor: "Multiple possible causes for presenting symptoms",
          weight: 65,
        },
      ],
      recommendations: [
        "Complete blood count",
        "Comprehensive metabolic panel",
        "Thyroid function tests",
        "Follow-up in 2 weeks",
      ],
    });
  }

  return potentialDiagnoses;
}

/**
 * Generates a mock response for when the Gemini API is unavailable
 * @param {string} prompt - The prompt that would be sent to the API
 * @returns {string} A mock response
 */
const mockGeminiResponse = (prompt) => {
  // Extract key information from the prompt
  const symptoms =
    prompt.match(/symptoms \((.*?)\)/i)?.[1] || "unknown symptoms";
  const diagnosis =
    prompt.match(/top diagnosis is (.*?) with/i)?.[1] || "Type 2 Diabetes";

  // Extract the doctor's question
  const lines = prompt.split("\n");
  let doctorQuestion = "";
  for (let i = lines.length - 5; i < lines.length; i++) {
    if (lines[i]?.startsWith("Doctor:")) {
      doctorQuestion = lines[i].replace("Doctor:", "").trim();
      break;
    }
  }

  // Generate contextual responses based on the question
  if (doctorQuestion.toLowerCase().includes("treatment")) {
    return `Based on the diagnosis of ${diagnosis}, I would recommend the following treatment approach:

1. Lifestyle modifications: Diet changes focusing on reduced carbohydrate intake, regular exercise (30 minutes daily), and weight management if applicable.

2. Medication: Consider starting with Metformin as first-line therapy if appropriate. Monitor for GI side effects.

3. Follow-up: Regular blood glucose monitoring and HbA1c testing every 3 months.

4. Patient education: Ensure the patient understands the condition and self-management techniques.`;
  } else if (
    doctorQuestion.toLowerCase().includes("prognosis") ||
    doctorQuestion.toLowerCase().includes("outlook")
  ) {
    return `The prognosis for ${diagnosis} is generally favorable with proper management:

- With adherence to treatment and lifestyle modifications, most patients achieve good glycemic control
- Regular monitoring and adjustment of the treatment plan can prevent or delay complications
- Early intervention for any developing complications improves long-term outcomes
- Patient engagement in self-management is a key factor in determining long-term prognosis`;
  } else if (
    doctorQuestion.toLowerCase().includes("test") ||
    doctorQuestion.toLowerCase().includes("lab")
  ) {
    return `For ${diagnosis}, I recommend the following tests to confirm diagnosis and establish a baseline:

1. HbA1c: To assess average blood glucose levels over 2-3 months
2. Fasting blood glucose: To determine baseline glucose levels
3. Lipid panel: To assess cardiovascular risk
4. Kidney function tests (eGFR, urine albumin-to-creatinine ratio): To check for early diabetic nephropathy
5. Baseline eye examination: To screen for diabetic retinopathy`;
  } else {
    return `Based on the symptoms (${symptoms}), the diagnosis of ${diagnosis} appears most likely. This condition typically presents with the symptoms described and requires a comprehensive management approach.

The pathophysiology involves insulin resistance and progressive beta-cell dysfunction, which explains the presenting symptoms. Management typically includes lifestyle modifications, medication therapy, and regular monitoring.

Would you like specific information about treatment options, monitoring protocols, or patient education materials for this condition?`;
  }
};

// At the top of the file, after the mockUsers array but before mockAppointments
// Mock medications data
const mockMedications = [
  {
    id: "med1",
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage: "500mg",
    form: "Capsule",
    stock: 120,
    stockStatus: "high",
    price: 12.99,
    manufacturer: "Pfizer",
    expiryDate: "12/2024",
    description: "Broad-spectrum antibiotic used to treat bacterial infections",
    sideEffects: "Diarrhea, nausea, vomiting, rash",
    prescriptionRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "med2",
    name: "Lisinopril",
    category: "Antihypertensive",
    dosage: "10mg",
    form: "Tablet",
    stock: 45,
    stockStatus: "medium",
    price: 15.5,
    manufacturer: "Merck",
    expiryDate: "06/2024",
    description:
      "ACE inhibitor used to treat high blood pressure and heart failure",
    sideEffects: "Dry cough, dizziness, headache",
    prescriptionRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "med3",
    name: "Metformin",
    category: "Antidiabetic",
    dosage: "850mg",
    form: "Tablet",
    stock: 15,
    stockStatus: "low",
    price: 8.75,
    manufacturer: "GlaxoSmithKline",
    expiryDate: "09/2024",
    description: "First-line medication for the treatment of type 2 diabetes",
    sideEffects: "Nausea, vomiting, diarrhea, abdominal pain",
    prescriptionRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "med4",
    name: "Atorvastatin",
    category: "Statin",
    dosage: "20mg",
    form: "Tablet",
    stock: 78,
    stockStatus: "high",
    price: 22.3,
    manufacturer: "AstraZeneca",
    expiryDate: "03/2025",
    description:
      "Statin medication used to prevent cardiovascular disease and treat high cholesterol",
    sideEffects: "Muscle pain, headache, digestive problems",
    prescriptionRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "med5",
    name: "Albuterol",
    category: "Bronchodilator",
    dosage: "90mcg",
    form: "Inhaler",
    stock: 25,
    stockStatus: "medium",
    price: 45.99,
    manufacturer: "Novartis",
    expiryDate: "11/2024",
    description: "Quick-relief medication for asthma and COPD",
    sideEffects: "Tremor, nervousness, headache, throat irritation",
    prescriptionRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "med6",
    name: "Sertraline",
    category: "SSRI",
    dosage: "50mg",
    form: "Tablet",
    stock: 8,
    stockStatus: "low",
    price: 18.25,
    manufacturer: "Teva",
    expiryDate: "08/2024",
    description:
      "Selective serotonin reuptake inhibitor used to treat depression and anxiety disorders",
    sideEffects: "Nausea, insomnia, dizziness, dry mouth",
    prescriptionRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Add the calculateStockStatus function with other helper functions near the top
// Helper function to calculate stock status based on stock count
const calculateStockStatus = (stock) => {
  if (stock > 50) return "high";
  if (stock > 20) return "medium";
  return "low";
};

// Helper function to simulate medical chat responses
const simulateMedicalChatResponse = async (userMessage) => {
  await delay(1000); // Simulate network delay

  // Simple keyword-based response system
  const lowercaseMessage = userMessage.toLowerCase();

  if (lowercaseMessage.includes("headache")) {
    return {
      text: "Headaches can have various causes including stress, dehydration, lack of sleep, or more serious conditions. How long have you been experiencing this headache? Is it accompanied by any other symptoms like nausea, sensitivity to light, or visual disturbances? I recommend staying hydrated and resting in a quiet, dark room. If your headache is severe, persistent, or accompanied by other concerning symptoms, please consult a healthcare professional immediately.",
      source: "AI Medical Assistant",
    };
  } else if (
    lowercaseMessage.includes("fever") ||
    lowercaseMessage.includes("temperature")
  ) {
    return {
      text: "Fever is often a sign that your body is fighting an infection. It's important to stay hydrated and rest. For adults, a temperature above 103°F (39.4°C) is concerning and might require medical attention. If the fever is accompanied by severe headache, difficulty breathing, rash, or confusion, you should seek medical care promptly. Over-the-counter medications like acetaminophen can help reduce fever, but it's important to address the underlying cause.",
      source: "AI Medical Assistant",
    };
  } else if (
    lowercaseMessage.includes("cough") ||
    lowercaseMessage.includes("cold")
  ) {
    return {
      text: "Coughs are common symptoms of respiratory infections like the common cold or flu. Staying hydrated, using a humidifier, and taking over-the-counter cough medicine may help. If your cough is severe, produces thick greenish-yellow phlegm, or is accompanied by shortness of breath, high fever, or chest pain, please consult a healthcare provider. A persistent cough lasting more than a few weeks should also be evaluated by a doctor.",
      source: "AI Medical Assistant",
    };
  } else if (
    lowercaseMessage.includes("pain") ||
    lowercaseMessage.includes("ache")
  ) {
    return {
      text: "Pain can have many causes and manifestations. The treatment depends on the location, severity, and cause of the pain. Rest, ice/heat therapy, and over-the-counter pain relievers may help with minor pain. However, severe, sudden, or persistent pain should be evaluated by a healthcare professional, especially if it's accompanied by other symptoms or affects your daily activities. Could you provide more details about the location and nature of your pain?",
      source: "AI Medical Assistant",
    };
  } else {
    // Default response for any other query
    return {
      text: "I understand you're concerned about your health. To provide better information, I'd need more specific details about your symptoms, including when they started, their severity, and any other symptoms you might be experiencing. Remember that while I can offer general health information, I'm not a substitute for professional medical advice. If you're experiencing severe or concerning symptoms, please consult with a healthcare professional.",
      source: "AI Medical Assistant",
    };
  }
};

export default mockApi;
