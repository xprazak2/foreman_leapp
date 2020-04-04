import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import StringInfoItem from '../StringInfoItem';

const fixtures = {
  'should render': {
    entry: { title: 'no title', severity: 'low', id: 5, preupgradeReportId: 7 },
    attr: 'title',
  },
};

describe('StringInfoItem', () =>
  testComponentSnapshotsWithFixtures(StringInfoItem, fixtures));
