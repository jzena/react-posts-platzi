import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import Comment from './Comment.jsx';

import messages from '../../messages.json';


test('Comment should render the component', () => {
    const tree = renderer.create(
        <IntlProvider locale="es" messages={messages.es}>
            <Comment />
        </ IntlProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});