import React from "react";
import "@/styles/Footer.css";

const Footer = ({ className = "" }) => {
  return (
    <footer className={`footer ${className}`}>
      <div className="footer-contents">
        <nav className="footer-links">
          <a href="/about" className="footer-link">
            About the Trybe
          </a>
          <a href="/roadmap" className="footer-link">
            Roadmap
          </a>
          <a href="/support" className="footer-link">
            Contact Support
          </a>
          <a href="/terms" className="footer-link">
            Terms and Conditions
          </a>
        </nav>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Sarcastic Geeks Trybe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
