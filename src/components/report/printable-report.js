import React, { forwardRef } from "react";

const PrintableReport = forwardRef(({ report }, ref) => {
  if (!report) return null;

  return (
    <div 
      ref={ref} 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        padding: '20px', 
        maxWidth: '800px', 
        margin: '0 auto' 
      }}
    >
      <header style={{ 
        textAlign: 'center', 
        borderBottom: '2px solid #333', 
        paddingBottom: '10px' 
      }}>
        <h1>{report.name}</h1>
        <p>Generated on: {new Date().toLocaleDateString()}</p>
      </header>

      <section style={{ marginTop: '20px' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}>
          <tbody>
            <tr>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd',
                fontWeight: 'bold'
              }}>Report ID</td>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd' 
              }}>{report.id}</td>
            </tr>
            <tr>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd',
                fontWeight: 'bold'
              }}>Report Name</td>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd' 
              }}>{report.name}</td>
            </tr>
            <tr>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd',
                fontWeight: 'bold'
              }}>Date</td>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd' 
              }}>{report.date}</td>
            </tr>
            <tr>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd',
                fontWeight: 'bold'
              }}>File Size</td>
              <td style={{ 
                padding: '10px', 
                border: '1px solid #ddd' 
              }}>{report.fileSize}</td>
            </tr>
          </tbody>
        </table>

        <footer style={{ 
          textAlign: 'center', 
          fontStyle: 'italic', 
          color: '#666' 
        }}>
          <p>© {new Date().getFullYear()} Bluetex (Pvt) Ltd</p>
          <p>This is a system-generated report</p>
        </footer>
      </section>
    </div>
  );
});

export default PrintableReport;