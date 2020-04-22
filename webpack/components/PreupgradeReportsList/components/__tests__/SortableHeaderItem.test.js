import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import SortableHeaderItem from '../SortableHeaderItem';

const changeSort = () => {};

const fixtures = {
  'should render when not selected': {
    changeSort,
    sort: { attribute: '', order: 'asc' },
    value: 'severity',
    title: 'severity',
  },
  'should render when selected and sorting asc': {
    changeSort,
    sort: { attribute: 'severity', order: 'asc' },
    value: 'severity',
    title: 'Severity',
  },
  'should render when selected and sorting desc': {
    changeSort,
    sort: { attribute: 'severity', order: 'desc' },
    value: 'severity',
    title: 'Severity',
  },
};

describe('SortableHeaderItem', () =>
  testComponentSnapshotsWithFixtures(SortableHeaderItem, fixtures));
