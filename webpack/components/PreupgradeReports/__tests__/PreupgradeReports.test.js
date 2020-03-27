import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReports from '../PreupgradeReports';

const fixtures = {
  'should render when loaded': {
    loading: false,
    error: {},
    preupgradeReports: [
      { title: 'Fix me!', severity: 'Too severe to talk about' },
    ],
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
  },
};

describe('PreupgradeReports', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReports, fixtures));
