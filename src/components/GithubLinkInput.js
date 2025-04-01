// import React from "react";
// import "./GithubLinkInput.css";

// function GithubLinkInput({ githubLink, setGithubLink }) {
//   return (
//     <div className="github-link-input">
//       <label htmlFor="githubLink">GitHub Repo Link:</label>
//       <input
//         id="githubLink"
//         type="text"
//         placeholder="https://github.com/username/repo"
//         value={githubLink}
//         onChange={(e) => setGithubLink(e.target.value)}
//       />
//     </div>
//   );
// }

// export default GithubLinkInput;



import React from 'react';
import { FiGithub } from 'react-icons/fi';
import './GithubLinkInput.css';

const GithubLinkInput = ({ githubLink, setGithubLink }) => {
  const isValid = githubLink.startsWith('https://github.com/');

  return (
    <div className="github-input-container">
      <label className="input-label">
        <span className="label-text">GitHub Repository URL</span>
        <div className={`input-wrapper ${isValid ? 'valid' : ''}`}>
          <div className="input-icon">
            <FiGithub />
          </div>
          <input
            type="text"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="github-input"
          />
          {isValid && <span className="validation-check">✓</span>}
        </div>
      </label>
    </div>
  );
};

export default GithubLinkInput;

// import React from 'react';
// import './GithubLinkInput.css';

// const GithubLinkInput = ({ githubLink, setGithubLink }) => {
//   const isValid = githubLink.startsWith('https://github.com/');

//   return (
//     <div className="github-input">
//       <label>
//         GitHub Repository
//         <div className={`input-container ${isValid ? 'valid' : ''}`}>
//           <input
//             type="text"
//             value={githubLink}
//             onChange={(e) => setGithubLink(e.target.value)}
//             placeholder="https://github.com/username/repo"
//           />
//           {isValid && <span className="check">✓</span>}
//         </div>
//       </label>
//     </div>
//   );
// };

// export default GithubLinkInput;