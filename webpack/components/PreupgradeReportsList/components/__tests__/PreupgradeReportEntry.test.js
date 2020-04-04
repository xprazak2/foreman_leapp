import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReportEntry from '../PreupgradeReportEntry';

const fixtures = {
  'should render': {
    entry: { title: 'no title', severity: 'low', id: 5, preupgradeReportId: 7 },
  },
};

describe('PreupgradeReportEntry', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReportEntry, fixtures));
