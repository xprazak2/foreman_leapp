import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import PreupgradeReportsList from '../index';

const allEntries = [
  { title: 'Fix me!', severity: 'Too severe to talk about' },
  { title: 'I am broken too', severity: 'medium' },
  { title: 'Octocat is not happy', severity: 'high' },
  { title: 'Not enough credits', severity: 'low' },
];

const isSelected = () => false;
const toggleSelected = () => {};
const sort = { attribute: '', order: 'asc' };
const changeSort = () => {};
const toggleSelectAll = () => {};

const fixtures = {
  'should render': {
    allEntries,
    fixAllWorking: false,
    isSelected,
    toggleSelected,
    sort,
    changeSort,
    toggleSelectAll,
  },
  'should render when working': {
    allEntries,
    fixAllWorking: true,
    isSelected,
    toggleSelected,
    sort,
    changeSort,
    toggleSelectAll,
  },
};

describe('PreupgradeReportsList', () =>
  testComponentSnapshotsWithFixtures(PreupgradeReportsList, fixtures));
