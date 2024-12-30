import * as React from "react";

function Nav1(): JSX.Element {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        HOME
      </a>
      <ul>
        <li>
          <a href="/CreateNew">Create New</a>
        </li>
        <li>
          <a href="/OpenModel"></a>
        </li>
        <li>
          <a href="/CreateUser"></a>
        </li>
        <li>
          <a href="/View">Satelite View</a>
        </li>
        <li>
          <a href="/View2">3D Mesh View</a>
        </li>
        <li>
          <a href="/View3"></a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav1;
