import componentRegistry from 'foremanReact/components/componentRegistry';

import injectReducer from 'foremanReact/redux/reducers/registerReducer';

import PreupgradeReports from './components/PreupgradeReports';
import reducer from './reducer';

componentRegistry.register({
  name: 'PreupgradeReports',
  type: PreupgradeReports,
});

injectReducer('foremanLeapp', reducer);
