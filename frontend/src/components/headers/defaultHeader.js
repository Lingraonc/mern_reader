import React from "react";

export const DefaultHeader = () => {
  return (
    <header className="masthead mb-auto bg-dark">
      <div className="inner">
        <h3 className="masthead-brand">Cover</h3>
        <nav className="nav nav-masthead justify-content-center">
          <a className="nav-link active" href="#">
            Home
          </a>
          <a className="nav-link" href="#">
            Features
          </a>
          <a className="nav-link" href="#">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
