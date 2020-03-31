import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReports from '../PreupgradeReports';

import { preupgradeReports } from './PreupgradeReports.fixtures';

const onFixEntries = () => {};

const fixtures = {
  'should render when loaded': {
    loading: false,
    error: {},
    preupgradeReports,
    onFixEntries,
    fixAllWorking: false,
    fixAllError: {},
  },
  'should render when loading': {
    loading: true,
    error: {},
    preupgradeReports: [],
    onFixEntries,
    fixAllWorking: false,
    fixAllError: {},
  },
  'should render error': {
    loading: false,
    error: {
      statusText: 'Internal server error',
      errorMsg: 'Well, this is embarassing',
    },
    preupgradeReports: [],
    onFixEntries,
    fixAllWorking: false,
    fixAllError: {},
  },
  'should render when fixing all': {
    loading: false,
    error: {},
    preupgradeReports,
    onFixEntries,
    fixAllWorking: true,
    fixAllError: {},
  },
  'should render failed to fix all': {
    loading: false,
    error: {},
    preupgradeReports,
    onFixEntries,
    fixAllWorking: false,
    fixAllError: {
      message: 'Failed to fix things',
    },
  },
};

describe('PreupgradeReports', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReports, fixtures));
