import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReports from '../PreupgradeReports';

import { preupgradeReports } from './PreupgradeReports.fixtures';

const fixtures = {
  'should render when loaded': {
    loading: false,
    error: {},
    preupgradeReports,
  },
  'should render when loading': {
    loading: true,
    error: {},
    preupgradeReports: [],
  },
  'should render error': {
    loading: false,
    error: {
      statusText: 'Internal server error',
      errorMsg: 'Well, this is embarassing',
    },
    preupgradeReports: [],
  },
};

describe('PreupgradeReports', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReports, fixtures));
