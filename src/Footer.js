import React from "react";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="footer text-secondary mt-3">
        <small>
          <a
            href="https://github.com/InnaBudko/weather-react-shecodes"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none"
          >
            Open source project
          </a>
          <span> by Inna Budko </span>
          <span> and hosted on </span>
          <a
            href=" https://heartfelt-alfajores-5b9ad9.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none"
          >
            Netlify
          </a>
        </small>
      </div>
    </div>
  );
}
