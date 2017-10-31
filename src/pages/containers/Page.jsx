import React from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Home from './Home.jsx';
import Post from './Post.jsx';
import Profile from './Profile.jsx';
import Error404 from './Error404.jsx';
import Header from '../../shared/components/Header.jsx';

const repo = `/${window.location.pathname.split('/')[1]}`;

function Pages() {
  return (
    <main role="application">
      <Header />
      <Switch>
        {/* List de artículos */}
        <Route exact path="/" component={Home} />
        {/* Detalle de artículo */}
        <Route path="/posts/:id" exact component={Post} />
        {/* Perfil de usuario */}
        <Route path="/user/:id" exact component={Profile} />
        {/* Error 404 */}
        <Route component={Error404} />
      </Switch>
    </main>
  )
}

export default Pages;
