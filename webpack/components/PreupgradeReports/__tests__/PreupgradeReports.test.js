import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReports from '../PreupgradeReports';

import { preupgradeReports } from './PreupgradeReports.fixtures';

const csrfToken = 'xyz';
const newJobInvocationUrl = '/job_invocations/new';

const fixtures = {
  'should render when loaded': {
    loading: false,
    error: {},
    preupgradeReports,
    csrfToken,
    newJobInvocationUrl,
  },
  'should render when loading': {
    loading: true,
    error: {},
    preupgradeReports: [],
    csrfToken,
    newJobInvocationUrl,
  },
  'should render error': {
    loading: false,
    error: {
      statusText: 'Internal server error',
      errorMsg: 'Well, this is embarassing',
    },
    preupgradeReports: [],
    csrfToken,
    newJobInvocationUrl,
  },
};

describe('PreupgradeReports', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReports, fixtures));
