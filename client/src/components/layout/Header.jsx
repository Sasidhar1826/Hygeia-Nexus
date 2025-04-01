import React from "react";
import styled from "styled-components";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(3)};
  background-color: ${(props) => props.theme.colors.background.paper};
  box-shadow: ${(props) => props.theme.shadows.small};
  height: 70px;
  position: fixed;
  top: 0;
  right: 0;
  left: ${(props) => props.sidebarWidth};
  z-index: 99;
  transition: left ${(props) => props.theme.transitions.default};

  @media (max-width: 768px) {
    left: 0;
  }
`;

const PageTitle = styled.h1`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  font-weight: ${(props) => props.theme.typography.h1.fontWeight};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  width: 300px;

  svg {
    color: ${(props) => props.theme.colors.text.secondary};
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  input {
    border: none;
    background: transparent;
    flex: 1;
    color: ${(props) => props.theme.colors.text.primary};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.text.disabled};
    }
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const IconButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.card};
  }

  svg {
    font-size: 20px;
  }
`;

const NotificationBadge = styled(motion.span)`
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.status.error};
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    color: ${(props) => props.theme.colors.text.primary};
  }

  span {
    font-weight: 500;
    color: ${(props) => props.theme.colors.text.primary};

    @media (max-width: 576px) {
      display: none;
    }
  }
`;

const Header = ({ title, sidebarWidth }) => {
  const { user } = useAuth();

  return (
    <HeaderContainer sidebarWidth={sidebarWidth}>
      <PageTitle>{title}</PageTitle>

      <SearchBar>
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </SearchBar>

      <RightSection>
        <IconButton>
          <FaBell />
          <NotificationBadge
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            3
          </NotificationBadge>
        </IconButton>

        <UserProfile>
          <FaUserCircle size={24} />
          <span>{user?.name || "User"}</span>
        </UserProfile>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
