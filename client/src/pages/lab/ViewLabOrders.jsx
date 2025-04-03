import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaClipboardList,
  FaCalendarAlt,
  FaUserMd,
  FaUserInjured,
  FaHospital,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import PageTransition from "../../components/animations/PageTransition";
import AnimationContainer from "../../components/animations/AnimationContainer";
import { useAuth } from "../../context/AuthContext";
import mockAuthService from "../../services/mockApi";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.border};

  input {
    border: none;
    background: transparent;
    outline: none;
    margin-left: ${(props) => props.theme.spacing(1)};
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.primary};
    width: 200px;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Filter = styled.select`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  outline: none;
`;

const OrdersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing(2)};
`;

const OrderCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing(1)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const OrderType = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const Status = styled.span`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "completed"
      ? props.theme.colors.status.success + "20"
      : props.status === "in progress"
      ? props.theme.colors.status.warning + "20"
      : props.theme.colors.status.info + "20"};
  color: ${(props) =>
    props.status === "completed"
      ? props.theme.colors.status.success
      : props.status === "in progress"
      ? props.theme.colors.status.warning
      : props.theme.colors.status.info};
`;

const OrderContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${(props) => props.theme.spacing(2)};
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1.5)};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const OrderActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(1)};
  padding-top: ${(props) => props.theme.spacing(1)};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.primary.main
      : props.variant === "danger"
      ? props.theme.colors.status.error
      : props.theme.colors.background.default};
  color: ${(props) =>
    props.variant === "primary" || props.variant === "danger"
      ? "white"
      : props.theme.colors.text.primary};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? props.theme.colors.primary.light
        : props.variant === "danger"
        ? props.theme.colors.status.error + "dd"
        : props.theme.colors.background.card};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
`;

const EmptyText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.spacing(2)};
  font-size: 0.95rem;
`;

const ViewLabOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { user } = useAuth();

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    fetchLabOrders();
  }, []);

  // Fetch lab orders from the API
  const fetchLabOrders = async () => {
    setLoading(true);
    try {
      const filters = {};

      // If user is a lab technician, show orders assigned to them and pending ones
      if (user?.role === "labtechnician") {
        filters.technician = user._id;
      }

      const response = await mockAuthService.getLabOrders(filters);
      setOrders(response);
    } catch (error) {
      console.error("Error fetching lab orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle order status updates
  const handleUpdateStatus = async (
    orderId,
    newStatus,
    technicianId = null
  ) => {
    try {
      const updateData = {
        status: newStatus,
      };

      // If starting to process, assign to current technician
      if (newStatus === "in_progress" && user?.role === "labtechnician") {
        updateData.technician = user._id;
      }

      await mockAuthService.updateLabOrder(orderId, updateData);

      // Refresh the orders list
      fetchLabOrders();
    } catch (error) {
      console.error("Error updating lab order status:", error);
    }
  };

  // Filter orders based on search and filter inputs
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      (order.patient?.name &&
        order.patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.doctor?.name &&
        order.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.testType &&
        order.testType.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    const matchesType = typeFilter === "" || order.testType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <PageTransition>
        <AnimationContainer type="loading" height="300px" />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer>
        <Header>
          <Title>Lab Test Orders</Title>
          <SearchContainer>
            <SearchInput>
              <FaSearch color="#888" />
              <input
                type="text"
                placeholder="Search by patient or doctor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
          </SearchContainer>
        </Header>

        <FiltersContainer>
          <Filter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Filter>
          <Filter
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Analysis">Urine Analysis</option>
            <option value="X-Ray">X-Ray</option>
            <option value="CT Scan">CT Scan</option>
            <option value="MRI">MRI</option>
          </Filter>
        </FiltersContainer>

        {filteredOrders.length > 0 ? (
          <OrdersContainer>
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <OrderHeader>
                  <OrderType>
                    <FaClipboardList />
                    {order.testType}
                  </OrderType>
                  <Status status={order.status}>
                    {order.status === "pending"
                      ? "Pending"
                      : order.status === "in_progress"
                      ? "In Progress"
                      : "Completed"}
                  </Status>
                </OrderHeader>

                <OrderContent>
                  <OrderInfo>
                    <InfoItem>
                      <InfoLabel>
                        <FaUserInjured />
                        Patient
                      </InfoLabel>
                      <InfoValue>
                        {order.patient?.name || order.patientName || "Unknown"}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>
                        <FaUserMd />
                        Requested By
                      </InfoLabel>
                      <InfoValue>{order.doctor?.name || "Unknown"}</InfoValue>
                    </InfoItem>
                  </OrderInfo>

                  <OrderInfo>
                    <InfoItem>
                      <InfoLabel>
                        <FaCalendarAlt />
                        Date Requested
                      </InfoLabel>
                      <InfoValue>{formatDate(order.requestedDate)}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>
                        <FaHospital />
                        Department
                      </InfoLabel>
                      <InfoValue>
                        {order.department?.name || "Unknown"}
                      </InfoValue>
                    </InfoItem>
                  </OrderInfo>
                </OrderContent>

                {order.notes && (
                  <div>
                    <InfoLabel>Notes</InfoLabel>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        margin: "0.5rem 0 0",
                        color: "#666",
                      }}
                    >
                      {order.notes}
                    </p>
                  </div>
                )}

                <OrderActions>
                  {order.status === "pending" &&
                    user?.role === "labtechnician" && (
                      <>
                        <ActionButton
                          variant="default"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleUpdateStatus(order._id, "rejected")
                          }
                        >
                          <FaTimesCircle />
                          Reject
                        </ActionButton>
                        <ActionButton
                          variant="primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleUpdateStatus(order._id, "in_progress")
                          }
                        >
                          <FaCheckCircle />
                          Start Processing
                        </ActionButton>
                      </>
                    )}

                  {order.status === "in_progress" &&
                    order.technician?._id === user?._id && (
                      <StyledLink
                        to={`/dashboard/upload-lab-results?orderId=${order._id}`}
                      >
                        <ActionButton
                          variant="primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaCheckCircle />
                          Upload Results
                        </ActionButton>
                      </StyledLink>
                    )}

                  {order.status === "completed" && order.reportId && (
                    <ActionButton
                      variant="default"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        navigate(`/dashboard/lab-reports?id=${order.reportId}`)
                      }
                    >
                      View Results
                    </ActionButton>
                  )}
                </OrderActions>
              </OrderCard>
            ))}
          </OrdersContainer>
        ) : (
          <EmptyState>
            <AnimationContainer type="emptyState" height="200px" />
            <EmptyText>
              No lab orders found matching your filters. Try adjusting your
              search criteria.
            </EmptyText>
          </EmptyState>
        )}
      </PageContainer>
    </PageTransition>
  );
};

export default ViewLabOrders;
