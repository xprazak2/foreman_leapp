import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReports from '../PreupgradeReports';

import { preupgradeReports } from './PreupgradeReports.fixtures';

const csrfToken = 'xyz';
const newJobInvocationUrl = '/job_invocations/new';
const getPreupgradeReports = () => {};

const fixtures = {
  'should render when loaded with reports': {
    loading: false,
    error: {},
    preupgradeReports,
    csrfToken,
    newJobInvocationUrl,
    getPreupgradeReports,
  },
  'should render when loaded without reports': {
    loading: false,
    error: {},
    preupgradeReports: [],
    csrfToken,
    newJobInvocationUrl,
    getPreupgradeReports,
  },
  'should render when loading': {
    loading: true,
    error: {},
    preupgradeReports: [],
    csrfToken,
    newJobInvocationUrl,
    getPreupgradeReports,
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
    getPreupgradeReports,
  },
};

describe('PreupgradeReports', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReports, fixtures));
