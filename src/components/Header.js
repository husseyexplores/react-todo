import React from 'react';

const Header = props => (
  <header className="header">
    <h1>{props.title}</h1>
    <p className="tagline">
      {props.tagline}
      <span className="small-tagline">{props.smallTagline}</span>
    </p>
  </header>
);

export default Header;