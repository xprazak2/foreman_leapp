import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import EmptyInfoItem from '../EmptyInfoItem';

const fixtures = {
  'should render': {
    entry: { title: 'no title', severity: 'low', id: 5, preupgradeReportId: 7 },
    attr: 'title',
  },
};

describe('EmptyInfoItem', () =>
  testComponentSnapshotsWithFixtures(EmptyInfoItem, fixtures));
