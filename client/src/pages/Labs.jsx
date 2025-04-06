import api from "../services/apiService";

const fetchLabReports = async () => {
  try {
    setIsLoading(true);
    // Fetch lab reports from api
    const data = await api.getLabReports(filters);
    setLabReports(data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching lab reports:", error);
    setIsLoading(false);
  }
};

const handleDeleteReport = async (reportId) => {
  try {
    await api.deleteLabReport(reportId);
    setLabReports(labReports.filter((report) => report._id !== reportId));
    toast.success("Lab report deleted successfully");
  } catch (error) {
    console.error("Error deleting lab report:", error);
    toast.error("Failed to delete lab report");
  }
};
