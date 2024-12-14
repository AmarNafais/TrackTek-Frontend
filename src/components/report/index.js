import React, { useState } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { IoMdDownload } from "react-icons/io";

const ReportPage = () => {
  const [reports, setReports] = useState([
    { id: 1, name: "Total Report", date: "01-02-2024", fileSize: "17 MB" },
    { id: 2, name: "Total Report", date: "01-02-2024", fileSize: "18 MB" },
    { id: 3, name: "Total Report", date: "01-02-2024", fileSize: "25 MB" },
    { id: 4, name: "Total Report", date: "01-02-2024", fileSize: "16 MB" },
    { id: 5, name: "Total Report", date: "01-02-2024", fileSize: "37 MB" },
  ]);

  const handleDelete = (id) => {
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Reports</h2>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>File Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.name}</td>
                    <td>{report.date}</td>
                    <td>{report.fileSize}</td>
                    <td>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(report.id)}
                      >
                        <IoMdDownload />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportPage;