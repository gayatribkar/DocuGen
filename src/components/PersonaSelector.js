
// src/components/PersonaSelector.js
// import React from "react";
// import "./PersonaSelector.css";

// function PersonaSelector({ persona, setPersona }) {
//   return (
//     <div className="persona-selector">
//       <label htmlFor="persona">Select Persona:</label>
//       <select
//         id="persona"
//         value={persona}
//         onChange={(e) => setPersona(e.target.value)}
//       >
//         <option value="beginner">Beginner</option>
//         <option value="intermediate">Intermediate</option>
//         <option value="expert">Expert</option>
//       </select>
//     </div>
//   );
// }

// export default PersonaSelector;

import React from "react";
import "./PersonaSelector.css";

function PersonaSelector({ persona, setPersona }) {
  const personas = [
    {
      id: "beginner",
      title: "👶 Beginner",
      // desc: "Step-by-step explanations with examples",
    },
    {
      id: "intermediate",
      title: "🎓 Intermediate",
      // desc: "Balanced technical explanations",
    },
    {
      id: "expert",
      title: "🧠 Expert",
      // desc: "Technical deep dives and optimizations",
    },
  ];

  return (
    <div className="persona-selector">
      <h3>Select Expertise Level</h3>
      <div className="persona-grid">
        {personas.map((p) => (
          <div
            key={p.id}
            className={`persona-card ${persona === p.id ? "active" : ""}`}
            onClick={() => setPersona(p.id)}
          >
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonaSelector;
