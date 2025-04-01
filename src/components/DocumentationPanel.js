

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import "./DocumentationPanel.css";

// const DocumentationPanel = ({ documentation, branches }) => {
//   return (
//     <div className="documentation-panel">
//       <div className="doc-header">
//         <h2>Generated Documentation</h2>
//         <button className="download-btn" onClick={() => {
//           const element = document.createElement("a");
//           const file = new Blob([documentation], { type: "text/plain" });
//           element.href = URL.createObjectURL(file);
//           element.download = "documentation.txt";
//           document.body.appendChild(element);
//           element.click();
//           document.body.removeChild(element);
//         }}>
//           Download
//         </button>
//       </div>
      
//       {/* NEW: Add branch list here */}
//       {branches && branches.length > 0 && (
//         <div className="branch-list">
//           <h3>Available Branches:</h3>
//           <ul>
//             {branches.map((branch) => (
//               <li key={branch}>{branch}</li>
//             ))}
//           </ul>
//         </div>
//       )}
      
//       <div className="doc-content">
//         <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
//           {documentation}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default DocumentationPanel;




import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FaCopy, FaCheck } from "react-icons/fa"; // Importing copy and check icons
import "./DocumentationPanel.css";

const DocumentationPanel = ({ documentation, branches }) => {
  const [copied, setCopied] = useState(false);

  // Function to download content as PDF
  const downloadPDF = () => {
    const input = document.getElementById("doc-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("documentation.pdf");
    });
  };

  // Function to copy documentation text to clipboard with visual feedback
  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="documentation-panel">
      <div className="doc-header">
        <h2>Generated Documentation</h2>
        <div className="button-group">
          <button className="download-btn" onClick={downloadPDF}>
            Download
          </button>
          <button className="copy-btn" onClick={copyToClipboard}>
            {copied ? (
              <>
                <FaCheck style={{ marginRight: "8px" }} />
                Copied!
              </>
            ) : (
              <>
                <FaCopy style={{ marginRight: "8px" }} />
                Copy All
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Branch list */}
      {branches && branches.length > 0 && (
        <div className="branch-list">
          <h3>Available Branches:</h3>
          <ul>
            {branches.map((branch) => (
              <li key={branch}>{branch}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="doc-content" id="doc-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {documentation}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DocumentationPanel;

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { FaCopy } from "react-icons/fa"; // Importing copy icon from react-icons
// import "./DocumentationPanel.css";

// const DocumentationPanel = ({ documentation, branches }) => {
//   // Function to download content as PDF
//   const downloadPDF = () => {
//     const input = document.getElementById("doc-content");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "pt", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = pdfWidth;
//       const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
//       // Add the image to the PDF
//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save("documentation.pdf");
//     });
//   };

//   // Function to copy documentation text to clipboard
//   const copyToClipboard = () => {
//     // Using the Clipboard API to copy text
//     navigator.clipboard.writeText(documentation)
//       // .then(() => {
//       //   alert("Documentation copied to clipboard!");
//       // })
//       // .catch((err) => {
//       //   console.error("Failed to copy text: ", err);
//       // });
//   };

//   return (
//     <div className="documentation-panel">
//       <div className="doc-header">
//         <h2>Generated Documentation</h2>
//         <div className="button-group">
//           <button className="download-btn" onClick={downloadPDF}>
//             Download
//           </button>
//           <button className="copy-btn" onClick={copyToClipboard}>
//             <FaCopy style={{ marginRight: "8px" }} />
//             Copy All
//           </button>
//         </div>
//       </div>
      
//       {/* Branch list */}
//       {branches && branches.length > 0 && (
//         <div className="branch-list">
//           <h3>Available Branches:</h3>
//           <ul>
//             {branches.map((branch) => (
//               <li key={branch}>{branch}</li>
//             ))}
//           </ul>
//         </div>
//       )}
      
//       <div className="doc-content" id="doc-content">
//         <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
//           {documentation}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default DocumentationPanel;
