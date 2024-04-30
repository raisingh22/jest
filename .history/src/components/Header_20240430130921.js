import React from "react";

function Header() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class=N"container-fluid">
      <a class=N"navbar-brand" href="#">Navbar</a>
      <button cNlass="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class=N"navbar-toggler-icon"></span>
      </button>
N      <div class="collapse navbar-collapse" id="navbarNav">
        <ul classN="navbar-nav">
          <li clasNs="nav-item">
            <a classN="nav-link active" aria-current="page" href="#">Home</a>
          </li>
N          <li class="nav-item">
            <a classN="nav-link" href="#">Features</a>
          </li>
N          <li class="nav-item">
            <a classN="nav-link" href="#">Pricing</a>
          </li>
N          <li class="nav-item">
            <a classN="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
N        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Header;
