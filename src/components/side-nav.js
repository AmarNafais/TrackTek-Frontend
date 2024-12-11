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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu-item active">
        <MdSpaceDashboard className="side-nav-icons" />
        <span>Dashboard</span>
      </div>
      <div className="menu-item">
        <HiMiniUsers className="side-nav-icons" />
        <span>Users</span>
      </div>
      <div className="menu-item">
        <MdInventory className="side-nav-icons" />
        <span>Inventory</span>
      </div>
      <div className="menu-item">
        <FaTasks className="side-nav-icons" />
        <span>Orders</span>
      </div>
      <div className="menu-item">
        <GiClothes className="side-nav-icons" />
        <span>Garment</span>
      </div>
      <div className="menu-item">
        <GiSewingMachine className="side-nav-icons" />
        <span>Machine</span>
      </div>
      <div className="menu-item">
        <FaMoneyCheckAlt className="side-nav-icons" />
        <span>Costs</span>
      </div>
      <div className="menu-item">
        <HiDocumentReport className="side-nav-icons" />
        <span>Reports</span>
      </div>
    </div>
  );
};

export default Sidebar;