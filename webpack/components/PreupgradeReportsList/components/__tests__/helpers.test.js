import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';

import { presentSeverity } from '../helpers';

const fixtures = {
  'should return tag info': () => presentSeverity('low'),
};

describe('PreupgradeReportList/helpers', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
