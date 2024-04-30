import React from "react";

function Header() {
  return (
  <nav classN="navbar navbar-expand-lg bg-body-tertiary">
  <div classN="container-fluid">
    <a classN="navbar-brand" href="#">Navbar</a>
    <button classN="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span classN="navbar-toggler-icon"></span>
    </button>
    <div classN="collapse navbar-collapse" id="navbarNav">
      <ul classN="navbar-nav">
        <li classN="nav-item">
          <a classN="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li classN="nav-item">
          <a classN="nav-link" href="#">Features</a>
        </li>
        <li classN="nav-item">
          <a classN="nav-link" href="#">Pricing</a>
        </li>
        <li classN="nav-item">
          <a classN="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Header;
