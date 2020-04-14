import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import NoReports from './NoReports';

const fixtures = {
  'should render': {},
};

describe('NoReports', () =>
  testComponentSnapshotsWithFixtures(NoReports, fixtures));
