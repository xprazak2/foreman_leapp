import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReportsList from '../index';

const allEntries = [
  { title: 'Fix me!', severity: 'Too severe to talk about' },
  { title: 'I am broken too', severity: 'medium' },
  { title: 'Octocat is not happy', severity: 'high' },
  { title: 'Not enough credits', severity: 'low' },
];

const fixtures = {
  'should render': {
    allEntries,
    fixAllWorking: false,
  },
  'should render when working': {
    allEntries,
    fixAllWorking: true,
  },
};

describe('PreupgradeReportsList', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReportsList, fixtures));
