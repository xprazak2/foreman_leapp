import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import NoReports from './NoReports';

const fixtures = {
  'should render when reports expected': {
    reportsExpected: true,
  },
  'should render when reports not expected': {
    reportsExpected: false,
  },
};

describe('NoReports', () =>
  testComponentSnapshotsWithFixtures(NoReports, fixtures));
