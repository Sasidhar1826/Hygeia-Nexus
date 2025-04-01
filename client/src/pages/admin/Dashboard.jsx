import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaUserInjured,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaExclamationTriangle,
  FaFlask,
  FaHospital,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import api from "../../services/api";
import { Link } from "react-router-dom";
import mockApi from "../../services/mockApi";

// Import Chart.js in a way that works with React
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  DoughnutController,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  DoughnutController
);

// Component styling
const DashboardContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Admin action cards
const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: ${(props) => props.theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadows.medium};
  }
`;

const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const ActionTitle = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const ActionDescription = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const ActionLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.primary.main};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;

  svg {
    margin-left: ${(props) => props.theme.spacing(0.5)};
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: ${(props) => props.theme.shadows.small};
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  padding: ${(props) => props.theme.spacing(3)};
  height: 100%;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const AlertsSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const AlertCard = styled(motion.div)`
  background-color: ${(props) =>
    props.type === "warning"
      ? props.theme.colors.status.warning + "20"
      : props.type === "error"
      ? props.theme.colors.status.error + "20"
      : props.theme.colors.status.info + "20"};
  border-left: 4px solid
    ${(props) =>
      props.type === "warning"
        ? props.theme.colors.status.warning
        : props.type === "error"
        ? props.theme.colors.status.error
        : props.theme.colors.status.info};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
`;

const AlertIcon = styled.div`
  color: ${(props) =>
    props.type === "warning"
      ? props.theme.colors.status.warning
      : props.type === "error"
      ? props.theme.colors.status.error
      : props.theme.colors.status.info};
  font-size: 1.25rem;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const AlertMessage = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// Create a custom chart component that properly handles cleanup
const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

// Simple chart components with proper cleanup
const LineChartComponent = ({ data, options, id }) => {
  const chartRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      // Clear any existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new ChartJS(ctx, {
        type: "line",
        data: data,
        options: options || {},
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={canvasRef} id={id} />;
};

const BarChartComponent = ({ data, options, id }) => {
  const chartRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      // Clear any existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new ChartJS(ctx, {
        type: "bar",
        data: data,
        options: options || {},
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={canvasRef} id={id} />;
};

const DoughnutChartComponent = ({ data, options, id }) => {
  const chartRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      // Clear any existing chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new ChartJS(ctx, {
        type: "doughnut",
        data: data,
        options: options || {},
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={canvasRef} id={id} key={id} />;
};

// A wrapper component that handles errors gracefully
const ChartErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>Chart could not be loaded</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onError: () => setHasError(true),
      })}
    </React.Fragment>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    recentAppointments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Use mockApi to get data
        const patients = await mockApi.getPatients();
        const doctors = await mockApi.getDoctors();
        const appointments = await mockApi.getAppointments();

        // Calculate stats
        const pendingAppointments = appointments.filter(
          (a) => a.status === "pending" || a.status === "scheduled"
        ).length;

        const recentAppointments = appointments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          totalAppointments: appointments.length,
          pendingAppointments,
          recentAppointments,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError(
          "Failed to load dashboard statistics. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Mock data for charts
  const appointmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Appointments",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "#4A90E2",
        tension: 0.1,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12500, 15000, 18000, 16000, 21000, 28750],
        backgroundColor: "#10B981",
      },
    ],
  };

  const departmentData = {
    labels: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Other"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#4A90E2",
          "#F59E0B",
          "#10B981",
          "#EF4444",
          "#8B5CF6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart",
      },
    },
  };

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Low Medication Stock",
      message:
        "5 medications are running low on stock and need to be reordered.",
    },
    {
      id: 2,
      type: "info",
      title: "System Maintenance",
      message: "Scheduled maintenance on June 15th from 2:00 AM to 4:00 AM.",
    },
    {
      id: 3,
      type: "error",
      title: "Payment Processing Issue",
      message:
        "There was an issue with the payment gateway. Some transactions may be delayed.",
    },
  ];

  if (loading) return <div>Loading dashboard data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DashboardContainer>
      <SectionTitle>Dashboard Overview</SectionTitle>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatIcon color="#4A90E2">
            <FaUserMd />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalDoctors}</StatValue>
            <StatLabel>Doctors</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatIcon color="#10B981">
            <FaUserInjured />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalPatients}</StatValue>
            <StatLabel>Patients</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatIcon color="#F59E0B">
            <FaCalendarAlt />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalAppointments}</StatValue>
            <StatLabel>Appointments</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatIcon color="#8B5CF6">
            <FaFlask />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.pendingAppointments}</StatValue>
            <StatLabel>Pending Appointments</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Admin Actions</SectionTitle>

      <ActionGrid>
        <ActionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ActionHeader>
            <ActionIcon color="#4A90E2">
              <FaUserMd />
            </ActionIcon>
            <ActionTitle>Manage Doctors</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Add, edit, or remove doctors. Update doctor information and manage
            their departments.
          </ActionDescription>
          <ActionLink to="/dashboard/admin/doctors">
            Manage Doctors <FaArrowRight size={12} />
          </ActionLink>
        </ActionCard>

        <ActionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ActionHeader>
            <ActionIcon color="#10B981">
              <FaUserInjured />
            </ActionIcon>
            <ActionTitle>Manage Patients</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            View all patients, add new patients, and update existing patient
            records.
          </ActionDescription>
          <ActionLink to="/dashboard/admin/patients">
            Manage Patients <FaArrowRight size={12} />
          </ActionLink>
        </ActionCard>

        <ActionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ActionHeader>
            <ActionIcon color="#8B5CF6">
              <FaFlask />
            </ActionIcon>
            <ActionTitle>Manage Lab Technicians</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Add, edit, or remove lab technicians. Assign specializations and
            manage their information.
          </ActionDescription>
          <ActionLink to="/dashboard/admin/lab-technicians">
            Manage Lab Technicians <FaArrowRight size={12} />
          </ActionLink>
        </ActionCard>

        <ActionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <ActionHeader>
            <ActionIcon color="#F59E0B">
              <FaCalendarAlt />
            </ActionIcon>
            <ActionTitle>Manage Appointments</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            View, schedule, reschedule, or cancel appointments. Manage
            appointment status.
          </ActionDescription>
          <ActionLink to="/dashboard/admin/appointments">
            Manage Appointments <FaArrowRight size={12} />
          </ActionLink>
        </ActionCard>

        <ActionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ActionHeader>
            <ActionIcon color="#EF4444">
              <FaHospital />
            </ActionIcon>
            <ActionTitle>Manage Departments</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Create and manage hospital departments. Assign doctors to
            departments.
          </ActionDescription>
          <ActionLink to="/dashboard/admin/departments">
            Manage Departments <FaArrowRight size={12} />
          </ActionLink>
        </ActionCard>
      </ActionGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Appointment Trends</ChartTitle>
          <ChartContainer>
            <ChartErrorBoundary>
              <LineChartComponent
                data={appointmentData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Appointment Trends",
                    },
                  },
                }}
                id="appointment-chart"
              />
            </ChartErrorBoundary>
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Department Distribution</ChartTitle>
          <ChartContainer>
            <ChartErrorBoundary>
              <DoughnutChartComponent
                data={departmentData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Department Distribution",
                    },
                  },
                }}
                id="department-chart"
              />
            </ChartErrorBoundary>
          </ChartContainer>
        </ChartCard>
      </ChartsGrid>

      <ChartCard>
        <ChartTitle>Monthly Revenue</ChartTitle>
        <ChartContainer>
          <ChartErrorBoundary>
            <BarChartComponent
              data={revenueData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Monthly Revenue",
                  },
                },
              }}
              id="revenue-chart"
            />
          </ChartErrorBoundary>
        </ChartContainer>
      </ChartCard>

      <AlertsSection>
        <SectionTitle>System Alerts</SectionTitle>

        {alerts.map((alert, index) => (
          <AlertCard
            key={alert.id}
            type={alert.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AlertIcon type={alert.type}>
              <FaExclamationTriangle />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertMessage>{alert.message}</AlertMessage>
            </AlertContent>
          </AlertCard>
        ))}
      </AlertsSection>
    </DashboardContainer>
  );
};

export default Dashboard;
