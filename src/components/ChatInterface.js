
import React, { useState } from "react";
import "./ChatInterface.css";
import { FiSend } from "react-icons/fi";

const ChatInterface = ({ messages, onChatSubmit, chatLoading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onChatSubmit(input);
    setInput("");
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Chat Refinement</h2>
      </div>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {chatLoading && (
          <div className="chat-loading">
            <em>Loading...</em>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message to refine docs..."
        />
        <button className="send-btn" onClick={handleSend} disabled={chatLoading}>
        Send <FiSend style={{ marginRight: "0.3rem" }} /> 
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;


// import React, { useState } from "react";
// import "./ChatInterface.css";
// import { FiSend } from "react-icons/fi";

// const ChatInterface = ({ messages, onChatSubmit, chatLoading }) => {
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;
//     onChatSubmit(input);
//     setInput("");
//   };

//   return (
//     <div className="chat-interface">
//       <div className="chat-header">
//         <h2>Chat Refinement</h2>
//       </div>
//       <div className="chat-box">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`chat-message ${msg.sender}`}>
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//         {chatLoading && (
//           <div className="chat-loading">
//             <em>Loading...</em>
//           </div>
//         )}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message to refine docs..."
//         />
//         <button className="send-btn" onClick={handleSend} disabled={chatLoading}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
