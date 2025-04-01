import React from "react";
import "./PersonaSelector.css";

function PersonaSelector({ persona, setPersona, branches, selectedBranch, setSelectedBranch }) {
  const personas = [
    {
      id: "beginner",
      title: "👶 Beginner",
    },
    {
      id: "intermediate",
      title: "🎓 Intermediate",
    },
    {
      id: "expert",
      title: "🧠 Expert",
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
          </div>
        ))}
      </div>

      {/* Branch selection dropdown */}
      {branches && branches.length > 0 && (
        <div className="branch-selector">
          <label htmlFor="branchSelect">Select Branch:</label>
          <select
            id="branchSelect"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default PersonaSelector;
