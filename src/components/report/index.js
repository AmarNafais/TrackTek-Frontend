import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { IoMdDownload } from "react-icons/io";
import html2pdf from "html2pdf.js";
import PrintableReport from "./printable-report";
import { fetchReports, fetchReportByOrderId } from "../../redux/actions/report";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const reportsData = await fetchReports();
        const normalizedReports = reportsData.map((report) => ({
          id: report.id,
          orderId: report.orderId,
          orderDate: new Date(report.description.match(/on (\d{2}\/\d{2}\/\d{4})/)[1]),
          fileSize: "15 MB",
        }));
        setReports(normalizedReports);
      } catch (error) {
        console.error("Error fetching reports:", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  const handleDownload = async (report) => {
    setDownloading(true);
    try {
      const orderDetails = await fetchReportByOrderId(report.orderId);
      setSelectedReport(report);
      setOrderDetails(orderDetails);
      setTimeout(() => {
        const element = printRef.current;
        const options = {
          margin: 0.5,
          filename: `Report_${report.orderId}_${new Date().toISOString().split("T")[0]}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(options).from(element).save();
      }, 100);
    } catch (err) {
      console.error("Failed to download report:", err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Reports</h2>
          {loading ? (
            <p>Loading reports...</p>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>File Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>Report {report.orderId}</td>
                      <td>{report.orderDate.toLocaleDateString()}</td>
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
          )}
        </div>
      </main>

      <div style={{ display: "none" }}>
        <PrintableReport ref={printRef} report={selectedReport} orderDetails={orderDetails} />
      </div>
    </div>
  );
};

export default ReportPage;
