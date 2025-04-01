import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUserInjured,
  FaCalendarAlt,
  FaFileMedical,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};
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
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.color || props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(2)};

  svg {
    color: white;
    font-size: 1.5rem;
  }
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

const SectionTitle = styled.h2`
  margin-top: ${(props) => props.theme.spacing(4)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const Dashboard = () => {
  // Mock data - in a real app, this would come from API calls
  const stats = [
    {
      icon: <FaUserInjured />,
      value: 1248,
      label: "Total Patients",
      color: "#4A90E2",
    },
    {
      icon: <FaCalendarAlt />,
      value: 42,
      label: "Today's Appointments",
      color: "#50C878",
    },
    {
      icon: <FaFileMedical />,
      value: 156,
      label: "New Records (This Week)",
      color: "#F5A623",
    },
    {
      icon: <FaFileInvoiceDollar />,
      value: "$24,568",
      label: "Revenue (This Month)",
      color: "#E74C3C",
    },
  ];

  return (
    <div>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatIcon color={stat.color}>{stat.icon}</StatIcon>
            <StatContent>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatContent>
          </StatCard>
        ))}
      </StatsGrid>

      <SectionTitle>Recent Patients</SectionTitle>
      <Card>
        <p>Patient list will go here</p>
      </Card>

      <SectionTitle>Upcoming Appointments</SectionTitle>
      <Card>
        <p>Appointment list will go here</p>
      </Card>
    </div>
  );
};

export default Dashboard;
