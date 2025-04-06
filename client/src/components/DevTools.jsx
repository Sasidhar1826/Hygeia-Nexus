import React, { useState } from "react";
import styled from "styled-components";
import {
  FaBug,
  FaChevronDown,
  FaChevronUp,
  FaRandom,
  FaTimes,
} from "react-icons/fa";

// Mock data for different form types
const mockData = {
  login: {
    admin: {
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    doctor: {
      email: "jane.smith@example.com",
      password: "doctor123",
      role: "doctor",
    },
    patient: {
      email: "amit.sharma@example.com",
      password: "patient123",
      role: "patient",
    },
    labtech: {
      email: "rahul.verma@example.com",
      password: "labtech123",
      role: "labtechnician",
    },
  },
  signup: {
    doctor: {
      name: "Dr. Sample Doctor",
      email: "sample.doctor@example.com",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      role: "doctor",
      specialty: "Cardiology",
      licenseNumber: "DOC-12345",
    },
    admin: {
      name: "Sample Admin",
      email: "sample.admin@example.com",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      role: "admin",
      staffId: "ADMIN-12345",
      adminKey: "admin123",
    },
    patient: {
      firstName: "Sample",
      lastName: "Patient",
      email: "sample.patient@example.com",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      gender: "male",
      dateOfBirth: "1990-01-01",
      phoneNumber: "9876543210",
      bloodGroup: "O+",
      aadhaarNumber: "123456789012",
      address: "123 Sample Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      role: "patient",
    },
    labtechnician: {
      name: "Sample Lab Tech",
      email: "sample.labtech@example.com",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      role: "labtechnician",
      specialization: "Hematology",
      licenseNumber: "LAB-12345",
    },
  },
  appointment: {
    default: {
      reason: "Regular checkup and consultation",
      additionalNotes:
        "I have been experiencing mild headaches in the morning for the past week.",
      agreeToTerms: true,
    },
  },
  labReport: {
    default: {
      testName: "Complete Blood Count (CBC)",
      summary: "All parameters are within normal range.",
      results: [
        {
          parameter: "Hemoglobin",
          value: "14.5",
          unit: "g/dL",
          normalRange: "13.5-17.5",
        },
        {
          parameter: "RBC",
          value: "5.2",
          unit: "million/µL",
          normalRange: "4.5-5.9",
        },
        {
          parameter: "WBC",
          value: "7.5",
          unit: "thousand/µL",
          normalRange: "4.5-11.0",
        },
      ]
        .map((r) => JSON.stringify(r))
        .join("\n"),
    },
  },
  prescription: {
    default: {
      diagnosis: "Seasonal Allergic Rhinitis",
      medications: [
        {
          name: "Cetirizine",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "7 days",
        },
        {
          name: "Fluticasone Nasal Spray",
          dosage: "2 sprays per nostril",
          frequency: "Twice daily",
          duration: "14 days",
        },
      ]
        .map((m) => JSON.stringify(m))
        .join("\n"),
      instructions:
        "Take medication after meals. Avoid dust and pollen exposure.",
    },
  },
};

// Main component styling
const DevToolContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2a2a2a;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  width: ${(props) => (props.isExpanded ? "320px" : "auto")};
  transition: width 0.3s ease;
  overflow: hidden;
  font-family: "Courier New", monospace;
`;

const DevToolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #1e1e1e;
  cursor: pointer;
  user-select: none;
`;

const DevToolTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #61dafb;
`;

const DevToolContent = styled.div`
  padding: ${(props) => (props.isExpanded ? "15px" : "0")};
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  overflow-y: auto;
  transition: all 0.3s ease;
`;

const FormTypeSelector = styled.div`
  margin-bottom: 15px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  background-color: #3a3a3a;
  color: #fff;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  font-family: "Courier New", monospace;

  &:focus {
    outline: none;
    border-color: #61dafb;
  }
`;

const FillButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #61dafb;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4fd0fa;
  }

  &:active {
    background-color: #30a0c8;
  }
`;

const HiddenMessage = styled.div`
  margin-top: 10px;
  padding: 8px;
  background-color: #3a3a3a;
  border-left: 3px solid #61dafb;
  color: #e0e0e0;
  font-size: 12px;
`;

/**
 * Developer Tools component for quick form filling
 */
const DevTools = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formType, setFormType] = useState("login");
  const [subType, setSubType] = useState("patient"); // Initialize with a default value
  const [message, setMessage] = useState("");

  // Show or hide dev tools based on developer mode setting
  const isDeveloperMode = import.meta.env.VITE_DEVELOPER_MODE === "true";

  if (!isDeveloperMode) {
    return null;
  }

  // Find all form elements and fill them with mock data
  const fillFormWithData = (data) => {
    console.log("Filling form with data:", data);
    const forms = document.querySelectorAll("form");
    if (!forms.length) {
      setMessage("No forms found on this page");
      return;
    }

    // Try to find the most relevant form
    const form = forms[0]; // Default to first form

    // Debug form fields
    const formFields = Array.from(
      form.querySelectorAll("input, select, textarea")
    ).map((input) => ({
      type: input.type,
      name: input.name,
      id: input.id,
    }));
    console.log("Form fields found:", formFields);
    console.log("Data keys:", Object.keys(data));

    // Clear previous values
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      // Skip hidden inputs and submit buttons
      if (input.type === "hidden" || input.type === "submit") return;

      // Get the field name or id
      const fieldName = input.name || input.id;

      // Try to find a matching field in our data
      let matchingValue = null;

      // Direct match
      if (fieldName && data[fieldName] !== undefined) {
        matchingValue = data[fieldName];
      }
      // Try fuzzy matching for common field patterns
      else {
        // Check for common field name patterns
        if (/email/i.test(fieldName) && data.email) {
          matchingValue = data.email;
        } else if (/password/i.test(fieldName) && data.password) {
          matchingValue = data.password;
        } else if (
          /confirm.*password/i.test(fieldName) &&
          data.confirmPassword
        ) {
          matchingValue = data.confirmPassword;
        } else if (/name/i.test(fieldName)) {
          if (/first/i.test(fieldName) && data.firstName) {
            matchingValue = data.firstName;
          } else if (/last/i.test(fieldName) && data.lastName) {
            matchingValue = data.lastName;
          } else if (data.name) {
            matchingValue = data.name;
          }
        } else if (/reason/i.test(fieldName) && data.reason) {
          matchingValue = data.reason;
        } else if (/notes/i.test(fieldName) && data.additionalNotes) {
          matchingValue = data.additionalNotes;
        } else if (
          /terms/i.test(fieldName) &&
          data.agreeToTerms !== undefined
        ) {
          matchingValue = data.agreeToTerms;
        } else if (/gender/i.test(fieldName) && data.gender) {
          matchingValue = data.gender;
        } else if (/birth|dob/i.test(fieldName) && data.dateOfBirth) {
          matchingValue = data.dateOfBirth;
        } else if (/phone/i.test(fieldName) && data.phoneNumber) {
          matchingValue = data.phoneNumber;
        } else if (/blood/i.test(fieldName) && data.bloodGroup) {
          matchingValue = data.bloodGroup;
        } else if (/address/i.test(fieldName) && data.address) {
          matchingValue = data.address;
        } else if (/city/i.test(fieldName) && data.city) {
          matchingValue = data.city;
        } else if (/state/i.test(fieldName) && data.state) {
          matchingValue = data.state;
        } else if (/pin|zip|postal/i.test(fieldName) && data.pincode) {
          matchingValue = data.pincode;
        } else if (/specialty|specialization/i.test(fieldName)) {
          matchingValue = data.specialty || data.specialization;
        } else if (/license/i.test(fieldName) && data.licenseNumber) {
          matchingValue = data.licenseNumber;
        }
      }

      // If we found a matching value, set it
      if (matchingValue !== null) {
        console.log(`Setting field ${fieldName} to:`, matchingValue);

        // Set value based on input type
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = !!matchingValue;
          // Trigger change event for React state to update
          input.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (input.tagName === "SELECT") {
          const optionValue = matchingValue?.toString();
          const option = Array.from(input.options).find(
            (opt) => opt.value === optionValue
          );
          if (option) {
            input.value = optionValue;
            // Trigger change event
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        } else {
          input.value = matchingValue;
          // Trigger input event to update React state
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    });

    // Handle additional form-specific interactions
    handleFormTypeSpecificInteractions(formType, data);

    setMessage(
      `Form filled with ${formType}${subType ? ` (${subType})` : ""} data`
    );
  };

  // Handle special form-specific interactions that require more than just filling inputs
  const handleFormTypeSpecificInteractions = (type, data) => {
    switch (type) {
      case "login":
        // Try to click the role selector button
        const roleButtons = Array.from(
          document.querySelectorAll("button")
        ).filter((btn) =>
          btn.textContent?.toLowerCase().includes(data.role?.toLowerCase())
        );

        if (roleButtons.length > 0) {
          roleButtons[0].click();
        }
        break;

      case "appointment":
        // Select a date (first available usually)
        const dateButtons = Array.from(
          document.querySelectorAll("button")
        ).filter((btn) =>
          btn.textContent?.match(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/)
        );

        if (dateButtons.length > 0) {
          // Click first available date
          dateButtons[0].click();

          // Then click a time slot (first available)
          setTimeout(() => {
            const timeSlots = Array.from(
              document.querySelectorAll("button")
            ).filter(
              (btn) =>
                btn.textContent?.match(/\b\d{1,2}:\d{2}\b/) && !btn.disabled
            );

            if (timeSlots.length > 0) {
              timeSlots[0].click();
            }
          }, 100);
        }

        // Select appointment type if available
        setTimeout(() => {
          const appointmentTypes = Array.from(
            document.querySelectorAll("button")
          ).filter(
            (btn) =>
              btn.textContent?.toLowerCase().includes("in-person") ||
              btn.textContent?.toLowerCase().includes("video")
          );

          if (appointmentTypes.length > 0) {
            appointmentTypes[0].click();
          }
        }, 200);
        break;

      default:
        // No special handling needed
        break;
    }
  };

  // Get data options based on the selected form type
  const getDataOptions = () => {
    const data = mockData[formType];
    if (!data) return [];

    return Object.keys(data);
  };

  // Handle form type change
  const handleFormTypeChange = (e) => {
    const newFormType = e.target.value;
    setFormType(newFormType);
    // Set default subType based on available options for the selected form type
    const availableSubTypes = Object.keys(mockData[newFormType] || {});
    setSubType(availableSubTypes.length > 0 ? availableSubTypes[0] : "");
  };

  // Handle fill button click
  const handleFillClick = () => {
    const data = mockData[formType][subType];
    if (data) {
      fillFormWithData(data);
    } else {
      setMessage("No data available for this form type");
    }
  };

  return (
    <DevToolContainer isExpanded={isExpanded}>
      <DevToolHeader onClick={() => setIsExpanded(!isExpanded)}>
        <DevToolTitle>
          <FaBug /> Dev Tools
        </DevToolTitle>
        {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
      </DevToolHeader>

      <DevToolContent isExpanded={isExpanded}>
        <FormTypeSelector>
          <StyledSelect value={formType} onChange={handleFormTypeChange}>
            <option value="login">Login Form</option>
            <option value="signup">Signup Form</option>
            <option value="appointment">Appointment Form</option>
            <option value="labReport">Lab Report Form</option>
            <option value="prescription">Prescription Form</option>
          </StyledSelect>
        </FormTypeSelector>

        {getDataOptions().length > 0 && (
          <FormTypeSelector>
            <StyledSelect
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
            >
              {getDataOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </StyledSelect>
          </FormTypeSelector>
        )}

        <FillButton onClick={handleFillClick}>
          <FaRandom /> Fill Form
        </FillButton>

        {message && <HiddenMessage>{message}</HiddenMessage>}
      </DevToolContent>
    </DevToolContainer>
  );
};

export default DevTools;
