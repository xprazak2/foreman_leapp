import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReportsList from '../index';

import { preupgradeReports } from '../../PreupgradeReports/__tests__/PreupgradeReports.fixtures';

const fixtures = {
  'should render': {
    preupgradeReports,
  },
};

describe('PreupgradeReportsList', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReportsList, fixtures));
