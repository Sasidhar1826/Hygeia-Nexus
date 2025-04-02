import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFlask,
  FaVial,
  FaClipboardCheck,
  FaClipboardList,
  FaFileMedical,
  FaArrowRight,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaBell,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import AnimationContainer from "../../components/animations/AnimationContainer";
import { useAuth } from "../../context/AuthContext";
import mockApi from "../../services/mockApi";

// Styled components
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.color || "#4A90E2"};
  color: white;
  font-size: 24px;
  margin-right: 15px;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 15px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a90e2;
  text-decoration: none;

  svg {
    margin-left: 5px;
    transition: transform 0.2s ease;
  }

  &:hover {
    text-decoration: underline;

    svg {
      transform: translateX(3px);
    }
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderTime = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
`;

const OrderDate = styled.div`
  font-weight: 600;
  color: #333;
`;

const OrderUrgency = styled.div`
  font-size: 14px;
  color: ${(props) => (props.urgent ? "#E53E3E" : "#666")};
  margin-top: 5px;
  font-weight: ${(props) => (props.urgent ? "bold" : "normal")};
`;

const OrderInfo = styled.div`
  flex: 1;
  margin: 0 15px;
`;

const OrderTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const OrderPatient = styled.div`
  font-size: 14px;
  color: #666;
`;

const OrderStatus = styled.div`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => {
    switch (props.status) {
      case "completed":
        return "#E8F5E9";
      case "in_progress":
        return "#FFF9C4";
      case "pending":
        return "#E3F2FD";
      default:
        return "#F5F5F5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "completed":
        return "#2E7D32";
      case "in_progress":
        return "#F57F17";
      case "pending":
        return "#1565C0";
      default:
        return "#616161";
    }
  }};
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.color || "#f0f8ff"};
  color: ${(props) => props.iconColor || "#4a90e2"};
  font-size: 20px;
  margin-right: 15px;
`;

const AlertInfo = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const AlertDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const NoDataMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
`;

const LabTechnicianDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [labData, setLabData] = useState({
    pendingOrders: [],
    inProgressOrders: [],
    completedReports: [],
    alerts: [],
  });
  const { user } = useAuth();

  useEffect(() => {
    // Fetch data for lab technician
    const fetchLabData = async () => {
      try {
        setLoading(true);

        // Fetch lab orders
        const allOrders = await mockApi.getLabOrders({
          technician: user._id,
        });

        // Fetch lab reports
        const reports = await mockApi.getLabReports({
          technician: user._id,
        });

        // Filter orders by status
        const pendingOrders = allOrders.filter(
          (order) => order.status === "pending"
        );
        const inProgressOrders = allOrders.filter(
          (order) =>
            order.status === "in_progress" &&
            order.technician &&
            order.technician._id === user._id
        );

        // Sort by urgency and date
        const sortedPendingOrders = pendingOrders.sort((a, b) => {
          if (a.urgency === "Urgent" && b.urgency !== "Urgent") return -1;
          if (a.urgency !== "Urgent" && b.urgency === "Urgent") return 1;
          return new Date(a.requestedDate) - new Date(b.requestedDate);
        });

        // Completed reports
        const completedReports = reports.filter(
          (report) => report.status === "completed"
        );

        // Generate alerts (urgent orders, overdue tests, etc.)
        const alerts = [];

        // Add urgent orders to alerts
        sortedPendingOrders
          .filter((order) => order.urgency === "Urgent")
          .forEach((order) => {
            alerts.push({
              id: `urgent-${order._id}`,
              type: "urgent",
              title: `Urgent ${order.testType} needed`,
              details: `Patient: ${
                order.patient?.name || "Unknown"
              } | Requested by: ${order.doctor?.name || "Unknown"}`,
              date: order.requestedDate,
            });
          });

        // Add overdue orders (more than 2 days old)
        allOrders
          .filter((order) => {
            const requestDate = new Date(order.requestedDate);
            const today = new Date();
            const diffTime = Math.abs(today - requestDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 2 && order.status !== "completed";
          })
          .forEach((order) => {
            alerts.push({
              id: `overdue-${order._id}`,
              type: "overdue",
              title: `Overdue: ${order.testType}`,
              details: `Patient: ${
                order.patient?.name || "Unknown"
              } | Requested: ${formatDate(order.requestedDate)}`,
              date: order.requestedDate,
            });
          });

        // Sort alerts by date (newest first)
        const sortedAlerts = alerts.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setLabData({
          pendingOrders: sortedPendingOrders,
          inProgressOrders,
          completedReports,
          alerts: sortedAlerts,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching lab technician data:", error);
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchLabData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <AnimationContainer type="loading" height="400px" />;
  }

  return (
    <div>
      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatIcon color="#4A90E2">
            <FaClipboardList />
          </StatIcon>
          <StatContent>
            <StatValue>{labData.pendingOrders.length || 0}</StatValue>
            <StatLabel>Pending Lab Orders</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatIcon color="#F5A623">
            <FaVial />
          </StatIcon>
          <StatContent>
            <StatValue>{labData.inProgressOrders.length || 0}</StatValue>
            <StatLabel>Tests In Progress</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatIcon color="#50C878">
            <FaClipboardCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{labData.completedReports.length || 0}</StatValue>
            <StatLabel>Completed Reports</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatIcon color="#E74C3C">
            <FaBell />
          </StatIcon>
          <StatContent>
            <StatValue>{labData.alerts.length || 0}</StatValue>
            <StatLabel>Alerts</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <SectionHeader>
        <SectionTitle>Pending Lab Orders</SectionTitle>
        <ViewAllLink to="/dashboard/lab/view-lab-orders">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <OrdersList>
          {labData.pendingOrders.slice(0, 5).map((order) => (
            <OrderItem key={order._id}>
              <OrderTime>
                <OrderDate>{formatDate(order.requestedDate)}</OrderDate>
                <OrderUrgency urgent={order.urgency === "Urgent"}>
                  {order.urgency}
                </OrderUrgency>
              </OrderTime>
              <OrderInfo>
                <OrderTitle>{order.testType}</OrderTitle>
                <OrderPatient>
                  Patient: {order.patient?.name || "Unknown"} | Doctor:{" "}
                  {order.doctor?.name || "Unknown"}
                </OrderPatient>
              </OrderInfo>
              <OrderStatus status={order.status}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </OrderStatus>
            </OrderItem>
          ))}
          {(!labData.pendingOrders || labData.pendingOrders.length === 0) && (
            <NoDataMessage>No pending lab orders found.</NoDataMessage>
          )}
        </OrdersList>
      </Card>

      <SectionHeader>
        <SectionTitle>Tests In Progress</SectionTitle>
        <ViewAllLink to="/dashboard/lab/view-lab-orders">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <OrdersList>
          {labData.inProgressOrders.slice(0, 5).map((order) => (
            <OrderItem key={order._id}>
              <OrderTime>
                <OrderDate>{formatDate(order.requestedDate)}</OrderDate>
                <OrderUrgency urgent={order.urgency === "Urgent"}>
                  {order.urgency}
                </OrderUrgency>
              </OrderTime>
              <OrderInfo>
                <OrderTitle>{order.testType}</OrderTitle>
                <OrderPatient>
                  Patient: {order.patient?.name || "Unknown"} | Doctor:{" "}
                  {order.doctor?.name || "Unknown"}
                </OrderPatient>
              </OrderInfo>
              <Link to={`/dashboard/lab/upload-results/${order._id}`}>
                <FaEye style={{ color: "#4A90E2" }} />
              </Link>
            </OrderItem>
          ))}
          {(!labData.inProgressOrders ||
            labData.inProgressOrders.length === 0) && (
            <NoDataMessage>No tests currently in progress.</NoDataMessage>
          )}
        </OrdersList>
      </Card>

      <SectionHeader>
        <SectionTitle>Alerts</SectionTitle>
      </SectionHeader>

      <Card>
        <AlertsList>
          {labData.alerts.slice(0, 5).map((alert) => (
            <AlertItem key={alert.id}>
              <AlertIcon
                color={alert.type === "urgent" ? "#FFF5F5" : "#FFF9C4"}
                iconColor={alert.type === "urgent" ? "#E53E3E" : "#F57F17"}
              >
                {alert.type === "urgent" ? (
                  <FaExclamationTriangle />
                ) : (
                  <FaClock />
                )}
              </AlertIcon>
              <AlertInfo>
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDetails>{alert.details}</AlertDetails>
              </AlertInfo>
            </AlertItem>
          ))}
          {(!labData.alerts || labData.alerts.length === 0) && (
            <NoDataMessage>No alerts at this time.</NoDataMessage>
          )}
        </AlertsList>
      </Card>

      <SectionHeader>
        <SectionTitle>Recently Completed Reports</SectionTitle>
        <ViewAllLink to="/dashboard/lab/lab-reports">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <OrdersList>
          {labData.completedReports.slice(0, 5).map((report) => (
            <OrderItem key={report._id}>
              <OrderTime>
                <OrderDate>{formatDate(report.date)}</OrderDate>
                <OrderUrgency>
                  <FaCheckCircle style={{ color: "#50C878" }} />
                </OrderUrgency>
              </OrderTime>
              <OrderInfo>
                <OrderTitle>{report.reportType}</OrderTitle>
                <OrderPatient>
                  Patient: {report.patient?.name || "Unknown"}
                </OrderPatient>
              </OrderInfo>
              <Link to={`/dashboard/lab/lab-reports/${report._id}`}>
                <FaEye style={{ color: "#4A90E2" }} />
              </Link>
            </OrderItem>
          ))}
          {(!labData.completedReports ||
            labData.completedReports.length === 0) && (
            <NoDataMessage>No completed reports found.</NoDataMessage>
          )}
        </OrdersList>
      </Card>
    </div>
  );
};

export default LabTechnicianDashboard;
