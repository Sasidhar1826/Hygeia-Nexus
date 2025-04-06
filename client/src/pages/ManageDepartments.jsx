const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (modalMode === "add") {
      // Add default isActive: true for new departments
      const departmentData = {
        ...formData,
        isActive: true,
      };

      // Use api to add a new department
      const newDepartment = await api.createDepartment(departmentData);

      // Update local state with the new department
      setDepartments([...departments, newDepartment]);
      setFilteredDepartments([...filteredDepartments, newDepartment]);
    } else {
      // Preserve the isActive status when updating
      const departmentData = {
        ...formData,
        isActive: currentDepartment.isActive,
      };

      // Use api to update the department
      const updatedDepartment = await api.updateDepartment(
        currentDepartment._id,
        departmentData
      );

      // Update local state with the updated department
      const updatedDepartments = departments.map((dept) =>
        dept._id === currentDepartment._id ? updatedDepartment : dept
      );

      setDepartments(updatedDepartments);
      setFilteredDepartments(updatedDepartments);
    }

    closeModal();
  } catch (error) {
    console.error("Error saving department:", error);
    setError("Failed to save department. Please try again.");
  }
};
