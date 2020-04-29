import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import InhibitorInfoItem from '../InhibitorInfoItem';

const fixtures = {
  'should render when inhibitor': {
    entry: { title: 'no title', severity: 'low', id: 5, preupgradeReportId: 7, flags: ['inhibitor'] },
  },
  'should render when not inhibitor': {
    entry: { title: 'no title', severity: 'low', id: 5, preupgradeReportId: 7, flags: [] },
  },
};

describe('InhibitorInfoItem', () =>
  testComponentSnapshotsWithFixtures(InhibitorInfoItem, fixtures));
