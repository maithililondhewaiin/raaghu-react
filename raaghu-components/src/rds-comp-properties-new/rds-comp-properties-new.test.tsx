import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompPropertiesNew from './RdsCompPropertiesNew';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompPropertiesNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});