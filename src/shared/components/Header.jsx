import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="title">
        <FormattedMessage id="title" />
      </h1>

      <nav role="navigation" className="navigation">
        <Link to="/" className="link">
          <FormattedMessage id="header.nav.home" />
        </Link>
        <a
          className="link"
          href="https://platzi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="header.nav.platzi" />
        </a>
      </nav>
    </header>
  )
}

export default Header
