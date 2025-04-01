import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

const UserName = styled.span`
  font-weight: 500;
`;

const Content = styled.main`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Layout = ({ children, title = "Dashboard" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? "80px" : "250px";

  const menuItems = [
    { icon: <FaHome />, text: "Dashboard", path: "/" },
    { icon: <FaUserInjured />, text: "Patients", path: "/patients" },
    { icon: <FaCalendarAlt />, text: "Appointments", path: "/appointments" },
    {
      icon: <FaFileMedical />,
      text: "Medical Records",
      path: "/medical-records",
    },
    { icon: <FaRobot />, text: "AI Diagnostics", path: "/ai-diagnostics" },
    { icon: <FaVideo />, text: "Telemedicine", path: "/telemedicine" },
    { icon: <FaPills />, text: "Pharmacy", path: "/pharmacy" },
    { icon: <FaFileInvoiceDollar />, text: "Billing", path: "/billing" },
    { icon: <FaCog />, text: "Admin", path: "/admin" },
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
              <FaHospital />
              HMS
            </Logo>
          )}
          <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </CollapseButton>
        </SidebarHeader>

        <SidebarMenu>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
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
            <UserName>{user?.name || "User"}</UserName>
          </UserInfo>
        </Header>

        <Content>{children}</Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
