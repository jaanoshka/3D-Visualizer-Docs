import * as React from "react";

// Function component for the navigation bar
function Nav1(): JSX.Element {
  return (
    <nav className="nav">
      {/* Link to the Home page */}
      <a href="/" className="site-title">
        HOME
      </a>

      {/* List of navigation links */}
      <ul>
        <li>
          {/* Link to the "Create New" page */}
          <a href="/CreateNew">Create New</a>
        </li>
       
        <li>
          {/* Link to the "Create User" page (currently without display text) */}
          <a href="/CreateUser"></a>
        </li>
        <li>
          {/* Link to the Satellite View page */}
          <a href="/View">Satelite View</a>
        </li>
        
          {/* Link to another view page (currently without display text) */}
          <a href="/View3"></a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav1;
