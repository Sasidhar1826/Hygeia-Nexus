import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaCalendarAlt,
  FaFileMedical,
  FaRobot,
  FaVideo,
  FaPills,
  FaFileInvoiceDollar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaHospital,
  FaUserMd,
  FaFlask,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled(motion.div)`
  width: ${(props) => (props.isCollapsed ? "80px" : "250px")};
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  transition: width 0.3s ease;
  overflow-x: hidden;
  position: fixed;
  height: 100vh;
  z-index: 100;
`;

const SidebarHeader = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isCollapsed ? "center" : "space-between"};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(0.5)};
  border-radius: 50%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 0;
  padding: 0;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(2)};
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 3px solid white;
  }

  svg {
    margin-right: ${(props) =>
      props.isCollapsed ? "0" : props.theme.spacing(1.5)};
    min-width: 20px;
  }
`;

const MenuHeading = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(1)};
  display: ${(props) => (props.isCollapsed ? "none" : "block")};
`;

const MenuText = styled.span`
  white-space: nowrap;
  opacity: ${(props) => (props.isCollapsed ? "0" : "1")};
  transition: opacity 0.2s;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${(props) => props.sidebarWidth};
  transition: margin-left 0.3s ease;
  background-color: ${(props) => props.theme.colors.background.default};
`;

const Header = styled.header`
  background-color: white;
  padding: ${(props) => props.theme.spacing(2)};
  box-shadow: ${(props) => props.theme.shadows.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(1)};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
  text-transform: capitalize;
`;

const Content = styled.main`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Layout = ({ children, title = "Dashboard" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, isAdmin, isDoctor, isPatient, isLabTechnician } =
    useAuth();
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? "80px" : "250px";

  // Common menu items for all users
  const commonMenuItems = [
    { icon: <FaHome />, text: "Dashboard", path: "/dashboard" },
    { icon: <FaUser />, text: "Profile", path: "/dashboard/profile" },
  ];

  // Patient specific menu items
  const patientMenuItems = [
    { icon: <FaUserMd />, text: "Doctors", path: "/dashboard/doctors" },
    {
      icon: <FaCalendarAlt />,
      text: "Appointments",
      path: "/dashboard/appointments",
    },
    {
      icon: <FaFileMedical />,
      text: "Medical Records",
      path: "/dashboard/medical-records",
    },
    {
      icon: <FaRobot />,
      text: "AI Diagnostics",
      path: "/dashboard/ai-diagnostics",
    },
  ];

  // Doctor specific menu items
  const doctorMenuItems = [
    { icon: <FaUserInjured />, text: "Patients", path: "/dashboard/patients" },
    {
      icon: <FaCalendarAlt />,
      text: "Appointments",
      path: "/dashboard/appointments",
    },
    {
      icon: <FaVideo />,
      text: "Telemedicine",
      path: "/dashboard/doctor-telemedicine",
    },
    { icon: <FaPills />, text: "Pharmacy", path: "/dashboard/pharmacy" },
    { icon: <FaFlask />, text: "Lab Reports", path: "/dashboard/lab-reports" },
  ];

  // Lab technician specific menu items
  const labTechMenuItems = [
    { icon: <FaFlask />, text: "Lab Reports", path: "/dashboard/lab-reports" },
    {
      icon: <FaFlask />,
      text: "Upload Results",
      path: "/dashboard/upload-lab-results",
    },
    {
      icon: <FaFlask />,
      text: "Lab Orders",
      path: "/dashboard/view-lab-orders",
    },
  ];

  // Admin specific menu items
  const adminMenuItems = [
    {
      icon: <FaChartLine />,
      text: "Admin Dashboard",
      path: "/dashboard/admin/dashboard",
    },
    {
      icon: <FaUserMd />,
      text: "Manage Doctors",
      path: "/dashboard/admin/doctors",
    },
    {
      icon: <FaUserInjured />,
      text: "Manage Patients",
      path: "/dashboard/admin/patients",
    },
    {
      icon: <FaFlask />,
      text: "Manage Lab Techs",
      path: "/dashboard/admin/lab-technicians",
    },
    {
      icon: <FaCalendarAlt />,
      text: "Manage Appointments",
      path: "/dashboard/admin/appointments",
    },
    {
      icon: <FaBuilding />,
      text: "Manage Departments",
      path: "/dashboard/admin/departments",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <LayoutContainer>
      <Sidebar
        isCollapsed={isCollapsed}
        initial={{ width: sidebarWidth }}
        animate={{ width: sidebarWidth }}
      >
        <SidebarHeader isCollapsed={isCollapsed}>
          {!isCollapsed && (
            <Logo>
              <svg
                width="50"
                height="50"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g
                  style={{
                    animation:
                      "pulse 1.5s infinite ease-in-out, colorPulse 1.5s infinite ease-in-out",
                    filter: "drop-shadow(0px 0px 10px rgba(231, 76, 60, 0.8))",
                  }}
                >
                  <path
                    d="M100 170s-40-30-60-60c-15-25 5-60 40-60 15 0 30 10 30 20 0-10 15-20 30-20 35 0 55 35 40 60-20 30-60 60-60 60z"
                    stroke="#D35400"
                    strokeWidth="5"
                  />
                </g>

                <polyline
                  points="30,120 50,100 65,130 85,90 110,130 130,100 170,120"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: "200",
                    strokeDashoffset: "200",
                    animation: "drawStroke 2s infinite linear",
                  }}
                />

                {/* Add global styles */}
                <style>
                  {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes colorPulse {
            0% { fill: #E74C3C; }
            50% { fill: #FF6B6B; }
            100% { fill: #E74C3C; }
          }

          @keyframes drawStroke {
            0% { stroke-dasharray: 0, 200; }
            50% { stroke-dasharray: 100, 200; }
            100% { stroke-dasharray: 200, 200; }
          }
        `}
                </style>
              </svg>
              <span style={{ fontSize: "1rem", marginLeft: "5px" }}>
                Hygiea Nexus
              </span>
            </Logo>
          )}
          <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </CollapseButton>
        </SidebarHeader>

        <SidebarMenu>
          {/* Common menu items for all users */}
          {commonMenuItems.map((item, index) => (
            <MenuItem key={`common-${index}`}>
              <MenuLink
                onClick={() => navigate(item.path)}
                className={
                  window.location.pathname === item.path ? "active" : ""
                }
                isCollapsed={isCollapsed}
              >
                {item.icon}
                <MenuText isCollapsed={isCollapsed}>{item.text}</MenuText>
              </MenuLink>
            </MenuItem>
          ))}

          {/* Patient specific menu items */}
          {isPatient() && (
            <>
              {!isCollapsed && (
                <MenuHeading isCollapsed={isCollapsed}>
                  Patient Menu
                </MenuHeading>
              )}
              {patientMenuItems.map((item, index) => (
                <MenuItem key={`patient-${index}`}>
                  <MenuLink
                    onClick={() => navigate(item.path)}
                    className={
                      window.location.pathname === item.path ? "active" : ""
                    }
                    isCollapsed={isCollapsed}
                  >
                    {item.icon}
                    <MenuText isCollapsed={isCollapsed}>{item.text}</MenuText>
                  </MenuLink>
                </MenuItem>
              ))}
            </>
          )}

          {/* Doctor specific menu items */}
          {isDoctor() && (
            <>
              {!isCollapsed && (
                <MenuHeading isCollapsed={isCollapsed}>Doctor Menu</MenuHeading>
              )}
              {doctorMenuItems.map((item, index) => (
                <MenuItem key={`doctor-${index}`}>
                  <MenuLink
                    onClick={() => navigate(item.path)}
                    className={
                      window.location.pathname === item.path ? "active" : ""
                    }
                    isCollapsed={isCollapsed}
                  >
                    {item.icon}
                    <MenuText isCollapsed={isCollapsed}>{item.text}</MenuText>
                  </MenuLink>
                </MenuItem>
              ))}
            </>
          )}

          {/* Lab technician specific menu items */}
          {isLabTechnician() && (
            <>
              {!isCollapsed && (
                <MenuHeading isCollapsed={isCollapsed}>
                  Lab Technician Menu
                </MenuHeading>
              )}
              {labTechMenuItems.map((item, index) => (
                <MenuItem key={`lab-${index}`}>
                  <MenuLink
                    onClick={() => navigate(item.path)}
                    className={
                      window.location.pathname === item.path ? "active" : ""
                    }
                    isCollapsed={isCollapsed}
                  >
                    {item.icon}
                    <MenuText isCollapsed={isCollapsed}>{item.text}</MenuText>
                  </MenuLink>
                </MenuItem>
              ))}
            </>
          )}

          {/* Admin specific menu items */}
          {isAdmin() && (
            <>
              {!isCollapsed && (
                <MenuHeading isCollapsed={isCollapsed}>Admin Menu</MenuHeading>
              )}
              {adminMenuItems.map((item, index) => (
                <MenuItem key={`admin-${index}`}>
                  <MenuLink
                    onClick={() => navigate(item.path)}
                    className={
                      window.location.pathname === item.path ? "active" : ""
                    }
                    isCollapsed={isCollapsed}
                  >
                    {item.icon}
                    <MenuText isCollapsed={isCollapsed}>{item.text}</MenuText>
                  </MenuLink>
                </MenuItem>
              ))}
            </>
          )}

          {/* Logout option for all users */}
          <MenuItem>
            <MenuLink onClick={handleLogout} isCollapsed={isCollapsed}>
              <FaSignOutAlt />
              <MenuText isCollapsed={isCollapsed}>Logout</MenuText>
            </MenuLink>
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent sidebarWidth={sidebarWidth}>
        <Header>
          <PageTitle>{title}</PageTitle>
          <UserInfo>
            <UserAvatar>
              <FaUser />
            </UserAvatar>
            <UserDetails>
              <UserName>{user?.name || "User"}</UserName>
              <UserRole>{user?.role || "user"}</UserRole>
            </UserDetails>
          </UserInfo>
        </Header>

        <Content>{children}</Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
