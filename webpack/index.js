/* eslint import/no-unresolved: [2, { ignore: [foremanReact/*] }] */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import componentRegistry from 'foremanReact/components/componentRegistry';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';

import JobInvocationLeappTab from './components/JobInvocationLeappTab';
import reducer from './reducer';

componentRegistry.register({
  name: 'JobInvocationLeappTab',
  type: JobInvocationLeappTab,
});

injectReducer('foremanLeapp', reducer);
