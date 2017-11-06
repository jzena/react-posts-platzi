import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Gallery from './Gallery';
import Error404 from './Error404';
import Header from '../../shared/components/Header';

function Pages() {
  return (
    <main role="application">
      <Header />
      <Switch>
        {/* List de artículos */}
        <Route exact path="/" component={Home} />
        {/* Detalle de artículo */}
        <Route path="/posts/:id" component={Post} />
        {/* Perfil de usuario */}
        <Route path="/user/:id" component={Profile} />
        {/* Galería de fotos */}
        <Route path="/gallery" component={Gallery} />
        {/* Error 404 */}
        <Route component={Error404} />
      </Switch>
    </main>
  )
}

export default Pages;
