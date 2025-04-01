
import React, { useState } from "react";
import GithubLinkInput from "./components/GithubLinkInput";
import PersonaSelector from "./components/PersonaSelector";
import ChatInterface from "./components/ChatInterface";
import ProcessingIndicator from "./components/ProcessingIndicator";
import DocumentationPanel from "./components/DocumentationPanel";
import "./App.css";
import logo from "./assets/logo.png"; 

function App() {
  const [githubLink, setGithubLink] = useState("");
  const [persona, setPersona] = useState("intermediate");
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentation, setDocumentation] = useState("");
  const [processedData, setProcessedData] = useState(null); // New state for processed data
  const [chatMessages, setChatMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [isChatLoading, setIsChatLoading] = useState(false);


  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");


  // API Call to Generate Documentation
  // const handleGenerateDocs = async () => {
  //   if (!githubLink.trim()) return;

  //   setIsProcessing(true);
  //   setDocumentation(""); // Clear documentation before new generation

  //   try {
  //     const response = await fetch("http://localhost:5000/generate-docs", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ githubLink: githubLink.trim(), persona }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Received Data:", data);  // Log the response data

  //     // Update documentation and processed data in state
  //     setDocumentation(data.gpt_summary || "No documentation generated.");
  //     setProcessedData(data.processed_data); // Set the processed data (groups, chunks, etc.)
  //   } catch (error) {
  //     console.error("Documentation generation failed:", error);
  //     setDocumentation(
  //       "Error: Failed to generate documentation. Please check the GitHub URL and try again."
  //     );
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleGenerateDocs = async () => {
    if (!githubLink.trim()) return;
    setIsProcessing(true);
    setDocumentation(""); // Clear previous documentation
  
    try {
      const response = await fetch("http://localhost:5000/generate-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Optionally, include branch if your backend handles it:
        body: JSON.stringify({ githubLink: githubLink.trim(), persona, branch: selectedBranch }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received Data:", data);
  
      setDocumentation(data.gpt_summary || "No documentation generated.");
  
      // Update branch state if branches are received
      if (data.branches && data.branches.length > 0) {
        setBranches(data.branches);
        // Optionally, set a default branch:
        setSelectedBranch(data.branches[0]);
      }
    } catch (error) {
      console.error("Documentation generation failed:", error);
      setDocumentation(
        "Error: Failed to generate documentation. Please check the GitHub URL and try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // // API Call to Handle Chat Input
  // const handleChatSubmit = async (message) => {
  //   if (!message.trim()) return;

  //   const newMessages = [...chatMessages, { sender: "user", text: message }];
  //   setChatMessages(newMessages);
  //   setIsProcessing(true);

  //   try {
  //     const response = await fetch("http://localhost:5000/chat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ githubLink, persona, userMessage: message }),
  //     });

  //     const data = await response.json();
  //     setChatMessages((prev) => [
  //       ...prev,
  //       { sender: "system", text: data.chatResponse || "No response received." },
  //     ]);
  //   } catch (error) {
  //     console.error("Error in chat interaction:", error);
  //     setChatMessages((prev) => [
  //       ...prev,
  //       { sender: "system", text: "Error processing request." },
  //     ]);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleChatSubmit = async (message) => {
    if (!message.trim()) return;
    
    // Append the user's message to the chat history
    const newMessages = [...chatMessages, { sender: "user", text: message }];
    setChatMessages(newMessages);
    
    // Indicate chat is loading
    setIsChatLoading(true);
    
    try {
      // Send the chat request with the generated documentation as context
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          githubLink,       // optional if needed for context
          persona,          // optional if needed
          documentation,    // current generated documentation
          userMessage: message
        }),
      });
      
      const data = await response.json();
      // Append the refined documentation or chat response to the chat messages
      setChatMessages((prev) => [
        ...prev,
        { sender: "system", text: data.chatResponse || "No response received." }
      ]);
    } catch (error) {
      console.error("Error in chat interaction:", error);
      setChatMessages((prev) => [
        ...prev,
        { sender: "system", text: "Error processing request." }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };
  
  // const handleChatSubmit = async (message) => {
  //   if (!message.trim()) return;
  
  //   // Append the user's message
  //   const newMessages = [...chatMessages, { sender: "user", text: message }];
  //   setChatMessages(newMessages);
  
  //   // Set only chat loading to true
  //   setIsChatLoading(true);
  
  //   try {
  //     const response = await fetch("http://localhost:5000/chat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ githubLink, persona, userMessage: message }),
  //     });
  
  //     const data = await response.json();
  //     setChatMessages((prev) => [
  //       ...prev,
  //       { sender: "system", text: data.chatResponse || "No response received." },
  //     ]);
  //   } catch (error) {
  //     console.error("Error in chat interaction:", error);
  //     setChatMessages((prev) => [
  //       ...prev,
  //       { sender: "system", text: "Error processing request." },
  //     ]);
  //   } finally {
  //     setIsChatLoading(false);
  //   }
  // };
  
  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      {/* Header */}
      <header className="app-header">
      <img src={logo} alt="DocuGen Logo" className="logo" />
        <h1>Documentation Generator</h1>
        {/* <button className="toggle-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button> */}
      </header>

      <div className="app-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <GithubLinkInput githubLink={githubLink} setGithubLink={setGithubLink} />
          <PersonaSelector persona={persona} setPersona={setPersona} />
          <button className="generate-docs-btn" onClick={handleGenerateDocs} disabled={isProcessing}>
            {isProcessing ? "Generating..." : "Generate Docs"}
          </button>
        </aside>

        {/* Main Panel */}
        <main className="main-panel">
          {isProcessing && <ProcessingIndicator />}
          {!isProcessing && documentation && (
            <>
              <DocumentationPanel documentation={documentation} />
              {/* Show processed data if available */}
              {processedData && (
                <div className="processed-data">
                  <h3>Processed Data</h3>
                  <pre>{JSON.stringify(processedData, null, 2)}</pre>
                </div>
              )}
              <ChatInterface messages={chatMessages} onChatSubmit={handleChatSubmit} />
            </>
          )}
          {!isProcessing && !documentation && (
            <div className="placeholder">
              <p>Enter your GitHub link and select your persona to generate documentation.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;


// // src/App.js
// import React, { useState } from "react";
// import GithubLinkInput from "./components/GithubLinkInput";
// import PersonaSelector from "./components/PersonaSelector";
// import ChatInterface from "./components/ChatInterface";
// import ProcessingIndicator from "./components/ProcessingIndicator";
// import DocumentationPanel from "./components/DocumentationPanel";
// import "./App.css";

// function App() {
//   const [githubLink, setGithubLink] = useState("");
//   const [persona, setPersona] = useState("intermediate");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [documentation, setDocumentation] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);

//   // Simulate generating documentation (replace with your API call)
//   const handleGenerateDocs = () => {
//     if (!githubLink.trim()) return;
//     setIsProcessing(true);
//     // Clear previous documentation
//     setDocumentation("");
//     // Simulate API call delay
//     setTimeout(() => {
//       // For demonstration, we include some markdown with collapsible sections
//       const fakeDoc = `
// # File Documentation

// ## Dependencies
// **Imports:** firebase_admin, jwt, datetime  
// **Unresolved Dependencies:** firebase_admin, jwt, datetime  

// ## Functions

// ### get_marriott_id_from_token()
// <details>
//   <summary><strong>Overview</strong></summary>

// The \`get_marriott_id_from_token\` function is designed to extract the Marriott ID from a decoded JWT (JSON Web Token). This ID is used in the authentication process.
// </details>

// <details>
//   <summary><strong>Prerequisites</strong></summary>

// - **Firebase Admin SDK:** Required for Firebase authentication processes.
// - **JWT Library:** Essential for decoding JWT tokens.
// - **Datetime Library:** Used for handling date and time operations.
// </details>

// <details>
//   <summary><strong>Step-by-Step Example</strong></summary>

// 1. **Install Dependencies:**
//    \`\`\`bash
//    pip install firebase-admin pyjwt
//    \`\`\`
// 2. **Initialize Firebase Admin SDK:**
//    \`\`\`python
//    import firebase_admin
//    from firebase_admin import credentials
//    cred = credentials.Certificate('path/to/serviceAccountKey.json')
//    firebase_admin.initialize_app(cred)
//    \`\`\`
// 3. **Extract Marriott ID:**
//    \`\`\`python
//    import jwt
//    def get_marriott_id_from_token(token):
//        decoded = jwt.decode(token, options={"verify_signature": False})
//        return decoded.get("marriott_id")
//    \`\`\`
// </details>
//       `;
//       setDocumentation(fakeDoc);
//       setIsProcessing(false);
//     }, 2000);
//   };

//   // Simulate sending a chat message to refine documentation
//   const handleChatSubmit = (message) => {
//     setChatMessages([...chatMessages, { sender: "user", text: message }]);
//     // Simulate a response from backend
//     setTimeout(() => {
//       setChatMessages((prev) => [
//         ...prev,
//         { sender: "system", text: `Updated docs based on: "${message}"` },
//       ]);
//     }, 1500);
//   };

//   return (
//     <div className={darkMode ? "app dark-mode" : "app"}>
//       {/* Header */}
//       <header className="app-header">
//         <h1>Documentation Generator</h1>
//         <button
//           className="toggle-mode-btn"
//           onClick={() => setDarkMode(!darkMode)}
//         >
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button>
//       </header>

//       <div className="app-body">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <GithubLinkInput
//             githubLink={githubLink}
//             setGithubLink={setGithubLink}
//           />
//           <PersonaSelector persona={persona} setPersona={setPersona} />
//           <button className="generate-btn" onClick={handleGenerateDocs}>
//             Generate Docs
//           </button>
//         </aside>

//         {/* Main Panel */}
//         <main className="main-panel">
//           {isProcessing ? (
//             <ProcessingIndicator />
//           ) : documentation ? (
//             <>
//               <DocumentationPanel documentation={documentation} />
//               <ChatInterface
//                 messages={chatMessages}
//                 onChatSubmit={handleChatSubmit}
//               />
//             </>
//           ) : (
//             <div className="placeholder">
//               <p>
//                 Your generated documentation will appear here. Enter your GitHub
//                 link and select your persona to begin.
//               </p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
