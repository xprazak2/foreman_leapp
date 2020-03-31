import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';

import { preupgradeReports } from './PreupgradeReports.fixtures';

import {
  selectPreupgradeReports,
  selectLoadingPreupgradeReports,
  selectError,
  selectFixAllError,
  selectFixAllWorking,
} from '../PreupgradeReportsSelectors';

const state = {
  foremanLeapp: {
    preupgrade: {
      preupgradeReports,
      loadingPreupgradeReports: false,
      error: { errorMsg: 'Error', statusText: 'Status text' },
      fixAllWorking: false,
      selectFixAlError: { message: 'Error message' },
    },
  },
};

const fixtures = {
  'should return preupgrade reports': () => selectPreupgradeReports(state),
  'should return loading state': () => selectLoadingPreupgradeReports(state),
  'should return error': () => selectError(state),
  'should return error fixing all': () => selectFixAllError(state),
  'should return if work in progress': () => selectFixAllWorking(state),
};

describe('PreupgradeReportsSelectors', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
