import api from "../services/apiService";

const fetchPatientData = async () => {
  try {
    setLoading(true);
    // Fetch patient data from api
    const patientData = await api.getPatientById(user._id);

    // Fetch patient's appointments
    const appointmentsData = await api.getAppointments({
      patient: user._id,
      status: "upcoming",
    });

    // Fetch patient's prescriptions
    const prescriptionsData = await api.getPrescriptions({
      patient: user._id,
      status: "active",
    });

    // Fetch patient's lab reports
    const labReportsData = await api.getLabReports({
      patient: user._id,
      limit: 10,
    });

    setPatientInfo(patientData);
    setAppointments(appointmentsData);
    setPrescriptions(prescriptionsData);
    setLabReports(labReportsData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    setLoading(false);
  }
};

const handleMarkPrescriptionAsTaken = async (prescriptionId) => {
  try {
    await api.updatePrescription(prescriptionId, { status: "completed" });

    // Update the local state
    setPrescriptions(
      prescriptions.map((prescription) =>
        prescription._id === prescriptionId
          ? { ...prescription, status: "completed" }
          : prescription
      )
    );

    toast.success("Prescription marked as completed");
  } catch (error) {
    console.error("Error updating prescription:", error);
    toast.error("Failed to update prescription");
  }
};
