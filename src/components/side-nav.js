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
  FaMoneyCheckAlt
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
  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <MdSpaceDashboard className="side-nav-icons" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/user" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <HiMiniUsers className="side-nav-icons" />
        <span>Users</span>
      </NavLink>
      <NavLink to="/inventory" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <MdInventory className="side-nav-icons" />
        <span>Inventory</span>
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <FaTasks className="side-nav-icons" />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/garment" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <GiClothes className="side-nav-icons" />
        <span>Garment</span>
      </NavLink>
      <NavLink to="/machine" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <GiSewingMachine className="side-nav-icons" />
        <span>Machine</span>
      </NavLink>
      <NavLink to="/costs" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <FaMoneyCheckAlt className="side-nav-icons" />
        <span>Costs</span>
      </NavLink>
      <NavLink to="/reports" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <HiDocumentReport className="side-nav-icons" />
        <span>Reports</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;