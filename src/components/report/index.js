import React, { useState, useRef } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { IoMdDownload } from "react-icons/io";
import html2pdf from "html2pdf.js";
import PrintableReport from "./printable-report";

const ReportPage = () => {
  const [reports, setReports] = useState([
    { id: 1, name: "Total Report", date: "01-02-2024", fileSize: "17 MB" },
    { id: 2, name: "Financial Report", date: "01-02-2024", fileSize: "18 MB" },
    { id: 3, name: "Sales Report", date: "01-02-2024", fileSize: "25 MB" },
    { id: 4, name: "Performance Report", date: "01-02-2024", fileSize: "16 MB" },
    { id: 5, name: "Budget Report", date: "01-02-2024", fileSize: "37 MB" },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const printRef = useRef(null);

  const handleDownload = (report) => {
    setSelectedReport(report);
    setTimeout(() => {
      const element = printRef.current;
      const opt = {
        margin: 0.5,
        filename: `${report.name}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }, 100);
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
                        className="action-button download-button"
                        onClick={() => handleDownload(report)}
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
      <div style={{ display: 'none' }}>
        <PrintableReport ref={printRef} report={selectedReport} />
      </div>
    </div>
  );
};

export default ReportPage;