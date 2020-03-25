import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';

import { additionalInfo } from '../helpers';

const reportEntry = {
  title: 'This is title',
  severity: 'low',
  id: 5,
  preupgradeReportId: 6,
};

const fixtures = {
  'should return additional info': () => additionalInfo(reportEntry),
};

describe('PreupgradeReportList/helpers', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
