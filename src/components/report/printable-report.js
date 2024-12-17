import React, { forwardRef } from "react";

const PrintableReport = forwardRef(({ report, orderDetails }, ref) => {
  if (!report || !orderDetails) return null;

  const { order, content } = orderDetails;

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "10px",
        maxWidth: "700px", // Ensure it fits well in A4 width
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          textAlign: "center",
          borderBottom: "2px solid #333",
          marginBottom: "10px",
        }}
      >
        <h1 style={{ fontSize: "20px", margin: "0" }}>Order Report</h1>
        <p style={{ margin: "5px 0" }}>
          Generated on: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Order Summary */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={{ fontSize: "16px", margin: "10px 0" }}>Order Summary</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Order ID:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                {order.id}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Customer:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                {order.customer.customerName} ({order.customer.customerEmail})
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Order Date:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Garment Details */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={{ fontSize: "16px", margin: "10px 0" }}>Garment Details</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Garment Name:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                {content.garment.name}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Category:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                {content.garment.categoryType}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Base Price:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                Rs. {content.garment.basePrice}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Design URL:</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <a href={content.garment.design} target="_blank" rel="noreferrer">
                  {content.garment.design}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Materials Used */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={{ fontSize: "16px", margin: "10px 0" }}>Materials Used</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                Material Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                Required Quantity
              </th>
              <th style={{ border: "1px solid #ddd", padding: "5px" }}>Unit</th>
            </tr>
          </thead>
          <tbody>
            {content.materials.map((material, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                  {material.materialName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                  {material.requiredQuantity}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                  {material.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Cost Breakdown */}
      <section>
        <h2 style={{ fontSize: "16px", margin: "10px 0" }}>Cost Breakdown</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Material Cost</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                Rs. {content.costs.materialCost}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Labor Cost</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                Rs. {content.costs.laborCost}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Machine Cost</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                Rs. {content.costs.machineCost}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                <strong>Total Cost</strong>
              </td>
              <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                Rs. {content.costs.totalCost}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "10px",
          color: "#666",
          fontStyle: "italic",
        }}
      >
        <p>© {new Date().getFullYear()} Bluetex (Pvt) Ltd</p>
        <p>This is a system-generated report</p>
      </footer>
    </div>
  );
});

export default PrintableReport;
