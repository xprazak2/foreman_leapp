import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';

import { preupgradeReports } from './PreupgradeReports.fixtures';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
} from '../PreupgradeReportsSelectors';

const state = {
  foremanLeapp: {
    preupgrade: {
      preupgradeReports,
      loadingPreupgradeReports: false,
      error: { errorMsg: 'Error', statusText: 'Status text' },
    },
  },
};

const fixtures = {
  'should return preupgrade reports': () => selectPreupgradeReports(state),
  'should return loading state': () => selectLoadingPreupgradeReports(state),
  'should return error': () => selectError(state),
};

describe('PreupgradeReportsSelectors', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
