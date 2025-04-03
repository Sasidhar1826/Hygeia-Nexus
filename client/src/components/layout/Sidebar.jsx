import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserInjured,
  FaCalendarAlt,
  FaFileMedical,
  FaBrain,
  FaVideo,
  FaPills,
  FaFileInvoiceDollar,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../context/AuthContext";

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${(props) => (props.isCollapsed ? "80px" : "260px")};
  background-color: ${(props) => props.theme.colors.background.paper};
  box-shadow: ${(props) => props.theme.shadows.medium};
  z-index: 100;
  transition: width ${(props) => props.theme.transitions.default};
  overflow-x: hidden;

  @media (max-width: 768px) {
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
    width: 260px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)};
  height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.colors.background.card};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  img {
    width: 40px;
    height: 40px;
    margin-right: ${(props) =>
      props.isCollapsed ? "0" : props.theme.spacing(1)};
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary.main};
    white-space: nowrap;
    opacity: ${(props) => (props.isCollapsed ? "0" : "1")};
    transition: opacity ${(props) => props.theme.transitions.default};
    margin: 0;
  }
`;

const NavItems = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  text-decoration: none;
  color: ${(props) => props.theme.colors.text.primary};
  transition: all ${(props) => props.theme.transitions.default};

  svg {
    font-size: 20px;
    min-width: 20px;
    margin-right: ${(props) =>
      props.isCollapsed ? "0" : props.theme.spacing(2)};
  }

  span {
    margin-left: ${(props) => props.theme.spacing(1.5)};
    white-space: nowrap;
    opacity: ${(props) => (props.isCollapsed ? "0" : "1")};
    transition: opacity ${(props) => props.theme.transitions.default};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.background.card};
  }

  &.active {
    background-color: ${(props) => props.theme.colors.primary.main}20;
    color: ${(props) => props.theme.colors.primary.main};
    font-weight: 600;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.background.card};
  border: 1px solid ${(props) => props.theme.colors.primary.main}30;
  color: ${(props) => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.main}20;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  display: none;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.medium};
  z-index: 99;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ThemeToggle = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.card};
  }

  span {
    white-space: nowrap;
    opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
    transition: opacity ${(props) => props.theme.transitions.default};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(2)};
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.primary};
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin: ${(props) => props.theme.spacing(2)};
  transition: all ${(props) => props.theme.transitions.default};
  width: 100%;
  text-align: left;

  svg {
    font-size: 20px;
    min-width: 20px;
    margin-right: ${(props) =>
      props.isCollapsed ? "0" : props.theme.spacing(2)};
  }

  span {
    white-space: nowrap;
    opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
    transition: opacity ${(props) => props.theme.transitions.default};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.status.error}20;
    color: ${(props) => props.theme.colors.status.error};
  }
`;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuth();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/patients", label: "Patients", icon: <FaUserInjured /> },
    { path: "/appointments", label: "Appointments", icon: <FaCalendarAlt /> },
    {
      path: "/medical-records",
      label: "Medical Records",
      icon: <FaFileMedical />,
    },
    { path: "/ai-diagnostics", label: "AI Diagnostics", icon: <FaBrain /> },
    { path: "/telemedicine", label: "Telemedicine", icon: <FaVideo /> },
    { path: "/pharmacy", label: "Pharmacy", icon: <FaPills /> },
    { path: "/billing", label: "Billing", icon: <FaFileInvoiceDollar /> },
  ];

  // Only show admin link for admin users
  if (user && user.role === "admin") {
    navItems.push({ path: "/admin", label: "Admin", icon: <FaCog /> });
  }

  return (
    <>
      <SidebarContainer
        isCollapsed={isCollapsed}
        isOpen={isMobileOpen}
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarHeader>
          <Logo isCollapsed={isCollapsed}>
            <img src="/logo.svg" alt="Hospital Logo" />
            <h1>Hygiea Nexus</h1>
          </Logo>
        </SidebarHeader>

        <NavItems>
          {navItems.map((item) => (
            <NavItem key={item.path} to={item.path} isCollapsed={isCollapsed}>
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavItems>

        <ThemeToggle isCollapsed={isCollapsed} onClick={toggleTheme}>
          {isDarkMode ? "🌙" : "☀️"}
          <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </ThemeToggle>

        <LogoutButton isCollapsed={isCollapsed} onClick={logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </LogoutButton>

        <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "→" : "←"}
        </ToggleButton>
      </SidebarContainer>

      <MobileToggle onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>
    </>
  );
};

export default Sidebar;
