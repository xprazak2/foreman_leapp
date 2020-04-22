import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReportsListHeader from '../PreupgradeReportsListHeader';

const fixtures = {
  'should render': {
    sort: { attribute: '', order: 'asc' },
    changeSort: () => {},
    toggleSelectAll: () => {},
  },
};

describe('PreupgradeReportsListHeader', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReportsListHeader, fixtures));
