import React from 'react';
import {
  MdSpaceDashboard,
  MdInventory
} from "react-icons/md";
import {
  HiMiniUsers
} from "react-icons/hi2";
import {
  FaTasks,
  FaMoneyCheckAlt,
  FaUsers,
  FaBoxOpen
} from "react-icons/fa";
import {
  GiClothes,
  GiSewingMachine
} from "react-icons/gi";
import {
  HiDocumentReport
} from "react-icons/hi";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const userRole = localStorage.getItem("userRole");
  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <MdSpaceDashboard className="side-nav-icons" />
        <span>Dashboard</span>
      </NavLink>
      {!["Staff", "InventoryManager", "Manager"].includes(userRole) && (
        <>
          <NavLink to="/user" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <HiMiniUsers className="side-nav-icons" />
            <span>Users</span>
          </NavLink>
        </>
      )
      }
      <NavLink to="/inventory" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <MdInventory className="side-nav-icons" />
        <span>Inventory</span>
      </NavLink>
      <NavLink to="/order" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <FaTasks className="side-nav-icons" />
        <span>Orders</span>
      </NavLink>
      {userRole !== "Staff" && (
        <>
          <NavLink to="/customer" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <FaUsers className="side-nav-icons" />
            <span>Customers</span>
          </NavLink>
        </>
      )
      }
      <NavLink to="/supplier" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <FaBoxOpen className="side-nav-icons" />
        <span>Suppliers</span>
      </NavLink>
      <NavLink to="/garment" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <GiClothes className="side-nav-icons" />
        <span>Garment</span>
      </NavLink>
      <NavLink to="/machine" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <GiSewingMachine className="side-nav-icons" />
        <span>Machine</span>
      </NavLink>
      {userRole !== "Staff" && (
        <>
          <NavLink to="/cost" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <FaMoneyCheckAlt className="side-nav-icons" />
            <span>Costs</span>
          </NavLink>
        </>
      )
      }
      <NavLink to="/report" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <HiDocumentReport className="side-nav-icons" />
        <span>Reports</span>
      </NavLink>
    </div >
  );
};

export default Sidebar;