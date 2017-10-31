import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import messages from './messages.json';

import Pages from './pages/containers/Page.jsx';

addLocaleData([...en, ...es]);

const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en';
const repo = `/${window.location.pathname.split('/')[1]}`;
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <BrowserRouter basename={repo}>
      <Pages />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById('root'));
registerServiceWorker();
