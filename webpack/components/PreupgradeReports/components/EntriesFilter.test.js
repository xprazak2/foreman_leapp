import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import EntriesFilter from './EntriesFilter';

const onFilterValueChange = () => {};
const onFilterTypeChange = () => {};

const fixtures = {
  'should render for title filter': {
    onFilterTypeChange,
    onFilterValueChange,
    filterType: 'title',
    filterValue: 'version',
  },
  'should render for severity filter': {
    onFilterTypeChange,
    onFilterValueChange,
    filterType: 'severity',
    filterValue: 'low',
  },
  'should render for host filter': {
    onFilterTypeChange,
    onFilterValueChange,
    filterType: 'hostname',
    filterValue: 'foo',
  },
};

describe('EntriresFilter', () =>
  testComponentSnapshotsWithFixtures(EntriesFilter, fixtures));
